import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/component-a",
      name: "ComponentA",
      component: () => import("./views/ComponentA.vue"),
    },
    {
      path: "/component-b",
      name: "ComponentB",
      component: () => import("./views/ComponentB.vue"),
    },
  ],
});

export default router;
