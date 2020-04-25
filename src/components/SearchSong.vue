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
        class="w-full mb-8"
        variant="primary"
        :disabled="selectedSong.length === 0"
      >Confirm</t-button>
    </form>
    <ul class="song-list">
      <li
        class="song-card"
        v-for="(song, idx) in songList"
        v-bind:class="{ selected: song.isSelected}"
        @click="$set(song, 'isSelected', !song.isSelected);selectSong(song, idx)"
        :disabled="!!isSelected"
        v-bind:key="idx"
      >
        <div class="card-info">
          <p class="card-text">
            <strong>Title:</strong>
            {{song.title}}
          </p>
          <p class="card-text">
            <strong>Artists:</strong>
            {{song.artists}}
          </p>
          <p class="card-text">
            <strong>Album:</strong>
            {{song.album}}
          </p>
        </div>
        <div class="confirm" v-bind:class="{ hidden: !song.isSelected}">
          <svg
            id="successAnimation"
            class="animated"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
          >
            <path
              id="successAnimationResult"
              fill="#D8D8D8"
              d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
            />
            <circle
              id="successAnimationCircle"
              cx="35"
              cy="35"
              r="24"
              stroke="#979797"
              stroke-width="2"
              stroke-linecap="round"
              fill="transparent"
            />
            <polyline
              id="successAnimationCheck"
              stroke="#979797"
              stroke-width="2"
              points="23 34 34 43 47 27"
              fill="transparent"
            />
          </svg>
        </div>
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
    // dontKnowWhatToCallTheseFunctions() {},
    ...mapMutations(["setAccessToken"]),
    searchTrack(e) {
      const throttleSpeed = 400; // ms
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
      }, throttleSpeed);
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

      this.selectedSong = song;
    },
    confirm() {
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

<style lang="scss">
> .hidden {
  display: none;
}
.song-list {
  // box-shadow: 0px 10px 5px #888, 0px -10px 5px #888;
  // box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.75);
  border-radius: 50px;
  box-shadow: inset 0px 11px 8px -10px #ccc, inset 0px -11px 8px -10px #ccc;

  overflow-y: scroll;
  max-height: 400px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.song-card {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-radius: 15px;
  margin: 10px;
  padding: 8px;
  width: 350px;
  height: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: rgb(255, 255, 255);
  transition: all 450ms ease;
}
.card-text {
  margin: 1px;
  font-size: 90%;
}
.card-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.song-card:not(:focus):hover {
  box-shadow: 8px 8px 30px -8px rgba(0, 0, 0, 0.75);
  transition: all 450ms ease;
}

#successAnimation {
  height: 100%;
}
.selected:not(:focus) {
  box-shadow: 2px 2px 20px -15px rgb(0, 0, 0);
}
$circle-length: 151px;
$check-length: 36px;

@keyframes scaleAnimation {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes drawCircle {
  0% {
    stroke-dashoffset: $circle-length;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes drawCheck {
  0% {
    stroke-dashoffset: $check-length;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#successAnimationCircle {
  stroke-dasharray: $circle-length $circle-length;
  stroke: #ccc;
}

#successAnimationCheck {
  stroke-dasharray: $check-length $check-length;
  stroke: rgb(141, 11, 255);
}

#successAnimationResult {
  fill: rgb(141, 11, 255);
  opacity: 0;
}

#successAnimation.animated {
  animation: 1s ease-out 0s 1 both scaleAnimation;

  #successAnimationCircle {
    animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCircle,
      0.3s linear 0.9s 1 both fadeOut;
  }

  #successAnimationCheck {
    animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCheck,
      0.3s linear 0.9s 1 both fadeOut;
  }

  #successAnimationResult {
    animation: 0.3s linear 0.9s both fadeIn;
  }
}
</style>
