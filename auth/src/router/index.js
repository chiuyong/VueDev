import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import SignIn from "@/components/auth/SignIn";
import SearchUser from "@/components/user/SearchUser";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/searchuser"
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/searchuser",
      name: "SearchUser",
      component: SearchUser,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/signin');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
