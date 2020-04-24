<template>
  <div class="activity">
    <t-button variant="primary" @click="endActivityInstanceMutation">End</t-button>
    <iframe
      :src="`https://open.spotify.com/embed/track/${currentSong.trackId}`"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
    <UsersList
      :users="this.users"
      :isHost="this.isHost"
      :deviceId="this.deviceId"
      :hostId="this.hostId"
      :isActivityPage="true"
    />
  </div>
</template>
<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import * as queries from "@/graphql/queries";
import commonMethods from "@/mixins/commonMethods";
import UsersList from "@/components/UsersList";

export default {
  name: "Activity",
  components: { UsersList },
  mixins: [commonMethods],
  data() {
    return {
      currentSong: {
        trackId: "3caMfJGFp53NAH2TuigdNj"
      }
    };
  },
  created() {
    this.getActivityInstanceQuery();
    this.getActivityInstanceData();
    this.updatedActivityInstanceDataSubscription();
  },
  methods: {
    endActivityInstanceMutation() {
      API.graphql(
        graphqlOperation(mutations.endActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      );
    },
    getActivityInstanceData() {
      console.log(this.activityInstanceId);
      API.graphql(
        graphqlOperation(queries.whoseSongGetActivityInstanceData, {
          activityInstanceId: this.activityInstanceId,
          userId: this.deviceId
        })
      ).then(response => {
        // refactor later - famous last words...
        const {
          currentSong,
          playedSongs,
          score,
          songs,
          voteCount
        } = response.data.whoseSongGetActivityInstanceData;
        this.currentSong = currentSong;
        this.playedSongs = playedSongs;
        this.score = score;
        this.songs = songs;
        this.voteCount = voteCount;
      });
    },
    updatedActivityInstanceDataSubscription() {
      API.graphql(
        graphqlOperation(subscriptions.whoseSongUpdatedActivityInstanceData, {
          activityInstanceId: this.activityInstanceId
        })
      ).subscribe(response => {
        const {
          currentSong,
          playedSongs,
          score,
          songs,
          voteCount
        } = response.value.data.whoseSongUpdatedActivityInstanceData;
        this.currentSong = currentSong;
        this.playedSongs = playedSongs;
        this.score = score;
        this.songs = songs;
        this.voteCount = voteCount;
        console.log(currentSong);
      });
    }
  }
};
</script>
