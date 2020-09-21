import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";
import "firebase/auth";


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "registration" */ '../views/Registration.vue')
  }, 
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ad/:id',
    name: 'Ad',
    props: true,
    component: () => import(/* webpackChunkName: "ad" */ '../views/Ad.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (!user && to.matched.some(route => route.meta.requiresAuth)) {
      next({ path: "/login" });
    } else {
      next();
    }
  });
});

export default router
