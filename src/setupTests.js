import { XMLHttpRequest } from 'xmlhttprequest'

global.XMLHttpRequest = XMLHttpRequest

process.env.REACT_APP_GOOGLE_API_KEY = 'googleApiKey'

navigator.mediaDevices = {
  getUserMedia () {
    const resolve = () => {}
    const reject = () => {}
    return new Promise(resolve, reject)
  }
}
