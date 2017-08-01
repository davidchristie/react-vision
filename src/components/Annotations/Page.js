import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Block from './Block'
import './Page.css'

export default class Page extends Component {
  static propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const { blocks } = this.props
    return (
      <div className='Page'>
        {
          blocks.map((block, index) => {
            return <Block key={index} {...block} />
          })
        }
      </div>
    )
  }
}
