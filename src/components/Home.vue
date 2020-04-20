<template>
  <div class="home">
    <div class="m-auto sm:w-1/2 w-full">
      <p>
        ACTIVITY_DESCRIPTION
      </p>
      <h3 class="text-gray-800">Enter your name to start a game</h3>
      <t-input
        class="w-full mb-4"
        v-model="name"
        maxlength="50"
        placeholder="Name..."
      />
      <t-button
        id="create-activity_home"
        class="w-full mb-8"
        variant="primary"
        @click="createActivityInstanceMutation"
        :disabled="name.length < 1"
        >Create activity room</t-button
      >
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
    createActivityInstanceMutation() {
      API.graphql(
        graphqlOperation(mutations.createActivityInstance, {
          activityId: variables.activityId,
          hostId: this.deviceId,
          hostName: this.name
        })
      ).then(response => {
        this.$router.push({
          name: "lobby",
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
