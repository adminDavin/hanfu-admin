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
   name: 'department',
   path: '/department',
   component: resolve => require(['@/components/active/department.vue'], resolve),
   meta: {
     title: '部门'
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
      name: 'usercenter',
      path: '/usercenter',
      component: resolve => require(['@/components/usercenter/index.vue'], resolve),
      meta: {
        title: '用户中心'
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
      meta: {
        title: '奖品'
      }
    },

    {
      name: 'awardIndex',
      path: '/awardIndex',
      component: resolve => require(['@/components/award/index.vue'], resolve),
      meta: {
        title: '奖品'
      }
    },
    // {
    //   name: 'addActive',
    //   path: '/addActive',
    //   component: resolve => require(['@/components/award/award.vue'], resolve),
    //   meta: {
    //     title: '添加活动'
    //   }
    // },
    {
      name: 'detail',
      path: '/detail',
      component: resolve => require(['@/components/product/detail.vue'], resolve),
      meta: {
        title: '系统首页'
      }
    },
    {
      name: 'hf-store',
      path: '/hf-store',
      component: resolve => require(['@/components/hf-store/hf-store.vue'], resolve),
      meta: {
        title: '系统首页'
      }
    },
    {
      path: '/store',
      component: resolve => require(['@/components/hf-store/index.vue'], resolve),
      meta: {
        title: '店铺'
      }
    },
    {
      path: '/goods',
      component: resolve => require(['@/components/goods'], resolve),
      meta: {
        title: '物品管理'
      }
    },
    {
      path: '/product',
      component: resolve => require(['@/components/product'], resolve),
      meta: {
        title: '商品中心'
      }
    },
    {
      path: '/hf-user',
      component: resolve => require(['@/components/hf-user'], resolve),
      meta: {
        title: '用户管理'
      }
    },

    {
      path: '/hf-user/register',
      component: resolve => require(['@/components/hf-user/register'], resolve),
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/hf-user/login',
      component: resolve => require(['@/components/hf-user/login'], resolve),
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/hf-order',
      component: resolve => require(['@/components/hf-order'], resolve),
      meta: {
        title: '订单中心'
      }
    },
    {
      path: '/warehouse',
      component: resolve => require(['@/components/warehouse'], resolve),
      meta: {
        title: '仓库中心'
      }
    },
    {
      path: '/test',
      component: resolve => require(['../components/test/index.vue'], resolve),
      meta: {
        title: '蚂蚁种树'
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
