<template>
  <div id="app">
    <div id="main-content">
      <!-- <router-link :to="{ name: 'input' }">Input</router-link> -->
      <Logo />
      <router-view />
    </div>
    <div id="footer-rules">
      <Rules />
    </div>
    <Footer />
  </div>
</template>
<script>
import { uuid } from "vue-uuid";
import { mapMutations } from "vuex";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import Rules from "@/components/Rules";
export default {
  components: { Logo, Footer, Rules },
  name: "App",
  created() {
    const deviceId = uuid.v4();
    this.setDeviceId(deviceId);
  },
  methods: {
    ...mapMutations(["setDeviceId"])
  }
};
</script>
<style lang="scss">
@import "tailwindcss/base";
p {
  @apply text-gray-700 mb-4;
}
h2 {
  @apply font-bold text-3xl mb-4;
}
h3 {
  @apply font-bold text-xl mb-4;
}
a:focus {
  @apply outline-none shadow-outline;
}
@import "tailwindcss/components";
@import "tailwindcss/utilities";

#app {
  font-family: "Nunito sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
#main-content {
  min-height: calc(100vh - 12rem);
  max-width: 800px;
  margin: auto;
  margin-top: 30px;
  padding: 1em 3em;
}
#footer-rules {
  max-width: 800px;
  text-align: center;
  margin: 0em auto 1em auto;
}

// .card {
//   position: relative;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   border-radius: 8px;
//   margin: 6px;
//   padding: 12px;
//   padding-right: 50px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: white;
//   border: 2px solid white;

//   transition: all 300ms ease;
// }

// .card:hover {
//   border: 2px solid rgb(202, 157, 241);
//   transition: all 450ms ease;
// }

// .selected:not(:focus) {
//   border: 2px solid rgb(141, 11, 255);
//   transition: all 450ms ease;
// }
</style>