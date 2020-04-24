<template>
  <div class="activity">
    <t-button variant="primary" @click="endActivityInstanceMutation">End</t-button>
    <UsersList
      :users="this.users"
      :isHost="this.isHost"
      :deviceId="this.deviceId"
      :hostId="this.hostId"
    />
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import commonMethods from "@/mixins/commonMethods";
import UsersList from "@/components/UsersList";

export default {
  name: "Activity",
  components: { UsersList },
  mixins: [commonMethods],
  created() {
    this.getActivityInstanceQuery();
  },
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
