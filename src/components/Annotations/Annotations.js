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

export default class Annotations extends Component {
  static propTypes = {
    data: PropTypes.object,
    image: PropTypes.string.isRequired
  }

  render () {
    const { data, image } = this.props
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
