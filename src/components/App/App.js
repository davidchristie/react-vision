import React, { Component } from 'react'

import Annotations from '../Annotations'
import Snapshot from '../Snapshot'
import './App.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.handleSnapshot = this.handleSnapshot.bind(this)
    this.state = {
      image: null
    }
  }

  handleSnapshot (image) {
    this.setState({
      image
    })
  }

  render () {
    const { image } = this.state
    return (
      <div className='App'>
        <h1>React Vision</h1>
        <div className='container'>
          <div className='column'>
            <Snapshot onSnapshot={this.handleSnapshot} />
          </div>
          <div className='column'>
            {
              image
                ? <Annotations image={image} />
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
