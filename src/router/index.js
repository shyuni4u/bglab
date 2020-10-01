import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "default",
    component: () => 
      import("../views/Home.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => 
      import("../views/Home.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../views/Test.vue")
  },
  {
    path: "/notice",
    name: "notice",
    component: () =>
      import("../views/Notice.vue")
  },
  {
    path: "/player",
    name: "player",
    component: () =>
      import("../views/Player.vue")
  },
  {
    path: "/direct/player/:player_id",
    name: "direct_player",
    component: () =>
      import("../views/DirectPlayer.vue")
  },
  {
    path: "/hero",
    name: "hero",
    component: () =>
      import("../views/Hero.vue")
  },
  {
    path: "/minion",
    name: "minion",
    component: () =>
      import("../views/Minion.vue")
  },
  {
    path: "/race",
    name: "race",
    component: () =>
      import("../views/Race.vue")
  },
  {
    path: "/gameDetail",
    name: "gameDetail",
    component: () =>
      import("../views/GameDetail.vue")
  },
  {
    path: "/gameDetail2/:game_id",
    props: true,
    name: "gameDetail2",
    component: () =>
      import("../views/GameDetail2.vue")
  },
  {
    path: "/static",
    name: "static",
    component: () =>
      import("../views/Static.vue")
  },
  {
    path: "/raceChart",
    name: "raceChart",
    component: () =>
      import("../views/RaceChart.vue")
  },
  {
    path: "/manual",
    name: "manual",
    component: () =>
      import("../views/Manual.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
});

export default router;
