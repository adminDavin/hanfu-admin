/**
 *
 * 懒加载动态路由
 */
function lazy(code) {

  //return  resolve => require(["@/components/" + name + ".vue"], resolve)
  return getComponetByPath('/' + code);


}

function getComponetByPath(path) {
  for (var i = 0; i < dynamicRouter.length; i++) {
    var route = dynamicRouter[i];
    if (route.path == path) {
      return route.component;
    }
  }
}
/**
 * 路由定义
 * path跟配置里的资源标示对应,同时跟url地址对应
 */

const dynamicRouter = [
  {
    name: 'votelogin',
    path: '/votelogin',
    component: resolve => require(['@/components/login/Login.vue'], resolve),
    meta: {
      title: '登录'
    }
  },
  // {
   
  //   path: '/department',
  //   component: resolve => require(['@/components/active/department.vue'], resolve),
  //   meta: {
  //     title: '部门'
  //   }
  // },

  {

    path: '/activeIndex',
    component: resolve => require(['@/components/active/index.vue'], resolve),
    meta: {
      title: '奖品'
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
    name: 'index',
    path: '/index',
    component: resolve => require(['@/components/index.vue'], resolve),
    meta: {
      title: '系统首页'
    }
  },
  {
    name: 'activityManage',
    path: '/activeIndex/activityManage',
    component: resolve => require(['@/components/active/activityManage'], resolve),
  },
  {
    name: 'activityStrategy',
    path: '/activeIndex/activityStrategy',
    component: resolve => require(['@/components/active/activityStrategy'], resolve),
  },
  {
    name: 'company',
    path: '/activeIndex/company',
    component: resolve => require(['@/components/active/company.vue'], resolve),
  },
  {
    name: 'user',
    path: '/activeIndex/user',
    component: resolve => require(['@/components/active/user.vue'], resolve),
  },
  {
    name: 'pic',
    path: '/activeIndex/pic',
    component: resolve => require(['@/components/active/pictures.vue'], resolve),
  },
  {

    path: '/activityDetail',
    component: resolve => require(['@/components/active/activityManage/detail.vue'], resolve),
    meta: {
      title: '奖品'
    }
  },
  {

    path: '/award',
    component: resolve => require(['@/components/award/award.vue'], resolve),
    meta: {
      title: '奖品'
    }
  }
]
export {
  lazy
}
