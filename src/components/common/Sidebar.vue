<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>

      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>商品中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="product">商品管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <!-- <el-menu-item index="store">
        <i class="el-icon-menu"></i>
        <span slot="title">商铺管理</span>
      </el-menu-item>
      <el-menu-item index="warehouse">
        <i class="el-icon-menu"></i>
        <span slot="title">仓库管理</span>
      </el-menu-item> -->

      <el-menu-item index="activeIndex">
        <i class="el-icon-menu"></i>
        <span slot="title">活动</span>
      </el-menu-item>

      <!-- <el-menu-item index="hf-order">
        <i class="el-icon-tickets"></i>
        <span slot="title">订单中心</span>
      </el-menu-item>
      <el-menu-item index="hf-user">
        <i class="el-icon-menu"></i>
        <span slot="title">用户中心</span>
      </el-menu-item>-->
      <el-menu-item index="awardIndex">
        <i class="el-icon-menu"></i>
        <span slot="title">用户中心</span>
      </el-menu-item>
      <!--   <el-menu-item index="hf-boss">
        <i class="el-icon-tickets"></i>
        <span slot="title">商家管理</span>
      </el-menu-item> -->
      <el-menu-item index="Strategy">
        <i class="el-icon-tickets"></i>
        <span slot="title">活动策略</span>
      </el-menu-item>
      <!-- <el-menu-item index="usercenter">
        <i class="el-icon-menu"></i>
        <span slot="title">用户中心1</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
  import hanfuBus from '@/components/common/hanfu-bus';
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        collapse: false,
        menuList: [{
            icon: 'el-icon-setting',
            index: 'index',
            title: '系统首页',
          },

          {
            icon: 'el-icon-setting',
            index: 'test',
            title: '商品管理',
            subs: [
              // {
              //     index: 'goods',
              //     title: '物品管理'
              // },
              {
                index: 'store',
                title: '店铺管理1'
              },
              {
                index: 'product',
                title: '商品管理11111111'
              },
              {
                index: 'warehouse',
                title: '仓库管理1'
              },
              {
                index: 'hf-user',
                title: '用户中心'
              },
              {
                index: 'hf-order',
                title: '订单中心'
              },
            ]
          },
          {
            icon: 'el-icon-setting',
            index: 'productddd',
            title: '商品中心',
            subs: [


            ]
          },
          {
            icon: 'el-icon-tickets',
            index: 'table',
            title: '用户中心',
            subs: [
              {
                index: 'user',
                title: '订单管理'
              }
            ]
          },

          {
            icon: 'el-icon-error',
            index: '404',
            title: '404页面'
          }
        ]
      }
    },
    computed: mapState({
      siderbar: state => state.menu.menuList,
      onRoutes() {
        console.log(this.$route.path);
        return this.$route.path.replace('/', '');
      }
    }),
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      hanfuBus.$on('collapse', msg => {
        this.collapse = msg;
      })
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar>ul {
    height: 100%;
  }
</style>
