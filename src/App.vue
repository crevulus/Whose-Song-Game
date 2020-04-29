<template>
  <div id="app">
    <div id="main-content">
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
  // max-width: 800px;
  margin: 0 auto 50px;
  margin-top: 30px;
  padding: 1em 3em;
}
#footer-rules {
  max-width: 800px;
  text-align: center;
  margin: 0em auto 1em auto;
}
</style>
