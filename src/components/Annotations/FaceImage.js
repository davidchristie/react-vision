import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ImageOverlay from './ImageOverlay'

export default class FaceImage extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    face: PropTypes.shape({
      boundingPoly: PropTypes.shape({
        vertices: PropTypes.arrayOf(
          PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
          })
        ).isRequired
      }).isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.drawOverlay = this.drawOverlay.bind(this)
  }

  drawOverlay (ctx) {
    const {
      face: {
        boundingPoly: {
          vertices
        },
        landmarks
      }
    } = this.props
    const x = vertices[0].x || 0
    const y = vertices[0].y || 0
    const width = vertices[2].x - x
    const height = vertices[2].y - y
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 5
    ctx.rect(x, y, width, height)
    landmarks.forEach(landmark => {
      const position = landmark.position
      const { x, y } = position
      ctx.fillRect(x - 3, y - 3, 6, 6)
    })
    ctx.stroke()
  }

  render () {
    const { image } = this.props
    return (
      <ImageOverlay
        image={image}
        overlay={this.drawOverlay}
      />
    )
  }
}
