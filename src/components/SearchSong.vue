<template>
  <div>
    <form>
      <input type="text" v-model="searchField" placeholder="Type your favourite song" />
      <button @click="searchTrack">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "SearchSong",
  data: function() {
    return {
      searchField: ""
    };
  },
  methods: {
    ...mapMutations(["setAccessToken"]),
    searchTrack: function(e) {
      e.preventDefault();
      const url = `https://api.spotify.com/v1/search?q=${this.searchField}&type=track,album,artist`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.accessToken
          }
        })
        .then(res => {
          console.log(res.data.tracks.items);
        });
      // https://api.spotify.com/v1/search?q=tania%20bowra&type=artist
    }
  },
  computed: {
    ...mapGetters(["accessToken"])
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
