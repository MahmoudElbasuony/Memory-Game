import Vue from "vue";
import App from "./components/App.vue";
import VueRouter from "vue-router";
import Welcome from "./components/welcome/welcome.vue";
import GameCard from "./components/card/card.vue";
import Loader from "./components/loader/loader.vue";
import { gameboardRouts } from "./routes/gameboard-routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.component("loader", Loader);
Vue.component("game-card", GameCard);

const appRouter = new VueRouter({
  routes: [
    ...gameboardRouts,
    { path: "/", component: Welcome }
  ]
});

new Vue({
  el: "#app",
  router: appRouter,
  render: h => h(App)
});
