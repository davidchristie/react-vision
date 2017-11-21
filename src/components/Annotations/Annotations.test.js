import { shallow } from 'enzyme'
import React from 'react'

import Annotations from './Annotations'

it('renders correctly', () => {
  const props = {
    image: 'imageDataUrl'
  }
  expect(shallow(<Annotations {...props} />)).toMatchSnapshot()
})
