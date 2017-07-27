navigator.mediaDevices = {
  getUserMedia () {
    const resolve = () => {}
    const reject = () => {}
    return new Promise(resolve, reject)
  }
}
