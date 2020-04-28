<template>
  <div class="activity">
    <div class="game">
      <div class="col">
        <div class="media-player">
          <iframe
            :src="`https://open.spotify.com/embed/track/${currentSong.trackId}`"
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </div>
      <div class="col">
        <PlayerSelectionList
          :users="this.users"
          :userId="this.deviceId"
          :guess="currentGuess"
          :currentSong="currentSong"
        />
      </div>
    </div>
    <div class="game-controls">
      <h1>Host controls</h1>
      <t-button v-if="isHost && songs.length > 0" variant="primary" @click="showNextSong">Skip Song</t-button>
      <t-button
        v-else-if="isHost"
        variant="primary"
        @click="endActivityInstanceMutation"
      >Skip to Results</t-button>
      <t-button variant="primary" @click="endActivityInstanceMutation">End Game</t-button>
    </div>

    <!-- Component that shows instance data in tables -->
    <ActivityDebugger
      v-if="this.showDebugger"
      :users="this.users"
      :score="this.score"
      :currentSong="this.currentSong"
      :songs="this.songs"
      :playedSongs="this.playedSongs"
      :guesses="this.guesses"
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
      currentGuess: null
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
    },
    updatedActivityInstanceDataSubscription() {
      API.graphql(
        graphqlOperation(subscriptions.whoseSongUpdatedActivityInstanceData, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe(response => {
        const data = response.value.data.whoseSongUpdatedActivityInstanceData;
        this.setVariables(data);

        if (this.guessedList.length === this.users.length) {
          if (this.songs.length === 0) {
            API.graphql(
              graphqlOperation(mutations.endActivityInstance, {
                activityInstanceId: this.activityInstanceId
              })
            );
            return;
          }
          if (this.isHost) this.showNextSong();
        }
      });
    },
    setVariables(data) {
      this.currentSong = data.currentSong;
      this.playedSongs = data.playedSongs;
      this.score = data.score;
      this.songs = data.songs;
      this.guesses = data.guesses;
      // filters out correct object from guessedList
      this.guessedList = this.guesses.filter(guess => {
        const { trackId, userId } = this.currentSong;
        return guess.trackId === trackId && guess.trackOwnerId === userId;
      });
      this.currentGuess = this.guessedList.find(
        guess => guess.userId === this.deviceId
      );
    }
  }
};
</script>
<style lang="scss">
.game {
  width: 800px;
  display: flex;
  flex-wrap: wrap;

  .col {
    width: 50%;
  }
}
</style>
