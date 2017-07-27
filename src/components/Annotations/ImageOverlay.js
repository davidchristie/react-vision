import PropTypes from 'prop-types'
import React, { Component } from 'react'

const { Image } = window

export default class ImageOverlay extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    overlay: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { image, overlay } = this.props
    this.drawImage(image, overlay)
  }

  componentWillReceiveProps (nextProps) {
    const { image, overlay } = nextProps
    this.drawImage(image, overlay)
  }

  drawImage (image, overlay) {
    const { canvas } = this.refs
    var img = new Image()
    img.addEventListener('load', () => {
      canvas.height = img.height
      canvas.width = img.width
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      overlay(ctx)
    })
    img.setAttribute('src', image)
  }

  render () {
    return <canvas ref='canvas' />
  }
}
