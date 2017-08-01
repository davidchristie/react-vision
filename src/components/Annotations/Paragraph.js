import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Page extends Component {
  static propTypes = {
    words: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
  }

  render () {
    const { words } = this.props
    const text = words
      .map(word => {
        return word.symbols
          .map(symbol => {
            return symbol.text
          })
          .join('')
      })
      .join(' ')
    return (
      <p className='Paragraph'>
        {text}
      </p>
    )
  }
}
