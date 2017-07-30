import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SafeSearch extends Component {
  static propTypes = {
    safeSearch: PropTypes.shape({
      adult: PropTypes.string.isRequired,
      medical: PropTypes.string.isRequired,
      spoof: PropTypes.string.isRequired,
      violence: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const {
      safeSearch: {
        adult,
        medical,
        spoof,
        violence
      }
    } = this.props
    return (
      <div className='SafeSearch'>
        <p>
          <strong>Adult: </strong>
          {adult}
        </p>
        <p>
          <strong>Medical: </strong>
          {medical}
        </p>
        <p>
          <strong>Spoof: </strong>
          {spoof}
        </p>
        <p>
          <strong>Violence: </strong>
          {violence}
        </p>
      </div>
    )
  }
}
