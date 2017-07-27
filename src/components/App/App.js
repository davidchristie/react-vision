import React, { Component } from 'react'

import Snapshot from '../Snapshot'
import './App.css'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>React Vision</h1>
        <Snapshot />
      </div>
    )
  }
}
