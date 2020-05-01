<template>
  <div class="lobby mx-auto" style="max-width: 800px">
    <div class="flex flex-wrap">
      <div class="sm:w-1/2 w-full sm:pr-4 sm:mb-0 mb-4">
        <h3 v-if="currentUser">Welcome, {{currentUser.name}}!</h3>
        <p v-if="!isHost && currentHost">
          The host of this round of "Whose Favourite Song is That?" is
          <strong>{{currentHost.name}}</strong>.
        </p>
        <p v-else>You're the host of this round of "Whose Favourite Song is That?"</p>
        <p class="text-gray-800">Invite your colleagues and wait for them to join the game.</p>
        <p class="font-bold">Be sure to turn down your volume or put on headphones!</p>
        <Share
          class="mb-2"
          :activityInstanceId="activityInstanceId"
          :elementId="'copy-link_lobby'"
        />
        <h3>Your Song:</h3>
        <iframe
          v-if="findSong"
          class="play-btn"
          :src="`https://open.spotify.com/embed/track/${findSong.trackId}`"
          width="300"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      <div class="sm:w-1/2 w-full sm:pl-4">
        <UsersList
          :users="filteredUsers"
          :isHost="isHost"
          :deviceId="deviceId"
          :hostId="hostId"
          class="mb-4"
        />
        <p v-if="isHost" class="text-gray-800">Press start when everyone is ready!</p>
        <t-button
          class="w-full"
          id="start-activity_lobby"
          variant="primary"
          v-if="isHost"
          @click="startActivityInstanceMutation"
          :disabled="
            !activity ||
              songs.length < activity.minPlayers ||
              songs.length > activity.maxPlayers
          "
        >Start</t-button>
      </div>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import Share from "@/components/Share";
import UsersList from "@/components/UsersList";
import commonMethods from "@/mixins/commonMethods";

export default {
  name: "Lobby",
  mixins: [commonMethods],
  components: { Share, UsersList },
  data() {
    return {
      songs: []
    };
  },
  created() {
    this.getActivityQuery();
    this.getActivityInstanceData();
    this.updatedActivityInstanceSubscription();
    this.updatedActivityInstanceDataSubscription();
  },
  methods: {
    async getActivityInstanceData() {
      await API.graphql(
        graphqlOperation(queries.whoseSongGetActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      ).then(res => {
        const data = res.data.whoseSongGetActivityInstanceData;
        this.songs = data.songs;
      });
    },
    async updatedActivityInstanceSubscription() {
      await API.graphql(
        graphqlOperation(subscriptions.updatedActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe({
        next: response => {
          const data = response.value.data.updatedActivityInstance;
          this.isHost = data.hostId == this.deviceId;
          this.hostId = data.hostId;
          this.users = data.users;
          this.status = data.status;
          this.redirectToRoute(data);
        }
      });
    },
    async startActivityInstanceMutation() {
      const usersWithoutSong = this.users.filter(
        ({ userId }) => !this.songs.find(s => s.userId === userId)
      );
      await Promise.all(
        usersWithoutSong.map(user => this.removeUser(user.userId))
      );
      await API.graphql(
        graphqlOperation(mutations.whoseSongStartActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      );
      API.graphql(
        graphqlOperation(mutations.startActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      );
    },
    async updatedActivityInstanceDataSubscription() {
      await API.graphql(
        graphqlOperation(subscriptions.whoseSongUpdatedActivityInstanceData, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe({
        next: res => {
          this.songs =
            res.value.data.whoseSongUpdatedActivityInstanceData.songs;
        }
      });
    },
    async removeUser(userId) {
      return API.graphql(
        graphqlOperation(mutations.removeUserFromActivityInstance, {
          activityInstanceId: this.activityInstanceId,
          removedUserId: userId
        })
      );
    }
  },
  computed: {
    findSong: function() {
      return this.songs.find(song => song.userId === this.deviceId);
    },
    currentUser: function() {
      return this.users.find(user => user.userId === this.deviceId);
    },
    currentHost: function() {
      return this.users.find(user => user.userId === this.hostId);
    },
    filteredUsers: function() {
      return this.users.filter(u =>
        this.songs.find(s => s.userId === u.userId)
      );
    }
  }
};
</script>
