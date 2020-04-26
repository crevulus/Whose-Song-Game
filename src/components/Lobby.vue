<template>
  <div class="lobby">
    <div class="flex flex-wrap">
      <div class="sm:w-1/2 w-full sm:pr-4 sm:mb-0 mb-4">
        <p v-for="user in isHostComputed" :key="user.userId">{{user.name}}</p>
        <p class="text-gray-800">Invite your colleagues and wait for them to join the game.</p>
        <p v-for="user in isUserComputed" :key="user.userId">{{user.name}}</p>
        <Share :activityInstanceId="activityInstanceId" :elementId="'copy-link_lobby'" />
      </div>
      <div class="sm:w-1/2 w-full sm:pl-4">
        <UsersList
          :users="users"
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
              users.length > activity.maxPlayers
          "
        >Start</t-button>
        <t-button :to="{ name: 'home' }" class="w-full" variant="primary">Home</t-button>
      </div>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import Share from "@/components/Share";
import UsersList from "@/components/UsersList";
import commonMethods from "@/mixins/commonMethods";

export default {
  name: "Lobby",
  mixins: [commonMethods],
  components: { Share, UsersList },
  created() {
    this.getActivityQuery();
    this.updatedActivityInstanceSubscription();
  },
  methods: {
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
    }
  },
  computed: {
    isUserComputed: function() {
      const deviceId = this.deviceId;
      return this.users.filter(function (user) {
        if (user.userId === deviceId) {
          return user.name;
        }
      });
    },
    isHostComputed: function() {
      const hostId = this.hostId;
      return this.users.filter(function (user) {
        if (user.userId === hostId) {
          return user.name;
        }
      });
    }
  },
};
</script>
