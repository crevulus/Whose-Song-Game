import { mount, config, createLocalVue, shallowMount } from "@vue/test-utils";
// import VueTailwind from "vue-tailwind";
import SearchSong from "@/components/SearchSong";

// checks if vue component
describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SearchSong)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

// snapshot testing
test('renders correctly', () => {
  const wrapper = mount(SearchSong)
  expect(wrapper.element).toMatchSnapshot()
})


// describe('SearchSong', async () => {
//   const wrapper = mount(SearchSong)

//   // it('renders the correct markup', () => {
//   //   expect(wrapper.html()).toContain('<input type="text" placeholder="Type your favourite song">')
//   // })

//   // wrapper.vm.$data.searchField = 'Drake';
//   // wrapper.find("[data-searchField]").setValue("alice")
//   wrapper.find('[data-searchField]').setValue('drake')
//   const button = wrapper.find('button');
//   await button.trigger('click')
//   console.log(wrapper.html())
// })


describe("FormSubmitter", () => {
  it("reveals a notification when submitted", async () => {
    const wrapper = mount(SearchSong)

    // wrapper.find("[data-searchField]").setValue("alice")
    wrapper.find("button.submit-button").trigger('click')

    console.log(wrapper.html())
  })
})
