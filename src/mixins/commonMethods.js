import { mapGetters } from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/queries";
import variables from "@/variables";

const hostMappings = {
  join: {
    waiting: "lobby",
    started: "activity",
    ended: "end"
  },
  lobby: {
    started: "activity",
    ended: "end"
  },
  activity: {
    waiting: "lobby",
    ended: "end"
  },
  end: {
    waiting: "lobby",
    started: "activity"
  }
};

const existingUserMappings = {
  join: {
    waiting: "lobby",
    started: "activity",
    ended: "end"
  },
  lobby: {
    started: "activity",
    ended: "end"
  },
  activity: {
    waiting: "lobby",
    ended: "end"
  },
  end: {
    waiting: "lobby",
    started: "activity"
  }
};

const newUserMappings = {
  lobby: {
    waiting: "join",
    started: "join",
    ended: "join"
  },
  activity: {
    waiting: "join",
    started: "join",
    ended: "join"
  },
  end: {
    waiting: "join",
    started: "join",
    ended: "join"
  }
};

function getUserId(item) {
  return item.userId;
}

export default {
  data() {
    return {
      activityInstanceId: this.$route.params.activityInstanceId,
      isHost: false,
      users: [],
      hostId: "",
      status: "",
      activity: {}
    };
  },
  computed: {
    ...mapGetters(["deviceId"])
  },
  created() {
    this.getActivityInstanceQuery();
  },
  methods: {
    getActivityQuery() {
      API.graphql(
        graphqlOperation(queries.getActivity, {
          activityId: variables.activityId
        })
      ).then(response => {
        const data = response.data.getActivity;
        this.activity = data;
      });
    },
    getActivityInstanceQuery() {
      API.graphql(
        graphqlOperation(queries.getActivityInstance, {
          activityInstanceId: this.activityInstanceId
        })
      ).then(response => {
        const data = response.data.getActivityInstance;
        this.isHost = data.hostId == this.deviceId;
        this.hostId = data.hostId;
        this.users = data.users;
        this.status = data.status;
        this.redirectToRoute(data);
      });
    },
    redirectTo(path, activityInstanceId) {
      this.$router.push({
        name: path,
        params: {
          activityInstanceId: activityInstanceId
        }
      });
    },
    followMappings(routeName, status, activityInstanceId, mappings) {
      for (let [key, value] of Object.entries(mappings)) {
        if (key == routeName) {
          for (let [k, v] of Object.entries(value)) {
            if (k == status) {
              this.redirectTo(v, activityInstanceId);
            }
          }
        }
      }
    },
    redirectToRoute(data) {
      if (this.isHost) {
        this.followMappings(
          this.$route.name,
          data.status,
          data.activityInstanceId,
          hostMappings
        );
      } else if (data.users.map(getUserId).includes(this.deviceId)) {
        this.followMappings(
          this.$route.name,
          data.status,
          data.activityInstanceId,
          existingUserMappings
        );
      } else {
        this.followMappings(
          this.$route.name,
          data.status,
          data.activityInstanceId,
          newUserMappings
        );
      }
    }
  }
};
