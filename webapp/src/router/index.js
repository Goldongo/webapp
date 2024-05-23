import { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import TeamBuilding from "@/views/TeamBuilding.vue";
import Home from "@/views/Home.vue";

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
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true, requiresTeam: true },
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
      return;
    }

    const hasTeam = await checkTeam();

    if (to.path === "/") {
      next({ path: "/teambuilding" });
      return;
    } else if (to.path === "/teambuilding" && hasTeam) {
      next({ path: "/home" });
      return;
    } else if (to.meta.requiresTeam && !hasTeam) {
      next({ path: "/teambuilding" });
      return;
    }
  } else if (to.path === "/" && token) {
    const isAuthenticated = await checkAuth();

    if (isAuthenticated) {
      next({ path: "/teambuilding" });
      return;
    }
  }

  next();
});

export default router;
