import { mount } from "@vue/test-utils";
// import VueTailwind from "vue-tailwind";
import SearchSong from "@/components/SearchSong";

describe('Component', () => {
  const wrapper = mount(SearchSong)

  // checks if vue component
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // snapshot testing
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  // test if element exists
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  // calling methods
  it('calling methods', () => {
    const tracks = [{ id: 123, name: 'foo', artists: [{ name: 'Tell' }], album: { name: 'Mitch' } }];

    expect(wrapper.vm.normalizeTrackData(tracks)).toEqual([{
      id: 123, title: 'foo', artists: 'Tell', album:
        'Mitch'
    }])
  })

  // async testing
  it('should update list of results', async () => {
    const e = { preventDefault: () => (console.log()) };
    await wrapper.vm.searchTrack(e);
    console.log(wrapper.html());
  })

  // // test for user input
  // it('button click should trigger method', async () => {
  //   const button = wrapper.find('button')
  //   button.trigger('click')
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.text()).toContain('1')
  // })
})






