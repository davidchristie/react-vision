import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Annotations.css'
import CropHints from './CropHints'
import Faces from './Faces'
import FullText from './FullText'
import ImageProperties from './ImageProperties'
import Labels from './Labels'
import SafeSearch from './SafeSearch'
import Tabs from './Tabs'
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
          <h2>Loading...</h2>
        </div>
      )
    }
    if (!data.responses) {
      return (
        <div className='Annotations'>
          <h2>Network error</h2>
        </div>
      )
    }
    const response = data.responses[0]
    console.log(response)
    const {
      cropHintsAnnotation,
      faceAnnotations,
      fullTextAnnotation,
      labelAnnotations,
      imagePropertiesAnnotation,
      safeSearchAnnotation,
      webDetection
    } = response
    const tabs = []
    if (cropHintsAnnotation) {
      tabs.push({
        content: <CropHints image={image} {...cropHintsAnnotation} />,
        name: 'Crop Hints'
      })
    }
    if (faceAnnotations) {
      tabs.push({
        content: <Faces faces={faceAnnotations} image={image} />,
        name: 'Faces'
      })
    }
    if (labelAnnotations) {
      tabs.push({
        content: <Labels labels={labelAnnotations} />,
        name: 'Labels'
      })
    }
    if (imagePropertiesAnnotation) {
      tabs.push({
        content: <ImageProperties imagePropertiesAnnotation={imagePropertiesAnnotation} />,
        name: 'Properties'
      })
    }
    if (safeSearchAnnotation) {
      tabs.push({
        content: <SafeSearch safeSearch={safeSearchAnnotation} />,
        name: 'Safe Search'
      })
    }
    if (fullTextAnnotation) {
      tabs.push({
        content: <FullText fullText={fullTextAnnotation} />,
        name: 'Text'
      })
    }
    if (webDetection) {
      tabs.push({
        content: <Web web={webDetection} />,
        name: 'Web'
      })
    }
    return (
      <div className='Annotations'>
        <Tabs tabs={tabs} />
      </div>
    )
  }
}
