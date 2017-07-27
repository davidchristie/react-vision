import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './VisuallySimilar.css'

export default class VisuallySimilar extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }

  render () {
    const { images } = this.props
    return (
      <div className='VisuallySimilar'>
        <h3>Visually Similar</h3>
        {
          images.map(image => {
            return (
              <a
                href={image.url}
                key={image.url}
                target='_blank'
              >
                <img alt='' src={image.url} />
              </a>
            )
          })
        }
      </div>
    )
  }
}
