import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VisuallySimilar from './VisuallySimilar'

export default class Web extends Component {
  static propTypes = {
    web: PropTypes.shape({
      visuallySimilarImages: PropTypes.arrayOf(
        PropTypes.object
      ).isRequired
    }).isRequired
  }

  render () {
    const { web: { visuallySimilarImages } } = this.props
    return (
      <div className='Web'>
        <VisuallySimilar images={visuallySimilarImages} />
      </div>
    )
  }
}
