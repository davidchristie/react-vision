import React, { Component } from 'react'

import getGoogleVisionAnnotations from '../../services/getGoogleVisionAnnotations'
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
    getGoogleVisionAnnotations(image)
      .then(data => {
        this.setState({
          data
        })
      })
  }

  render () {
    const { data, image } = this.state
    return (
      <div className='App'>
        <h1>React Vision</h1>
        <div className='links'>
          <a href='https://github.com/davidchristie/react-vision'>
            GitHub
          </a>
        </div>
        <div className='container'>
          <div className='column'>
            <Snapshot onSnapshot={this.handleSnapshot} />
          </div>
          <div className='column'>
            {
              image
                ? <Annotations data={data} image={image} />
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
