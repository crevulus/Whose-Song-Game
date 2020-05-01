<template>
  <div>
    <h4 class="font-semibold">Select a name and confirm</h4>
    <ul class="player-list">
      <li
        :class="{'border-purple-600': selection.playerId === u.userId, 'hover:border-purple-200': selection.playerId !== u.userId}"
        class="flex bg-white p-3 rounded-md relative items-center border-transparent border-2 cursor-pointer"
        v-for="u in users.filter((user => user.userId !== userId))"
        :key="u.userId"
        @click="selectPlayer(u.userId)"
      >
        <p class="my-0 text-indigo-600">{{u.name}}</p>
        <div
          class="absolute right-0 top-0 h-full flex items-center"
          :class="{ hidden: selection.playerId !== u.userId }"
        >
          <Checkbox />
        </div>
      </li>
    </ul>
    <div class="text-right">
      <t-button
        variant="primary"
        @click="submitSelection"
        :disabled="!!this.guess || this.userId === currentSong.userId"
      >Confirm Selection</t-button>
      <p
        v-show="this.userId === currentSong.userId"
      >You can't choose your own song! Sit this one out and wait for the next round.</p>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import Checkbox from "@/components/Checkbox";
// import commonMethods from "@/mixins/commonMethods";

export default {
  name: "PlayerSelectionList",
  props: ["users", "userId", "guess", "currentSong"],
  // mixins: [commonMethods],
  components: { Checkbox },
  data() {
    return {
      activityInstanceId: this.$route.params.activityInstanceId,
      selected: null,
      deviceId: ""
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
      return {};
    }
  },
  methods: {
    selectPlayer(playerId) {
      if (this.selected && this.selected.playerId === playerId) {
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
