import { mount, config, createLocalVue } from "@vue/test-utils";
import VueTailwind from "vue-tailwind";
import Home from "@/components/Home";

const localVue = createLocalVue();
localVue.use(VueTailwind);

config.mocks["$gtm"] = { trackView: function (name, path) { } };
config.mocks["$route"] = {};

describe("Home Component", () => {
  const wrapper = mount(Home, { localVue });

  it("renders Create button", () => {
    const msg = "Create";
    expect(wrapper.text()).toMatch(msg);
  });

  // snapshot testing
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
});
