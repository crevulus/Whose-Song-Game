<template>
  <section>
    <t-table :headers="headers" :data="users">
      <template v-slot:row="props">
        <tr
          :class="[
            props.trClass,
            props.rowIndex % 2 === 0 ? 'bg-gray-100' : ''
          ]"
        >
          <td :class="props.tdClass">{{ props.row.name }}</td>
          <td :class="props.tdClass">
            <t-button
              @click="removeUser(props.row.userId)"
              size="sm"
              variant="danger"
              v-if="isHost && deviceId != props.row.userId"
            >Remove</t-button>
          </td>
        </tr>
      </template>
    </t-table>
  </section>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";

export default {
  name: "UsersList",
  props: ["users", "isHost", "deviceId", "hostId"],
  data() {
    let headers = [
      {
        value: "name",
        id: "name",
        text: "🏆 Players online"
      },
      {
        value: "actions",
        id: "actions",
        text: "Actions"
      }
    ];

    return {
      activityInstanceId: this.$route.params.activityInstanceId,
      headers: headers
    };
  },
  methods: {
    removeUser(userId) {
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId,
          action: "removeSong",
          targetId: userId
        })
      ).then(console.log);

      API.graphql(
        graphqlOperation(mutations.removeUserFromActivityInstance, {
          activityInstanceId: this.activityInstanceId,
          removedUserId: userId
        })
      );
    }
  }
};
</script>
