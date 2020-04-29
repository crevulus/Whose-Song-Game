import { mount, config, createLocalVue } from "@vue/test-utils";
import Input from "@/components/Input";
import VueTailwind from "vue-tailwind";

const localVue = createLocalVue();
localVue.use(VueTailwind);

config.mocks["$gtm"] = { trackView: function (name, path) { } };
config.mocks["$route"] = { params: { activityInstanceId: '123' } };

describe.only('SearchSong Component', () => {
  const users = [
    {
      userId: '123',
      name: 'Foo'
    },
    {
      userId: '456',
      name: 'Bar'
    }
  ]

  const methods = {
    updatedActivityInstanceSubscription() {
      return
    },
    getActivityInstanceQuery() {
      return
    }
  }

  const data = {
    activityInstanceId: '123456789',
    isHost: false,
    users,
    hostId: '456',
    status: 'started'
  }

  const tracks = [{
    id: 123,
    name: 'foo',
    artists: [{ name: 'Tell' }],
    album: { name: 'Mitch', images: { 2: { url: '123' } } }
  },
  {
    id: 123,
    name: 'foo',
    artists: [{ name: 'Tell' }],
    album: { name: 'Mitch', images: { 2: { url: '123' } } }
  }];

  const wrapper = mount(Input, {
    localVue,
    data() {
      return data;
    },
    methods
  })

  // checks if vue component
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // snapshot testing
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  // calling methods
  it('testing normalized tracks', () => {
    const normalizedTracks = wrapper.vm.normalizeTrackData(tracks);
    expect(normalizedTracks).toEqual([{
      id: 123, title: 'foo', artists: 'Tell', album:
        'Mitch', "image": "123", "isSelected": false
    }, {
      id: 123, title: 'foo', artists: 'Tell', album:
        'Mitch', "image": "123", "isSelected": false
    }])
  })

  // async testing
  it('testing if page updates with songs', async () => {
    const normalizedTracks = wrapper.vm.normalizeTrackData(tracks);
    wrapper.setData({ songList: normalizedTracks });
    await wrapper.vm.$nextTick()
    const li = wrapper.find('li');
    expect(li.text()).toMatch('Tell')
  })
})






