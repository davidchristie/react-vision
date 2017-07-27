import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Labels.css'

export default class Labels extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        mid: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired
  }

  render () {
    const { labels } = this.props
    return (
      <div className='Labels'>
        <h3>Labels</h3>
        {
          labels.map(label => {
            return (
              <div key={label.mid}>
                <p>
                  <strong>Description: </strong>
                  {label.description}
                </p>
                <p>
                  <strong>Score: </strong>
                  {label.score}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
