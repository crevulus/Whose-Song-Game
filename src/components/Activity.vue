<template>
  <div class="activity">
    <div class="media-player">
      <iframe
        :src="`https://open.spotify.com/embed/track/${currentSong.trackId}`"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <t-button v-if="isHost && (this.songs.length > 0)" variant="primary" @click="showNextSong">Show next song</t-button>
      <!--  -->
      <PlayerSelectionList :users="this.users" :userId="this.deviceId" :hasVoted="hasVoted" />
      <t-button variant="primary" @click="endActivityInstanceMutation">End</t-button>
    </div>
    <!-- Component that shows instance data in tables -->
    <ActivityDebugger
      v-if="this.showDebugger"
      :users="this.users"
      :score="this.score"
      :currentSong="this.currentSong"
      :songs="this.songs"
      :playedSongs="this.playedSongs"
    />
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import * as queries from "@/graphql/queries";
import commonMethods from "@/mixins/commonMethods";
import ActivityDebugger from "@/components/ActivityDebugger";
import PlayerSelectionList from "@/components/PlayerSelectionList";

export default {
  name: "Activity",
  components: { ActivityDebugger, PlayerSelectionList },
  mixins: [commonMethods],
  data() {
    return {
      currentSong: {},
      songs: [],
      playedSongs: [],
      score: [],
      guesses: [],
      showDebugger: true,
      hasVoted: false
    };
  },
  computed: {
    hasNextSong() {
      return this.songs.length > 0;
    }
  },
  created() {
    this.getActivityInstanceQuery();
    this.getActivityInstanceData();
    this.updatedActivityInstanceDataSubscription();
  },
  methods: {
    endActivityInstanceMutation() {
      API.graphql(
        graphqlOperation(mutations.endActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      );
    },
    getActivityInstanceData() {
      console.log(this.activityInstanceId);
      API.graphql(
        graphqlOperation(queries.whoseSongGetActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      ).then(response => {
        const data = response.data.whoseSongGetActivityInstanceData;
        this.setVariables(data);
      });
    },
    showNextSong() {
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          action: "setNextSong",
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      );
      // location.reload();
    },
    updatedActivityInstanceDataSubscription() {
      API.graphql(
        graphqlOperation(subscriptions.whoseSongUpdatedActivityInstanceData, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe(response => {
        const data = response.value.data.whoseSongUpdatedActivityInstanceData;
        this.setVariables(data);
      });
    },
    setVariables(data) {
      this.currentSong = data.currentSong;
      this.playedSongs = data.playedSongs;
      this.score = data.score;
      this.songs = data.songs;
      this.guesses = data.guesses;
      // filters out correct object from guessedList
      this.guessedList = this.guesses.find(
        song => song.trackId === this.currentSong.trackId
      ).users;
      this.hasVoted = this.guessedList.includes(this.deviceId);
    }
  }
};
</script>

