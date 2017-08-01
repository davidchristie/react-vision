import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Page from './Page'

export default class FullText extends Component {
  static propTypes = {
    fullText: PropTypes.shape({
      pages: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
  }

  render () {
    const { fullText } = this.props
    return (
      <div className='FullText'>
        {
          fullText.pages.map((page, index) => {
            return <Page key={index} {...page} />
          })
        }
      </div>
    )
  }
}
