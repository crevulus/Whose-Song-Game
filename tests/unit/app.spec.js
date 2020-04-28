import { mount, config, createLocalVue } from "@vue/test-utils";
import VueTailwind from "vue-tailwind";
import App from "@/components/App";
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(VueTailwind);

config.mocks["$gtm"] = { trackView: function (name, path) { } };
config.mocks["$route"] = {};

describe("App Component", () => {
  const wrapper = mount(App, { localVue });

  it("renders Create button", () => {
    const msg = "Create";
    expect(wrapper.text()).toMatch(msg);
  });

  // snapshot testing
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
});
