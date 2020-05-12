import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/loogin',
    name: 'loogin',
    component: (resolve) => require(['@/components/pages/login'], resolve),
  },
  {
    path: '/code',
    name: 'code',
    component: (resolve) => require(['@/components/pages/login/code'], resolve),
  },
  {
    path: '/',
    component: (resolve) => require(['@/components/pages/home'], resolve),
    children: [{
      path: '/rucang',
      name: 'rucang',
      component: (resolve) => require(['@/components/pages/hf-cang/rucang'], resolve),
    },
    {
      path: '/check',
      name: 'check',
      component: (resolve) => require(['@/components/pages/hf-cang/check'], resolve),
    },
    {
      path: '/cang',
      name: 'cang',
      component: (resolve) => require(['@/components/pages/hf-cang/cang'], resolve),
    },

    {
      path: '/hf-storeproduct',
      name: 'hf-storeproduct',
      component: (resolve) => require(['@/components/pages/hf-store/storeproduct'], resolve),
    },
    {
      path: '/hf-vip',
      name: 'hf-vip',
      component: (resolve) => require(['@/components/pages/hf-vip'], resolve),
    },
    {
      path: '/hf-quan',
      name: 'hf-quan',
      component: (resolve) => require(['@/components/pages/hf-quan'], resolve),
    },
    {
      path: '/hf-store',
      name: 'hfstore',
      component: (resolve) => require(['@/components/pages/hf-store'], resolve),
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: (resolve) => require(['@/components/pages/hf-userCenter/userDetail'], resolve),
    },
    {
      path: '/update',
      name: 'update',
      component: (resolve) => require(['@/components/pages/home/update'], resolve),
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: (resolve) => require(['@/components/pages/hf-orderCenter/orderDetail'], resolve),
    },
    {
      path: '/hf-orderCenter',
      name: 'hf-orderCenter',
      component: (resolve) => require(['@/components/pages/hf-orderCenter'], resolve),
    },
    {
      path: '/hf-userCenter',
      name: 'hf-userCenter',
      component: (resolve) => require(['@/components/pages/hf-userCenter'], resolve),
    },
    {
      path: '/hf-product',
      name: 'hf-product',
      component: (resolve) => require(['@/components/pages/hf-product'], resolve),
    },
    {
      path: '/hf-product/detail',
      name: 'hf-product-detail',
      component: (resolve) => require(['@/components/pages/hf-product/detail'], resolve),
    },
    {
      path: 'hf-eventsManage',
      name: 'hf-eventsManage',
      component: (resolve) => require(['@/components/pages/hf-eventsManage'], resolve),
    },
    {
      path: 'hf-file',
      name: 'hf-file',
      component: (resolve) => require(['@/components/pages/hf-file'], resolve),
    },
    {
      path: '/',
      name: 'header',
      component: (resolve) => require(['@/components/pages/header'], resolve),
    },
    {
      path: 'hf-statistics',
      name: 'hf-statistics',
      component: (resolve) => require(['@/components/pages/hf-statistics'], resolve),
    },
    ],
  },
  {
    path: '*',
    name: '404',
    component: (resolve) => require(['@/components/pages/not-found'], resolve),
  },

  ],
});

// 前置守卫
router.beforeEach((to, from, next) => {
  // // 1. 去的路径是登录的时候  放行
  // if (to.path === '/login') return next()
  // // 2. 不是登录的时候 且 并没有登录  拦截 登录页面
  // if (!store.getUser().token) return next('/login')
  // // 3. 其他情况 放行
  // next()
  if (to.path !== '/loogin' && !store.getUser().token) {
    return next('/loogin');
  }
  next();
});

export default router;
