<template>
  <div>
    <<<<<<< HEAD
    =======
    <button @click="getAccessToken">click</button>
    >>>>>>> 8a6fbdb3b4fe36c45761295d51e5940d2d69f225
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
import { mapMutations } from "vuex";

export default {
  name: "SearchSong",
  methods: {
    ...mapMutations(["setAccessToken"])
  },
  created() {
    const url = "https://accounts.spotify.com/api/token";
    // const pair = ["grant_type", "client_credentials"];
    const client_id = "f27c6cba06be4c7691eadadeb40bb8a8";
    const client_secret = "3ed8adb1529d4d35b4dd3abfcb1ec638";
    const hash = Buffer.from(client_id + ":" + client_secret).toString(
      "base64"
    );
    const config = {
      headers: {
        Authorization: "Basic " + hash,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios
      .post(url, "grant_type=client_credentials", config)
      .then(r => {
        const token = r.data.access_token;
        this.setAccessToken(token);
      })
      .catch(r => console.log(r));
  }
};
</script>

<style>
</style>