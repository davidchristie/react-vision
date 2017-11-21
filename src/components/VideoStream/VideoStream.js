import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class extends Component {
  static propTypes = {
    stream: PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    const { stream } = nextProps
    if (stream && this.video) {
      this.video.srcObject = stream
    }
  }

  getImage () {
    if (this.video) {
      const canvas = document.createElement('canvas')
      canvas.width = this.video.videoWidth
      canvas.height = this.video.videoHeight
      canvas.getContext('2d')
        .drawImage(this.video, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL()
    } else {
      return null
    }
  }

  render () {
    const { stream } = this.props
    return (
      <video
        autoPlay
        className='VideoStream'
        ref={element => {
          if (element) {
            this.video = element
            if (stream) {
              element.srcObject = stream
            }
          }
        }}
      />
    )
  }
}
