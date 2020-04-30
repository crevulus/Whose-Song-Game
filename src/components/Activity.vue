<template>
  <div class="activity flex flex-wrap mx-auto" style="max-width: 1280px">
    <div class="flex flex-wrap sm:flex-no-wrap w-full lg:w-2/3" style="max-width: 650px">
      <div class="w-full mx-auto sm:w-1/2 p-2" style="width: calc(300px + 1rem)">
        <h4 class="font-semibold">Whose song is this?</h4>
        <iframe
          v-if="currentSong.trackId"
          class="rounded-sm"
          :src="`https://open.spotify.com/embed/track/${currentSong.trackId}`"
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      <div class="w-full mx-auto sm:flex-grow p-2">
        <PlayerSelectionList
          v-if="!isSongOwner"
          :users="this.users"
          :userId="this.deviceId"
          :guess="currentGuess"
          :currentSong="currentSong"
        />
        <UserGuesses v-if="isSongOwner" :users="usersGuessList" :userId="this.deviceId" />
      </div>
    </div>
    <div
      class="flex flex-col p-2 bg-purple-700 rounded-xxl px-8 py-20 absolute right-0"
      style="top: 75px; min-height: calc(100vh - 225px)"
      :class="{'rounded-r-none': collapsed}"
    >
      <!-- Toggle collapse participants panel -->
      <div class="absolute left-0" style="top: 50%; transform: translateY(-50%);">
        <button v-on:click="collapsed = !collapsed">
          <svg
            v-if="collapsed"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg
            v-if="!collapsed"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div>
        <p class="text-white font-semibold">Participants</p>
        <Participants
          :songOwner="currentSong.userId"
          :participants="participants"
          :isSongOwner="isSongOwner"
          :hasGuessed="hasGuessed"
        />
      </div>
      <div v-if="isHost" class="mt-auto">
        <p class="text-white font-semibold">🕹Host controls</p>
        <t-button
          class="w-full mb-4"
          v-if="songs.length > 0"
          variant="warning"
          @click="showNextSong"
        >Skip Song</t-button>
        <t-button
          class="w-full mb-4"
          variant="warning"
          v-else
          @click="endActivityInstanceMutation"
        >Skip to Results</t-button>
        <t-button class="w-full" variant="warning" @click="endActivityInstanceMutation">End Game</t-button>
      </div>
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
import Participants from "@/components/Participants";
import UserGuesses from "@/components/UserGuesses";

export default {
  name: "Activity",
  components: {
    ActivityDebugger,
    PlayerSelectionList,
    Participants,
    UserGuesses
  },
  mixins: [commonMethods],
  data() {
    return {
      currentSong: {},
      songs: [],
      playedSongs: [],
      score: [],
      guesses: [],
      showDebugger: false,
      currentGuess: null,
      collapsed: false
    };
  },
  computed: {
    participants() {
      return this.users.map(user => ({
        name: user.name,
        hasGuessed: this.userHasGuessed(user.userId),
        userId: user.userId
      }));
    },
    hasNextSong() {
      return this.songs.length > 0;
    },
    isSongOwner() {
      return this.deviceId === this.currentSong.userId;
    },
    hasGuessed() {
      return this.userHasGuessed(this.deviceId);
    },
    usersGuessList() {
      return this.users.map(user => {
        const guess = this.guesses.find(
          guess =>
            guess.trackId === this.currentSong.trackId &&
            guess.userId === user.userId
        );
        return {
          name: user.name,
          userId: user.userId,
          hasGuessed: !!guess,
          isCorrect: guess && guess.selectedUserId === guess.trackOwnerId
        };
      });
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

        if (this.guessedList.length === this.users.length - 1) {
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
      this.guessedList = this.guesses.filter(guess => {
        const { trackId, userId } = this.currentSong;
        return guess.trackId === trackId && guess.trackOwnerId === userId;
      });
      this.currentGuess = this.guessedList.find(
        guess => guess.userId === this.deviceId
      );
    },
    userHasGuessed(userId) {
      return !!this.guesses.find(
        guess =>
          guess.userId === userId && guess.trackId === this.currentSong.trackId
      );
    }
  }
};
</script>
