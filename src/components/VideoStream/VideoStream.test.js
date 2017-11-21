import { shallow } from 'enzyme'
import React from 'react'

import VideoStream from './VideoStream'

it('renders correctly', () => {
  expect(shallow(<VideoStream />)).toMatchSnapshot()
})
