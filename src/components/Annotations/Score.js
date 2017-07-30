import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Score.css'

export default class Score extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  }

  render () {
    const { value } = this.props
    const percentage = 100 * value
    return (
      <div className='Score'>
        <div style={{width: `${percentage}%`}} />
      </div>
    )
  }
}
