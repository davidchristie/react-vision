import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Tabs.css'

export default class Tabs extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.element.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selected: props.tabs.length
        ? props.tabs[0].name
        : null
    }
  }

  handleClick (event) {
    this.setState({
      selected: event.target.name
    })
  }

  render () {
    const { tabs } = this.props
    const { selected } = this.state
    return (
      <div className='Tabs'>
        <div className='tabs'>
          {
            tabs.map(tab => {
              return (
                <button
                  className={
                    'tab' + (
                      tab.name === selected
                        ? ' active'
                        : ''
                    )
                  }
                  key={tab.name}
                  name={tab.name}
                  onClick={this.handleClick}
                >
                  {tab.name}
                </button>
              )
            })
          }
        </div>
        <div className='content'>
          {
            tabs
              .filter(tab => tab.name === selected)
              .map(tab => tab.content)[0] || null
          }
        </div>
      </div>
    )
  }
}
