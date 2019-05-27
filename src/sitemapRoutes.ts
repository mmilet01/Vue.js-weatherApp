import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Random from "./views/Random.vue";
import Details from "./views/Details.vue";

Vue.use(Router);

const constants = require("../src/assets/constants.json");
/* let IDs = [];

constants.map(x => {
  IDs.push(x.id);
});
 */

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/random",
      name: "random",
      component: Random
    },
    {
      path: "/city/:id",
      name: "details",
      component: Details
    }
  ]
});

module.exports = router;
