import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './ImageProperties.css'
import Score from './Score'

const sortByDescendingScore = dominantColors => {
  const [ ...copy ] = dominantColors
  copy.sort((a, b) => b.score - a.score)
  return copy
}

export default class ImageProperties extends Component {
  static propTypes = {
    imagePropertiesAnnotation: PropTypes.shape({
      dominantColors: PropTypes.shape({
        colors: PropTypes.arrayOf(
          PropTypes.shape({
            color: PropTypes.shape({
              blue: PropTypes.number.isRequired,
              green: PropTypes.number.isRequired,
              red: PropTypes.number.isRequired
            }),
            pixelFraction: PropTypes.number.isRequired,
            score: PropTypes.number.isRequired
          })
        )
      })
    })
  }

  render () {
    const { imagePropertiesAnnotation } = this.props
    const { dominantColors: { colors } } = imagePropertiesAnnotation
    console.log('props', this.props)
    return (
      <div className='ImageProperties'>
        <h3>Properties</h3>
        {
          sortByDescendingScore(colors).map((dominantColor, index) => {
            const {
              color: {
                blue,
                green,
                red
              },
              pixelFraction,
              score
            } = dominantColor
            return (
              <div key={index}>
                <div
                  style={{
                    background: `rgb(${red},${green},${blue})`,
                    height: 100,
                    maxWidth: 100
                  }}
                />
                <p>
                  <strong>Pixel Fraction:</strong> {pixelFraction}
                </p>
                <Score value={score} />
              </div>
            )
          })
        }
      </div>
    )
  }
}
