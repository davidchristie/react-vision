import React, { Component } from 'react'

import Annotations from '../Annotations'
import './Snapshot.css'

export default class Snapshot extends Component {
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
    const { canvas, video } = this.refs
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height)
    this.setState({
      image: canvas.toDataURL()
    })
  }

  render () {
    const { image } = this.state
    return (
      <div className='Snapshot'>
        <video ref='video' autoPlay />
        <button onClick={this.handleClick}>
          Take snapshot
        </button>
        <canvas ref='canvas' />
        {
          image
            ? <Annotations image={image} />
            : null
        }
      </div>
    )
  }
}
