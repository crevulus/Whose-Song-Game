import { shallowMount, config, createLocalVue } from "@vue/test-utils";
import Lobby from "@/components/Lobby";
import VueTailwind from "vue-tailwind";

const localVue = createLocalVue();
localVue.use(VueTailwind);

config.mocks["$gtm"] = { trackView: function (name, path) { } };
config.mocks["$route"] = { params: { activityInstanceId: '123' } };
// config.mocks['$router'] = { resolve: arg => { href: 'url' } };


describe('Lobby Component', () => {
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
  }

  const wrapper = shallowMount(Lobby, {
    localVue,
    methods,
    data() {
      return data;
    },
    computed: {}
  })

  // snapshot testing
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
