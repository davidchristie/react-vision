import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CropImage from './CropImage'
import './CropHints.css'

export default class CropHints extends Component {
  static propTypes = {
    cropHints: PropTypes.arrayOf(
      PropTypes.shape({
        boundingPoly: PropTypes.shape({
          vertices: PropTypes.arrayOf(
            PropTypes.shape({
              x: PropTypes.number,
              y: PropTypes.number
            })
          ).isRequired
        }).isRequired,
        confidence: PropTypes.number.isRequired,
        importanceFraction: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    image: PropTypes.string.isRequired
  }

  render () {
    const { cropHints, image } = this.props
    return (
      <div className='CropHints'>
        <h3>Crop Hints</h3>
        {
          cropHints.map((cropHint, index) => {
            const {
              boundingPoly: {
                vertices
              },
              confidence,
              importanceFraction
            } = cropHint
            return (
              <div key={index}>
                <CropImage image={image} vertices={vertices} />
                <p>
                  <strong>Bounding polygon: </strong>
                  {
                    vertices
                      .map((vertex, index) => {
                        const x = vertex.x || 0
                        const y = vertex.y || 0
                        return `(${x}, ${y})`
                      })
                      .join(', ')
                  }
                </p>
                <p>
                  <strong>Confidence: </strong>
                  {confidence}
                </p>
                <p>
                  <strong>Importance fraction: </strong>
                  {importanceFraction}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
