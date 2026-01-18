

export function getDomain(url, subdomain = false) {
  if (!url) {
    return
  }

  url = url.replace(/(https?:\/\/)?(www.)?/i, '')

  if (!subdomain) {
    url = url.split('.')

    url = url.slice(url.length - 2).join('.')
  }

  if (url.indexOf('/') !== -1) {
    return url.split('/')[0]
  }

  return url
}
export function isCreator(subject1, subject2) {
  return subject1 === subject2
}
export function endDateReached(date) {
  return new Date() > date
}
export function isProd() {
  if (process.env.NODE_ENV === 'production') return true
  else return false
}

export function validURL(str) {
  var regex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i
  if (!regex.test(str)) {
    return false
  } else {
    return true
  }
}

export const formatFileSize = (bytes, decimalPoint) => {
  if (bytes === 0) return '0 Bytes'
  if (bytes === '') return '-'
  const k = 1000
  const dm = decimalPoint || 2
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
