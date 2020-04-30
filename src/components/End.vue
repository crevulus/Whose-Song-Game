<template>
  <div class="end px-6 w-3/4 m-auto">
    <ScoreBoard :users="formattedUsers" />
    <div class="flex justify-between">
      <span
        title="Obscurity: Participants that didn't guess your song
Familiarity: Number of songs you guessed correctly"
      >
        <p class="border-dotted border-b-2 border-gray-500 mt-2">What do these results mean?</p>
      </span>
      <t-button
        on
        variant="warning"
        id="start-new-activity_end"
        @click="startNewActivity"
        v-if="isHost"
      >Play again?</t-button>
    </div>
    <p class="m-8">
      Do you want to get early access and product updates? Feel free to drop us
      your email
    </p>
    <section v-if="!submitted" class="flex">
      <t-input
        class="w-full mr-2"
        placeholder="Email"
        type="email"
        icon-pack="fas"
        icon="envelope"
        v-model="email"
        v-if="!submitted"
        required
      />
      <t-button @click="submitEmail" variant="warning" :disabled="!email" id="sign-up_end">Submit</t-button>
    </section>
    <p v-if="submitted">
      ✅ Thank you! You're added to the waiting list and will be one of the
      first to know when we're live!
    </p>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import * as queries from "@/graphql/queries";
import axios from "axios";
import commonMethods from "@/mixins/commonMethods";
import ScoreBoard from "@/components/ScoreBoard";

export default {
  name: "End",
  mixins: [commonMethods],
  components: { ScoreBoard },
  data() {
    return {
      email: null,
      submitted: false,
      formattedUsers: [],
      guesses: []
    };
  },
  created() {
    this.startedNewActivityInstanceSubscription();
    this.getActivityInstance();
    this.getActivityInstanceData();
  },
  methods: {
    formatUsers() {
      const obscurities = this.guesses.reduce((acc, guess) => {
        const { trackOwnerId, selectedUserId } = guess;
        if (acc[trackOwnerId] == undefined) {
          acc[trackOwnerId] = 0;
        }
        if (selectedUserId !== trackOwnerId) {
          acc[trackOwnerId] += 1;
        }
        return acc;
      }, {});
      this.users.forEach(({ name, userId }) => {
        this.formattedUsers.push({
          name: name,
          song: this.songs.find(song => song.userId === userId),
          score: this.score.find(score => score.userId === userId).score,
          obscurity: obscurities[userId] || 0,
          userId: userId
        });
      });
      this.formattedUsers.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score === b.score) return 0;
        if (a.score < b.score) return 1;
      });
    },
    async getActivityInstance() {
      await API.graphql(
        graphqlOperation(queries.getActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      ).then(res => {
        const data = res.data.getActivityInstance;
        this.users = data.users;
      });
    },
    getActivityInstanceData() {
      API.graphql(
        graphqlOperation(queries.whoseSongGetActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      ).then(res => {
        const data = res.data.whoseSongGetActivityInstanceData;
        this.songs = data.playedSongs;
        this.score = data.score;
        this.guesses = data.guesses;
        this.formatUsers();
      });
    },
    submitEmail() {
      var p = this;
      var bodyFormData = new FormData();
      bodyFormData.set("email", this.email);
      axios({
        method: "post",
        url: process.env.VUE_APP_SK_ENDPOINT,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(function(response) {
        p.email = null;
        p.submitted = true;
        return response;
      });
    },
    async startNewActivity() {
      const res = await API.graphql(
        graphqlOperation(mutations.startNewActivityInstance, {
          oldActivityInstanceId: this.activityInstanceId
        })
      );
      const { newActivityInstanceId } = res.data.startNewActivityInstance;
      API.graphql(
        graphqlOperation(mutations.whoseSongCreateActivityInstanceData, {
          activityInstanceId: newActivityInstanceId,
          userId: this.deviceId
        })
      ).then(() => {
        this.redirectTo("input", newActivityInstanceId);
      });
    },
    updateActivityInstanceUsersMutation(activityInstanceId) {
      var name;
      for (const user of this.users) {
        if (user.userId == this.deviceId) {
          name = user.name;
        }
      }
      API.graphql(
        graphqlOperation(mutations.updateActivityInstanceUsers, {
          activityInstanceId: activityInstanceId,
          userId: this.deviceId,
          userName: name
        })
      ).then(response => {
        const data = response.data.updateActivityInstanceUsers;
        this.redirectTo("input", data.activityInstanceId);
      });
    },
    async startedNewActivityInstanceSubscription() {
      await API.graphql(
        graphqlOperation(subscriptions.startedNewActivityInstance, {
          oldActivityInstanceId: this.activityInstanceId
        })
      ).subscribe({
        next: response => {
          if (!this.isHost) {
            const data = response.value.data.startedNewActivityInstance;
            this.updateActivityInstanceUsersMutation(
              data.newActivityInstanceId
            );
          }
        }
      });
    }
  }
};
</script>
