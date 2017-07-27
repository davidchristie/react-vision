import React from 'react'
import { render } from 'react-dom'

import Annotations from './Annotations'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    image: 'imageDataUrl'
  }
  render(<Annotations {...props} />, div)
})
