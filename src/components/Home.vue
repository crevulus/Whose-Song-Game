<template>
  <div class="home">
    <div class="m-auto w-full">
      <ul class="explanation">
        <li v-for="(item) in 5" v-bind:key="item">This is the explanation for this game.</li>
      </ul>
      <h3 class="text-gray-800">Enter your name to start a game</h3>
      <div class="input-container">
        <t-input class="w-full mb-4" v-model="name" maxlength="50" placeholder="Name..." @keyup.enter="createActivityInstance" />
        <t-button
          id="create-activity_home"
          class="w-full mb-8"
          variant="primary"
          @click="createActivityInstance"
          :disabled="name.length < 1"
        >Create activity room</t-button>
      </div>
    </div>
    <iframe
      class="play-btn"
      src="https://open.spotify.com/embed/track/6sT9MWlJManry3EQwf4V80"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
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
<style>
.home {
  display: flex;
  flex-direction: row;
}

.input-container {
  justify-content: center;
  width: 90%;
}

.play-btn {
  display: inline;
}

.explanation {
  display: inline;
}
</style>
