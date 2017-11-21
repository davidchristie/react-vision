import { shallow, mount } from 'enzyme'
import React from 'react'

import VideoStream from './VideoStream'

it('mounts without stream', () => {
  expect(mount(<VideoStream />)).toMatchSnapshot()
})

it('mounts with stream', () => {
  const props = {
    stream: {}
  }
  expect(mount(<VideoStream {...props} />)).toMatchSnapshot()
})

describe('when the stream is changed', () => {
  it('updates the video srcObject if mounted', () => {
    const stream = {}
    const wrapper = mount(<VideoStream />)
    wrapper.setProps({
      stream
    })
    expect(wrapper.find('video').at(0).instance().srcObject).toEqual(stream)
  })

  it('runs without crashing if unmounted', () => {
    const stream = {}
    const wrapper = shallow(<VideoStream />)
    wrapper.setProps({
      stream
    })
  })
})

describe('getImage method', () => {
  beforeEach(() => {
    window.HTMLCanvasElement.prototype.getContext = () => ({
      drawImage: () => {}
    })
  })

  it('takes snapshot image', () => {
    const props = {
      stream: {}
    }
    const wrapper = mount(<VideoStream {...props} />)
    expect(wrapper.instance().getImage()).toBeDefined()
  })

  it('returns null if component is unmounted', () => {
    const wrapper = shallow(<VideoStream />)
    expect(wrapper.instance().getImage()).toBeNull()
  })
})
