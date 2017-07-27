import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './Faces.css'
import FaceImage from './FaceImage'

export default class Faces extends Component {
  static propTypes = {
    faces: PropTypes.arrayOf(
      PropTypes.shape({
        angerLikelihood: PropTypes.string.isRequired,
        blurredLikelihood: PropTypes.string.isRequired,
        detectionConfidence: PropTypes.number.isRequired,
        headwearLikelihood: PropTypes.string.isRequired,
        joyLikelihood: PropTypes.string.isRequired,
        landmarks: PropTypes.arrayOf(
          PropTypes.shape({
            position: PropTypes.shape({
              x: PropTypes.number.isRequired,
              y: PropTypes.number.isRequired
            })
          })
        ).isRequired,
        sorrowLikelihood: PropTypes.string.isRequired,
        surpriseLikelihood: PropTypes.string.isRequired,
        underExposedLikelihood: PropTypes.string.isRequired
      })
    ).isRequired,
    image: PropTypes.string.isRequired
  }

  render () {
    const { faces, image } = this.props
    return (
      <div className='Faces'>
        <h3>Faces</h3>
        {
          faces.map((face, index) => {
            return (
              <div key={index}>
                <FaceImage
                  face={face}
                  image={image}
                />
                <p>
                  <strong>Anger: </strong>
                  {face.angerLikelihood}
                </p>
                <p>
                  <strong>Joy: </strong>
                  {face.joyLikelihood}
                </p>
                <p>
                  <strong>Sorrow: </strong>
                  {face.sorrowLikelihood}
                </p>
                <p>
                  <strong>Surprise: </strong>
                  {face.surpriseLikelihood}
                </p>
                <p>
                  <strong>Headwear: </strong>
                  {face.headwearLikelihood}
                </p>
                <p>
                  <strong>Blurred: </strong>
                  {face.blurredLikelihood}
                </p>
                <p>
                  <strong>Under Exposed: </strong>
                  {face.underExposedLikelihood}
                </p>
                <p>
                  <strong>Detection Confidence: </strong>
                  {face.detectionConfidence}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
