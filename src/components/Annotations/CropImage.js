import PropTypes from 'prop-types'
import React, { Component } from 'react'

const { Image } = window

export default class CropImage extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    vertices: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ).isRequired
  }

  componentDidMount () {
    this.drawImage()
  }

  componentWillReceiveProps () {
    this.drawImage()
  }

  drawImage () {
    const { image, vertices } = this.props
    const { canvas } = this.refs
    var img = new Image()
    img.addEventListener('load', () => {
      canvas.height = img.height
      canvas.width = img.width
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const x = vertices[0].x || 0
      const y = vertices[0].y || 0
      const width = vertices[2].x
      const height = vertices[2].y
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 5
      ctx.rect(x, y, width, height)
      ctx.stroke()
    })
    img.setAttribute('src', image)
  }

  render () {
    return <canvas ref='canvas' />
  }
}
