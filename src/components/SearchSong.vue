<template>
  <div>
    <form>
      <t-input
        v-on:keyup="searchTrack"
        type="text"
        v-model="searchField"
        placeholder="Type your favourite song"
        class="w-full mb-4"
        maxlength="50"
      />
      <t-button @click="searchTrack" class="w-full mb-8" variant="primary">Submit</t-button>
      <t-button :to="{ name: 'lobby' }" class="w-full mb-8" variant="primary">Confirm</t-button>
    </form>
    <ul>
      <li
        class="song-card"
        v-for="(song, idx) in songList"
        v-bind:class="{ selected: song.isSelected }"
        @click="$set(song, 'isSelected', !song.isSelected);selectSong(song)"
        v-bind:key="idx"
      >{{song.title}} {{song.artists}} {{song.album}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "SearchSong",
  data: function() {
    return {
      searchField: "",
      songList: [],
      selectedSong: ""
    };
  },
  methods: {
    ...mapMutations(["setAccessToken"]),
    searchTrack: function(e) {
      e.preventDefault();
      if (this.searchField.length < 3) return;
      const url = `https://api.spotify.com/v1/search?q=${this.searchField}&type=track,album,artist`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.accessToken
          }
        })
        .then(res => {
          this.songList = this.normalizeTrackData(res.data.tracks.items);
        });
    },
    normalizeTrackData(tracks) {
      return tracks.map(track => ({
        id: track.id,
        title: track.name,
        artists: track.artists.map(artist => artist.name).join(", "),
        album: track.album.name,
        isSelected: false
      }));
    },
    selectSong(song) {
      this.selectedSong = song.title;
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
.song-card {
  border: solid 1px black;
  box-shadow: 2px 2px lightblue;
  margin: 5px;
}
.selected {
  background-color: green;
}
</style>
