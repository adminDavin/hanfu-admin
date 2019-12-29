import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/votelogin'
      // path: '/index',
    },
    {
      name: 'votelogin',
      path: '/votelogin',
      component: resolve => require(['@/components/login/Login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      name: 'award',
      path: '/award',
      component: resolve => require(['@/components/award/award.vue'], resolve),
      meta: {
        title: '奖品'
      }
    },
    {
      name: 'activityDetail',
      path: '/activityDetail',
      component: resolve => require(['@/components/active/detail.vue'], resolve),
      meta: {
        title: '策略规则'
      }
    },

    {
        name: 'Rule',
        path: '/Rule',
        component: resolve => require(['@/components/active/strategy.vue'], resolve),
        meta: {
          title: '策略规则'
        }
      },
{
    name: 'strategyRule',
    path: '/strategyRule',
    component: resolve => require(['@/components/strategyRule/index.vue'], resolve),
    meta: {
      title: '策略规则'
    }
  },
    {
      name: 'Strategy',
      path: '/Strategy',
      component: resolve => require(['@/components/activityStrategy/index.vue'], resolve),
      meta: {
        title: '奖品'
      }
    },
    {
      name: 'activeIndex',
      path: '/activeIndex',
      component: resolve => require(['@/components/active/index.vue'], resolve),
      children:[
      {
        path: "pic",
        component: resolve => require(['@/components/active/pictures'], resolve),
      },{
        path: "activityStrategy",
        component: resolve => require(['@/components/active/activityStrategy'], resolve),
      },{
        path: "company",
        component: resolve => require(['@/components/active/company'], resolve),
      },{
        path: "pic",
        component: resolve => require(['@/components/active/pictures.vue'], resolve),
      },{
        path: "user",
        component: resolve => require(['@/components/active/user'], resolve),
      },{
        path: "activityDetail",
        component: resolve => require(['@/components/active/detail.vue'], resolve),
      },
      {
        path: "activityManage",
        component: resolve => require(['@/components/active/activityManage'], resolve)
      }]
    },
    {
      name: 'awardIndex',
      path: '/awardIndex',
      component: resolve => require(['@/components/award/index.vue'], resolve),
      meta: {
        title: '奖品'
      }
    },
    {
      path: '/404',
      component: resolve => require(['../components/common/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/common/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
});

//全局路由守卫
router.beforeEach((to, from, next) => {
  //debugger
  console.log('跳转到:', to.fullPath);
  if (to.path == '/tree') {
    next();
  } else {
    // var token = sessionStorage.getItem('token');
    //如果没登录,都导向登录页
    // console.log('token',token);
    // if (!token) {
    //   if (to.path !== '/login') {
    //     next({ path: '/login' })
    //   }
    //   else {
    //     next();
    //   }
    // }
    // else {
    next();
    // }
  }

})

export default router
