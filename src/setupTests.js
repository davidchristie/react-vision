import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

process.env.REACT_APP_GOOGLE_API_KEY = 'googleApiKey'

Enzyme.configure({
  adapter: new Adapter()
})

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
