import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Saved from "./views/Saved.vue";
import Random from "./views/Random.vue";
import Details from "./views/Details.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/random",
      name: "random",
      // route level code-splitting
      // this generates a separate chunk (random.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Random,
      /*    component: () =>
        import(/* webpackChunkName: 'random'  './views/Random.vue') */
    },
    {
      path: "/city/:id",
      name: "details",
      component: Details,
    },
    {
      path: "/saved",
      name: "saved",
      component: Saved,
    },
  ],
});
