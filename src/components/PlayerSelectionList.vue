<template>
  <div>
    <ul class="player-list">
      <li
        :class="{selected: selection && selection.playerId === u.userId}"
        class="card"
        v-for="u in users"
        :key="u.userId"
        @click="selectPlayer(u.userId)"
      >
        <p class="player-name">{{u.name}}</p>
      </li>
    </ul>
    <t-button variant="primary" @click="submitSelection" :disabled="!!this.guess">Confirm Selection</t-button>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";

export default {
  name: "PlayerSelectionList",
  props: ["users", "userId", "guess", "currentSong"],
  data() {
    return {
      activityInstanceId: this.$route.params.activityInstanceId,
      selected: null
    };
  },
  computed: {
    selection() {
      if (this.guess) {
        return {
          trackId: this.guess.trackId,
          playerId: this.guess.selectedUserId
        };
      }
      if (this.selected && this.selected.trackId === this.currentSong.trackId) {
        return this.selected;
      }
      return null;
    }
  },
  methods: {
    selectPlayer(playerId) {
      if (this.selected === playerId) {
        this.selected = null;
        return;
      }
      this.selected = {
        playerId: playerId,
        trackId: this.currentSong.trackId
      };
    },
    submitSelection() {
      API.graphql(
        graphqlOperation(mutations.whoseSongUpdateActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.userId,
          selectedUserId: this.selected.playerId,
          action: "submitSelection"
        })
      );
    }
  }
};
</script>
<style lang="scss">
.player-name {
  margin: 0;
}
</style>
