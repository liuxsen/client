import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import ShopCreate from './pages/shop/Create.vue';
import ShopList from './pages/shop/List.vue';
import StaffList from './pages/kpi/staff/list.vue';
import StaffEdit from './pages/kpi/staff/edit.vue';
import WorkTypeEdit from './pages/kpi/staff/work-type.vue';

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
          path: 'shop/create',
          name: 'shopCreate',
          component: ShopCreate,
          meta: { title: '创建店铺' },
        },
        {
          path: 'shop/edit/:id',
          name: 'shopEdit',
          component: ShopCreate,
          meta: { title: '修改店铺' },
        },
        {
          path: 'shop/list',
          name: 'shopList',
          component: ShopList,
          meta: { title: '店铺管理' },
        },
        // ========绩效kpi==============
        {
          path: 'kpi/staff/list',
          name: 'staffList',
          component: StaffList,
          meta: {
            title: '员工管理',
          },
        },
        {
          path: 'kpi/staff/create',
          name: 'staffCreate',
          component: StaffEdit,
          meta: {
            title: '新建员工',
          },
        },
        {
          path: 'kpi/staff/edit/:id',
          name: 'staffEdit',
          component: StaffEdit,
          meta: {
            title: '修改员工信息',
          },
        },
        {
          path: 'kpi/staff/worktype',
          name: 'workTypeCreate',
          component: WorkTypeEdit,
          meta: {
            title: '新建工种类型',
          },
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
