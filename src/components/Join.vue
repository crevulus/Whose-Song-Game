<template>
  <div class="mx-auto" style="max-width: 800px">
    <div class="m-auto sm:w-1/2 w-full">
      <ul>
        <li>Search for your favourite song and press confirm once you've chosen.</li>
        <li>Wait for your colleagues to join, and then {{currentHost.name}} will start the game!</li>
      </ul>
      <h3 class="text-gray-800">Enter your name to join the game</h3>
      <t-input
        class="w-full mb-4"
        v-model="name"
        maxlength="50"
        placeholder="Name..."
        @keyup.enter="updateActivityInstanceUsersMutation"
      />
      <t-button
        class="w-full mb-8"
        id="join-activity_join"
        variant="primary"
        @click="updateActivityInstanceUsersMutation"
        :disabled="
          name.length < 1 ||
            !activity ||
            users.length >= activity.maxPlayers ||
            (status != 'waiting' && !activity.canJoinAfterStarted)
        "
      >Join</t-button>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import commonMethods from "@/mixins/commonMethods";

export default {
  name: "Join",
  mixins: [commonMethods],
  data() {
    return {
      name: ""
    };
  },
  computed: {
    currentHost: function() {
      return this.users.find(user => user.userId === this.hostId);
    }
  },
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
    updateActivityInstanceUsersMutation() {
      API.graphql(
        graphqlOperation(mutations.updateActivityInstanceUsers, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId,
          userName: this.name
        })
      ).then(response => {
        const data = response.data.updateActivityInstanceUsers;
        this.$router.push({
          name: "input",
          params: {
            activityInstanceId: data.activityInstanceId
          }
        });
      });
    }
  }
};
</script>
