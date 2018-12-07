import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import ShopCreate from './pages/shop/Create.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'shop',
          name: 'shopCreate',
          component: ShopCreate,
          meta: { title: '创建店铺' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
