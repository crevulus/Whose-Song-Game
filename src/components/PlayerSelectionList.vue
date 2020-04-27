<template>
  <div>
    <ul class="player-list">
      <li
        :class="{selected: selectedPlayer === u.userId}"
        v-for="u in users"
        :key="u.userId"
        @click="selectPlayer(u.userId)"
      >
        <p>{{u.name}}</p>
      </li>
    </ul>
    <t-button
      variant="primary"
      @click="submitSelection"
      :disabled="hasVoted || !selectedPlayer "
    >Confirm selection</t-button>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";

export default {
  name: "PlayerSelectionList",
  props: ["users", "userId", "hasVoted"],
  data() {
    return {
      activityInstanceId: this.$route.params.activityInstanceId,
      selectedPlayer: false
    };
  },
  methods: {
    selectPlayer(playerId) {
      if (this.selectedPlayer === playerId) {
        this.selectedPlayer = false;
        return;
      }
      this.selectedPlayer = playerId;
    },
    submitSelection() {
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.userId,
          selectedUserId: this.selectedPlayer,
          action: "submitSelection"
        })
      );
      this.selectedPlayer = false;
    }
  }
};
</script>
<style lang="scss">
.player-list {
  li.selected {
    background-color: lime;
  }
}
</style>
