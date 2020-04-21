<template>
  <div>
    <button @click="getAccessToken">click</button>
    <iframe
      src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>

<script>
import axios from "axios";
var bodyFormData = new FormData();
bodyFormData.set("grant_type", "client_credentials");

const key =
  "ZjI3YzZjYmEwNmJlNGM3NjkxZWFkYWRlYjQwYmI4YTg6M2VkOGFkYjE1MjlkNGQzNWI0ZGQzYWJmY2IxZWM2Mzg=";
export default {
  name: "SearchSong",
  methods: {
    async getAccessToken() {
      console.log("button clicked");
      axios({
        method: "post",
        url: `https://accounts.spotify.com/api/token`,
        form: {
          grant_type: "client_credentials"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + key // client id and secret from env
        },
        json: true
      })
        .then(console.log)
        .catch(console.log);
    }
  }
};
</script>

<style>
</style>