<template>
  <div>
    <div class="mx-auto" style="max-width: 800px">
      <div class="w-full max-w-lg mx-auto">
        <div
          v-show="showAlert"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative content-center"
          role="alert"
          style="max-width: 100%; margin: 20px auto;"
        >
          <strong class="font-bold">Too late!&nbsp;</strong>
          <span>The game has already started...</span>
          <span
            class="absolute top-0 bottom-0 right-0 px-4 py-3 rounded-r-sm bg-red-600"
            style="cursor: pointer"
          >
            <div class="text-white" @click="redirect">
              <title>Close</title>
              <strong>OK</strong>
            </div>
          </span>
        </div>
        <h4 class="title text-left font-semibold p-1">Search for your favourite song</h4>
        <t-input
          v-on:keyup="searchTrack"
          type="text"
          v-model="searchField"
          placeholder="Artists, tracks, or albums"
          class="w-full mb-4"
          maxlength="50"
        />
        <ul>
          <li
            class="flex bg-white p-3 rounded-md relative items-center border-transparent border-2 cursor-pointer"
            v-for="(song, idx) in songList"
            :class="{ 'border-purple-600': song.isSelected, 'hover:border-purple-200': !song.isSelected }"
            @click="$set(song, 'isSelected', !song.isSelected);selectSong(song, idx)"
            :key="idx"
          >
            <img class="rounded h-12 w-12" :src="song.image" />
            <div class="flex flex-col justify-center ml-4 pr-12">
              <p class="m-0" style="color:#667eea;">
                <strong>{{song.title}}</strong>
              </p>
              <p class="m-0">{{song.artists}}</p>
            </div>
            <div
              class="absolute right-0 top-0 h-full flex items-center"
              :class="{ hidden: !song.isSelected}"
            >
              <Checkbox />
            </div>
          </li>
        </ul>
        <div class="text-right">
          <t-button
            @click="confirm()"
            class="ml-auto w-48"
            variant="primary"
            :disabled="selectedSong.length === 0 || showAlert"
          >Submit song</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import commonMethods from "@/mixins/commonMethods";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import Checkbox from "@/components/Checkbox";

export default {
  name: "Input",
  components: { Checkbox },
  mixins: [commonMethods],
  data: function() {
    return {
      searchField: "",
      songList: [],
      selectedSong: "",
      timeoutId: null,
      showAlert: false
      // activityInstanceId: this.$route.params.activityInstanceId
    };
  },
  computed: {
    ...mapGetters(["accessToken"])
  },
  created() {
    this.updatedActivityInstanceSubscription();
    this.getActivityInstanceQuery();
    this.getAccessToken();
  },
  methods: {
    ...mapMutations(["setAccessToken"]),
    searchTrack(e) {
      const throttleSpeed = 400; // ms
      e.preventDefault();
      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        if (!this.searchField.length) return;

        const url = `https://api.spotify.com/v1/search?q=${this.searchField}&type=track,album,artist&limit=4`;
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + this.accessToken
            }
          })
          .then(res => {
            this.songList = this.normalizeTrackData(res.data.tracks.items);
          });
      }, throttleSpeed);
    },
    normalizeTrackData(tracks) {
      return tracks.map(track => ({
        id: track.id,
        title: track.name,
        artists: track.artists.map(artist => artist.name).join(", "),
        album: track.album.name,
        image: track.album.images[2].url,
        isSelected: false
      }));
    },
    selectSong(song, idx) {
      this.songList.forEach((song, i) => (song.isSelected = idx === i));

      this.selectedSong = song;
    },
    redirect() {
      this.$router.push({
        name: "home"
      });
    },
    confirm() {
      if (this.status !== "waiting") {
        this.showAlert = true;
        return;
      }
      const { id, title, artists } = this.selectedSong;
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId,
          action: "submitNewSong",
          trackId: id,
          trackTitle: title,
          trackArtists: artists
        })
      ).then(() => {
        this.$router.push({
          name: "lobby",
          params: {
            activityInstanceId: this.activityInstanceId
          }
        });
      });
    },
    updatedActivityInstanceSubscription() {
      API.graphql(
        graphqlOperation(subscriptions.updatedActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe(response => {
        const data = response.value.data.updatedActivityInstance;
        this.status = data.status;
      });
    },
    getAccessToken() {
      const url = "https://accounts.spotify.com/api/token";
      const client_id = // Client ID
      const client_secret = // Client Secret Key
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
  }
};
</script>
