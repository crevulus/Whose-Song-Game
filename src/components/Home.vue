<template>
  <div class="flex">
    <div class="w-full md:w-1/2 m-auto p-5">
      <ol class="list-decimal list-inside">
        <li>
          <strong>Call your colleagues!</strong> Use Hangouts, Skype, Zoom etc. and put the window to one side.
        </li>
        <li>
          <strong>Enter your name</strong> and create a new game room.
        </li>
        <li>
          <strong>Search for your favourite song</strong> and press confirm once you've chosen.
        </li>
        <li>
          <strong>Copy the link</strong> and share with your colleagues, then wait for them to join.
        </li>
        <li>
          When you're ready:
          <strong>hit start and play!</strong>
        </li>
      </ol>
      <h3 class="text-gray-800">Enter your name to start a game</h3>
      <div class="input-container">
        <t-input
          class="w-full mb-4 focus:border-black"
          v-model="name"
          maxlength="50"
          placeholder="Name..."
          @keyup.enter="createActivityInstance"
        />
        <t-button
          id="create-activity_home"
          class="w-full mb-8"
          variant="primary"
          @click="createActivityInstance"
          :disabled="name.length < 1"
        >Create activity room</t-button>
      </div>
    </div>
    <div class="hidden md:block">
      <iframe
        class="rounded-sm"
        src="https://open.spotify.com/embed/track/6sT9MWlJManry3EQwf4V80"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import variables from "@/variables";

export default {
  name: "Home",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    ...mapGetters(["deviceId"])
  },
  methods: {
    async createActivityInstance() {
      const res = await API.graphql(
        graphqlOperation(mutations.createActivityInstance, {
          activityId: variables.activityId,
          hostId: this.deviceId,
          hostName: this.name
        })
      );
      const { activityInstanceId } = res.data.createActivityInstance;

      await API.graphql(
        graphqlOperation(mutations.whoseSongCreateActivityInstanceData, {
          activityInstanceId: activityInstanceId,
          userId: this.deviceId
        })
      );

      this.$router.push({
        name: "input",
        params: { activityInstanceId }
      });
    }
  }
};
</script>
