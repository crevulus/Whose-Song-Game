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
      <t-button
        @click="confirm()"
        :to="{ name: 'lobby' }"
        class="w-full mb-8"
        variant="primary"
        :disabled="selectedSong.length === 0"
      >Confirm</t-button>
    </form>
    <ul class="song-list">
      <li
        class="song-card"
        v-for="(song, idx) in songList"
        v-bind:class="{ selected: song.isSelected }"
        @click="$set(song, 'isSelected', !song.isSelected);selectSong(song, idx)"
        v-bind:key="idx"
      >
        <p>
          <strong>Title:</strong>
          {{song.title}}
        </p>
        <p>
          <strong>Artists:</strong>
          {{song.artists}}
        </p>
        <p>
          <strong>Album:</strong>
          {{song.album}}
        </p>
      </li>
    </ul>
    <t-button :to="{ name: 'home' }" class="w-full" variant="primary">Home</t-button>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import commonMethods from "@/mixins/commonMethods";
import * as mutations from "@/graphql/mutations";

export default {
  name: "SearchSong",
  data: function() {
    return {
      searchField: "",
      songList: [],
      selectedSong: "",
      timeoutId: null
      // activityInstanceId: this.$route.params.activityInstanceId
    };
  },
  mixins: [commonMethods],
  methods: {
    dontKnowWhatToCallTheseFunctions() {
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.userId,
          action: "submitNewSong",
          trackId: 123,
          trackTitle: this.selectedSong,
          trackArtist: "Chris"
        }).then(console.log)
      );
    },
    ...mapMutations(["setAccessToken"]),
    searchTrack: function(e) {
      e.preventDefault();
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        if (!this.searchField.length) return;

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
      }, 400);
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
    selectSong(song, idx) {
      this.songList.forEach((song, i) => (song.isSelected = idx === i));

      this.selectedSong = song.title;
    },
    confirm() {
      // add song to correct user/songlist?
    }
  },
  computed: {
    ...mapGetters(["accessToken"])
  },
  created() {
    this.getActivityInstanceQuery();
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
.song-list {
  overflow-y: scroll;
  max-height: 400px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.song-card {
  border: solid 1px black;
  border-radius: 15px;
  box-shadow: 2px 2px #aaa;
  margin: 10px;
  padding: 15px;
  width: 250px;
}
.selected {
  background-color: rgb(137, 214, 137);
}
</style>
