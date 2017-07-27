import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Snapshot.css'

export default class Snapshot extends Component {
  static propTypes = {
    onSnapshot: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      image: null
    }
  }

  componentDidMount () {
    const constraints = {
      audio: false,
      video: true
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const { video } = this.refs
        video.srcObject = stream
      })
      .catch(error => {
        console.log('navigator.getUserMedia error: ', error)
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
    return (
      <div className='Snapshot'>
        <video ref='video' autoPlay />
        <button onClick={this.handleClick}>
          Take snapshot
        </button>
        <canvas ref='canvas' />
      </div>
    )
  }
}
