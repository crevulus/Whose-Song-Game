import { mount, config, createLocalVue } from "@vue/test-utils";
import VueTailwind from "vue-tailwind";
import Home from "@/components/Home";

const localVue = createLocalVue();
localVue.use(VueTailwind);

config.mocks["$gtm"] = { trackView: function(name, path) {} };
config.mocks["$route"] = {};

describe("Home.vue", () => {
  it("renders Create button", () => {
    const msg = "Create";
    const wrapper = mount(Home, { localVue });
    expect(wrapper.text()).toMatch(msg);
  });
});
