import { XMLHttpRequest } from 'xmlhttprequest'

global.XMLHttpRequest = XMLHttpRequest

process.env.REACT_APP_GOOGLE_API_KEY = 'googleApiKey'

navigator.mediaDevices = {
  enumerateDevices () {
    return new Promise(resolve => {
      resolve([])
    })
  },
  getUserMedia () {
    return new Promise(resolve => {
      resolve()
    })
  }
}
