// import { orderBy, uniq } from 'lodash-es'
import { getCookie, removeCookie, setCookie } from 'tiny-cookie'
import { getDomain } from './custom-function'

export const getAccessToken = () => {
  // First check authToken from localStorage (used by current auth flow)
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    return authToken
  }

  // Fallback to cookie-based tokens (legacy)
  const accessToken =
    process.env.NODE_ENV === 'development'
      ? getCookie('__Secure-access_token')
      : getCookie('__Secure-access_token') ||
        getCookie('__Secure-id_token') ||
        localStorage.getItem('access_token')

  console.log('accessToken', { accessToken, authToken, env: process.env.NODE_ENV })
  return accessToken
}

export const getRefreshToken = () => {
  const refreshToken =
    process.env.NODE_ENV === 'development'
      ? localStorage.getItem('refresh_token')
      : getCookie('refresh_token') || localStorage.getItem('refresh_token')
  return refreshToken
}

export const setRefreshToken = token => {
  savetoCookie('refresh_token', token)
}

export const setAccessToken = token => {
  savetoCookie('access_token', token, '__Secure-')
}

const savetoCookie = (name, value, prefix = '') => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem(name, value)
  } else {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    const options = {
      secure: true,
      expires: date,
      domain: getDomain(),
    }
    setCookie(`${prefix}${name}`, value, options)
  }
}
