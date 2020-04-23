<template>
  <div class="home">
    <div class="m-auto w-full">
      <!-- sm:w-1/2 -->
      <ul class="explanation">
        <li v-for="(item) in 5" v-bind:key="item">This is the explanation for this game.</li>
      </ul>
      <h3 class="text-gray-800">Enter your name to start a game</h3>
      <div class="input-container">
        <t-input class="w-full mb-4" v-model="name" maxlength="50" placeholder="Name..." />
        <t-button
          id="create-activity_home"
          class="w-full mb-8"
          variant="primary"
          @click="createActivityInstanceMutation"
          :disabled="name.length < 1"
        >Create activity room</t-button>
      </div>
    </div>

    <iframe
      class="play-btn"
      src="https://open.spotify.com/embed/track/45DElIx0dXqUH4A88yQFdE"
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
    async createActivityInstanceMutation() {
      const res = await API.graphql(
        graphqlOperation(mutations.createActivityInstance, {
          activityId: variables.activityId,
          hostId: this.deviceId,
          hostName: this.name
        })
      );
      console.log(res);

      await API.graphql(mutations.whoseSongCreateActivityInstanceData, {
        activityInstanceId: res.data.createActivityInstance.activityInstanceId,
        userId: this.deviceId
      }).then(response => {
        console.log(response);
        this.$router.push({
          name: "input",
          params: {
            activityInstanceId:
              response.data.createActivityInstance.activityInstanceId
          }
        });
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
