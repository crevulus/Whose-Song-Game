<template>
  <div>
    <form>
      <h4 class="title text-left font-semibold p-1">Search for your favourite song:</h4>
      <t-input
        v-on:keyup="searchTrack"
        type="text"
        v-model="searchField"
        placeholder="Artists, tracks, or albums"
        class="w-8/12 mb-4"
        maxlength="50"
      />
      <ul class="song-list">
        <li
          class="card"
          v-for="(song, idx) in songList"
          v-bind:class="{ selected: song.isSelected}"
          @click="$set(song, 'isSelected', !song.isSelected);selectSong(song, idx)"
          v-bind:key="idx"
        >
          <img class="card-album" :src="song.image" />
          <div class="card-info">
            <p class="card-text" style="color:#667eea;">
              <strong>{{song.title}}</strong>
            </p>
            <p class="card-text">{{song.artists}}</p>
          </div>
          <div class="confirm" v-bind:class="{ hidden: !song.isSelected}"></div>
        </li>
        <div class="buttons">
          <!-- <t-button :to="{ name: 'home' }" variant="primary" style="width: 45%">Home</t-button> -->
          <t-button
            @click="confirm()"
            style="width: 45%"
            variant="primary"
            :disabled="selectedSong.length === 0"
          >Submit song</t-button>
        </div>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import commonMethods from "@/mixins/commonMethods";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";

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

        const url = `https://api.spotify.com/v1/search?q=${this.searchField}&type=track,album,artist&limit=4`;
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + this.accessToken
            }
          })
          .then(res => {
            console.log(res.data);
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
    confirm() {
      if (this.status !== "waiting") {
        this.$router.push({
          name: "home"
        });
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
    }
  },
  computed: {
    ...mapGetters(["accessToken"])
  },
  created() {
    this.updatedActivityInstanceSubscription();
    this.getActivityInstanceQuery();
    const url = "https://accounts.spotify.com/api/token";
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
@import "src/styles/checkbox.scss";
h1 {
  @apply text-2xl;
  text-align: center;
}

.warning-msg {
  text-align: center;
}

.hidden {
  display: none;
}

.title {
  width: 66.66%;
  margin-left: calc(100% / 6);
}
.song-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .buttons {
    justify-content: flex-end;
  }
}

.song-card {
}

.card-album {
  width: 50px;
  height: 50px;
  border-radius: 3px;
}
.card-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.card-text {
  margin: 1px;
  font-size: 90%;
}

.confirm {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

#successAnimation {
  height: 100%;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 66.66%;
  height: 49px;
}
</style>
