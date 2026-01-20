// import { orderBy, uniq } from 'lodash-es'
import { getCookie, removeCookie, setCookie } from 'tiny-cookie'
import { getDomain } from './custom-function'

export const getAccessToken = () => {
  const accessToken =
    process.env.NODE_ENV === 'development'
      ? getCookie('__Secure-access_token')
      : getCookie('__Secure-access_token') ||
        getCookie('__Secure-id_token') ||
        localStorage.getItem('access_token')
  console.log('accessToken', { accessToken, env: process.env.NODE_ENV })
  // return accessToken
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWVyY2hhbnQiLCJleHAiOjE3NjMzNzE0NDIsImp0aSI6IjEiLCJpYXQiOjE3NjIxNjE4NDIsImlzcyI6ImJsb29taW5ndiIsInN1YiI6IjFkZjBlYzAwLWI2YzYtNGFiNS05OGJkLTczMWIxMTJhYzE3MyJ9.mK8zciAV3Y_hkzxllxMXuw_yF1EBJ9MRlISwQm_r4Dg'
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
