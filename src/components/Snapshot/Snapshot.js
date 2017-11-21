import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SelectCamera from './SelectCamera'
import './Snapshot.css'
import VideoStream from '../VideoStream'

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
    const { video } = this.refs
    const image = video.getImage()
    this.setState({
      image
    })
    if (onSnapshot) {
      onSnapshot(image)
    }
  }

  render () {
    const { camera, image, stream } = this.state
    return (
      <div className='Snapshot'>
        <SelectCamera
          onChange={this.handleCameraChange}
          value={camera}
        />
        <VideoStream ref='video' stream={stream} />
        <button onClick={this.handleClick}>
          Take snapshot
        </button>
        {
          image
            ? <img alt='snapshot' src={image} />
            : null
        }
      </div>
    )
  }
}
