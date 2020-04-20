<template>
  <div class="end">
    <t-button
      variant="primary"
      id="start-new-activity_end"
      @click="startNewActivity"
      v-if="isHost"
      >Play again?</t-button
    >
    <p>
      Do you want to get early access and product updates? Feel free to drop us
      your email
    </p>
    <section v-if="!submitted">
      <t-input
        placeholder="Email"
        type="email"
        icon-pack="fas"
        icon="envelope"
        v-model="email"
        v-if="!submitted"
        required
      />
      <t-button @click="submitEmail" :disabled="!email" id="sign-up_end"
        >Submit</t-button
      >
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
import axios from "axios";
import commonMethods from "@/mixins/commonMethods";

export default {
  name: "End",
  mixins: [commonMethods],
  data() {
    return {
      email: null,
      submitted: false
    };
  },
  created() {
    this.startedNewActivityInstanceSubscription();
  },
  methods: {
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
    startNewActivity() {
      API.graphql(
        graphqlOperation(mutations.startNewActivityInstance, {
          oldActivityInstanceId: this.activityInstanceId
        })
      ).then(response => {
        const data = response.data.startNewActivityInstance;
        this.redirectTo("lobby", data.newActivityInstanceId);
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
        this.redirectTo("lobby", data.activityInstanceId);
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
