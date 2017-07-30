import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SelectCamera from './SelectCamera'
import './Snapshot.css'

export default class Snapshot extends Component {
  static propTypes = {
    onSnapshot: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleCameraChange = this.handleCameraChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      camera: null,
      image: null,
      stream: null
    }
  }

  handleCameraChange (camera) {
    const { video } = this.refs
    const { stream } = this.state
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
    }
    const constraints = {
      audio: false,
      video: {
        deviceId: camera
          ? {
            exact: camera
          }
          : undefined
      }
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream
        this.setState({
          stream
        })
      })
      .catch(error => {
        console.log('navigator.getUserMedia error: ', error)
      })
    this.setState({
      camera
    })
  }

  handleClick () {
    const { onSnapshot } = this.props
    const { canvas, video } = this.refs
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height)
    const image = canvas.toDataURL()
    this.setState({
      image
    })
    if (onSnapshot) {
      onSnapshot(image)
    }
  }

  render () {
    const { camera } = this.state
    return (
      <div className='Snapshot'>
        <SelectCamera
          onChange={this.handleCameraChange}
          value={camera}
        />
        <video ref='video' autoPlay />
        <button onClick={this.handleClick}>
          Take snapshot
        </button>
        <canvas ref='canvas' />
      </div>
    )
  }
}
