import Vue from "vue";
import Router from "vue-router";
import Activity from "@/components/Activity";
import Home from "@/components/Home";
import Join from "@/components/Join";
import Lobby from "@/components/Lobby";
import End from "@/components/End";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/join/:activityInstanceId",
      name: "join",
      component: Join
    },
    {
      path: "/lobby/:activityInstanceId",
      name: "lobby",
      component: Lobby
    },
    {
      path: "/activity/:activityInstanceId",
      name: "activity",
      component: Activity
    },
    {
      path: "/end/:activityInstanceId",
      name: "end",
      component: End
    }
  ]
});

export default router;
