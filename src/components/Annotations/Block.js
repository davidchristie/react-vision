import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Block.css'
import Paragraph from './Paragraph'

export default class Block extends Component {
  static propTypes = {
    paragraphs: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
  }

  render () {
    const { paragraphs } = this.props
    return (
      <div className='Block'>
        {
          paragraphs.map((paragraph, index) => {
            return <Paragraph key={index} {...paragraph} />
          })
        }
      </div>
    )
  }
}
