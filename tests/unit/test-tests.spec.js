import { mount } from '@vue/test-utils'
import Rules from '../../src/components/Rules'
import Logo from '../../src/components/Logo'
import Footer from '../../src/components/Footer'

describe('Component Render Tests', () => {
  test('Rules', () => {
    const wrapper = mount(Rules)
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  test('Logo', () => {
    const wrapper = mount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  test('Footer', () => {
    const wrapper = mount(Footer)
    expect(wrapper.isVueInstance()).toBeTruthy()
  });
});