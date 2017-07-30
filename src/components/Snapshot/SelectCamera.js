import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDevices from '../../devices/getDevices'
import './SelectCamera.css'

export default class SelectCamera extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      cameras: []
    }
  }

  componentWillMount () {
    const { onChange } = this.props
    getDevices()
      .then(devices => {
        const cameras = devices.filter(device => {
          return device.kind === 'videoinput'
        })
        this.setState({
          cameras
        })
        if (onChange && cameras[0]) {
          onChange(cameras[0].deviceId)
        }
      })
      .catch(error => {
        console.log(
          'navigator.mediaDevices.enumerateDevices error: ',
          error
        )
      })
  }

  handleClick (event) {
    const { onChange, value } = this.props
    const nextValue = event.target.value
    if (onChange && nextValue !== value) {
      onChange(event.target.value)
    }
  }

  render () {
    const { value } = this.props
    const { cameras } = this.state
    return (
      <div className='SelectCamera'>
        {
          cameras.map((camera, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    checked={camera.deviceId === value}
                    name='camera'
                    onClick={this.handleClick}
                    type='radio'
                    value={camera.deviceId}
                  />
                  {camera.label}
                </label>
              </div>
            )
          })
        }
      </div>
    )
  }
}
