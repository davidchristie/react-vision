export default function getDevices () {
  return navigator.mediaDevices.enumerateDevices()
}
