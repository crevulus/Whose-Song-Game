import { mount } from "@vue/test-utils";
import { mapMutations, mapGetters } from "vuex";
import SearchSong from "@/components/SearchSong";

describe('Component', () => {
  const wrapper = mount(SearchSong, { sync: false })
  const tracks = [{ id: 123, name: 'foo', artists: [{ name: 'Tell' }], album: { name: 'Mitch' } },
  { id: 123, name: 'foo', artists: [{ name: 'Tell' }], album: { name: 'Mitch' } }];

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
  it('testing normalized tracks', () => {
    const normalizedTracks = wrapper.vm.normalizeTrackData(tracks);
    expect(normalizedTracks).toEqual([{
      id: 123, title: 'foo', artists: 'Tell', album:
        'Mitch'
    }, {
      id: 123, title: 'foo', artists: 'Tell', album:
        'Mitch'
    }])
  })

  // async testing
  it('testing if page updates with songs', async () => {
    const normalizedTracks = wrapper.vm.normalizeTrackData(tracks);
    wrapper.setData({ songList: normalizedTracks });
    await wrapper.vm.$nextTick()
    const li = wrapper.find('li');
    expect(li.html()).toBe('<li class="song-card">foo Tell Mitch</li>')
  })
})






