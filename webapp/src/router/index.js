import { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import TeamBuilding from "@/views/TeamBuilding.vue";

import { getToken, checkAuth, checkTeam } from "@/utils/authUtils";

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
    meta: { requiresAuth: false, requiresTeam: false },
  },
  {
    path: "/teambuilding",
    name: "teambuilding",
    component: TeamBuilding,
    meta: { requiresAuth: true, requiresTeam: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = getToken();

  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
      return; // Return here to prevent further execution
    }
  } else if (to.path === "/" && token) {
    const isAuthenticated = await checkAuth();

    if (isAuthenticated) {
      next({ path: "/teambuilding" });
      return; // Return here to prevent further execution
    }
  }

  // If none of the conditions were met, proceed with the navigation
  next();
});

export default router;
