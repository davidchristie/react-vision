import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Annotations.css'
import CropHints from './CropHints'
import Labels from './Labels'
import Web from './Web'

const { fetch } = window

const FEATURE_TYPES = [
  'TYPE_UNSPECIFIED',
  'FACE_DETECTION',
  'LANDMARK_DETECTION',
  'LOGO_DETECTION',
  'LABEL_DETECTION',
  'TEXT_DETECTION',
  'DOCUMENT_TEXT_DETECTION',
  'SAFE_SEARCH_DETECTION',
  'IMAGE_PROPERTIES',
  'CROP_HINTS',
  'WEB_DETECTION'
]
const KEY = process.env.REACT_APP_GOOGLE_API_KEY

if (!KEY) {
  throw new Error('process.env.REACT_APP_GOOGLE_API_KEY is undefined')
}

export default class Annotations extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired
  }

  state = {
    data: null
  }

  componentWillMount () {
    this.fetchAnnotations(this.props.image)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      data: null
    })
    this.fetchAnnotations(nextProps.image)
  }

  fetchAnnotations (image) {
    const content = image.split('base64,', 2)[1]
    if (image) {
      fetch(`https://vision.googleapis.com/v1/images:annotate?key=${KEY}`, {
        body: JSON.stringify({
          requests: [
            {
              features: FEATURE_TYPES
                .map(type => ({
                  maxResults: 10,
                  type
                })),
              image: {
                content
              }
            }
          ]
        }),
        method: 'post'
      })
        .then(response => response.json())
        .then(data => this.setState({data}))
    }
  }

  render () {
    const { image } = this.props
    const { data } = this.state
    if (!data) {
      return (
        <div className='Annotations'>
          <p>Loading...</p>
        </div>
      )
    }
    if (!data.responses) {
      return (
        <div className='Annotations'>
          <p>Network error</p>
        </div>
      )
    }
    const response = data.responses[0]
    const {
      cropHintsAnnotation,
      labelAnnotations,
      webDetection
    } = response
    return (
      <div className='Annotations'>
        <h2>Annotations</h2>
        {
          labelAnnotations
            ? <Labels labels={labelAnnotations} />
            : null
        }
        {
          webDetection
            ? <Web web={webDetection} />
            : null
        }
        {
          cropHintsAnnotation
            ? <CropHints image={image} {...cropHintsAnnotation} />
            : null
        }
      </div>
    )
  }
}
