<template>
  <div class="activity">
    <t-button variant="primary" @click="endActivityInstanceMutation"
      >End</t-button
    >
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import commonMethods from "@/mixins/commonMethods";

export default {
  name: "Activity",
  mixins: [commonMethods],
  methods: {
    endActivityInstanceMutation() {
      API.graphql(
        graphqlOperation(mutations.endActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      );
    }
  }
};
</script>
