import { shallowMount, config, createLocalVue } from "@vue/test-utils";
import Activity from "@/components/Activity";
import VueTailwind from "vue-tailwind";

const mockMixin = {
  commonMethods: {}
}

const localVue = createLocalVue();
localVue.use(VueTailwind);
localVue.mixin(mockMixin);

config.mocks["$gtm"] = { trackView: function (name, path) { } };
config.mocks["$route"] = { params: { activityInstanceId: '123' } };
// config.mocks['$router'] = { resolve: arg => { href: 'url' } };


describe('Activity Component', () => {


  const methods = {
    getActivityQuery() {
      return;
    },
    getActivityInstanceData() {
      return;
    },
    updatedActivityInstanceSubscription() {
      return;
    },
    updatedActivityInstanceDataSubscription() {
      return;
    }
  }

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

  const data = {
    activityInstanceId: '123456789',
    isHost: false,
    users,
    hostId: '456',
    status: 'started',
    deviceId: '789',
    showDebugger: false
  }

  const wrapper = shallowMount(Activity, {
    localVue,
    methods,
    data() {
      return data;
    },
    mixins: mockMixin
  })

  it('testing setVariables method', () => {
    const tracks = [{
      id: 123,
      name: 'foo',
      artists: [{ name: 'Tell' }],
      album: { name: 'Mitch', images: { 2: { url: '123' } } }
    },
    {
      id: 1234,
      name: 'foo',
      artists: [{ name: 'Tell' }],
      album: { name: 'Mitch', images: { 2: { url: '123' } } }
    }];

    const guesses = [
      {
        trackId: '789',
        userId: '678',
        selectedUserId: '678',
        trackOwnerId: '123'
      }
    ]

    const data2 = {
      currentSong: tracks[0],
      playedSong: tracks,
      score: [1, 6, 3],
      songs: tracks,
      guesses: guesses
    }

    wrapper.vm.setVariables(data2);

    expect(wrapper.vm.currentSong).toBe(tracks[0]);
  })

  test('renders correctly (snapshot)', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
