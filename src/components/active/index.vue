<template>
<div>
  <!-- <v-head></v-head> -->
  <!-- <v-sidebar></v-sidebar> -->
  <!-- <div class="content-box" :class="{'content-collapse':collapse}">

  </div> -->
  <div style="padding: 20px 20px 0 40px; ">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.path" :key="item.index"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动管理" name="first" style="color:orange;">
        <activityManage></activityManage>
      </el-tab-pane>
      <el-tab-pane label="策略管理" name="second">
        <activityStrategy></activityStrategy>
      </el-tab-pane>
      <el-tab-pane label="公司管理" name="third">
        <company></company>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="five">
        <user></user>
      </el-tab-pane>
      <el-tab-pane label="轮播图管理" name="fourth">
        <pic></pic>
      </el-tab-pane>
    </el-tabs> -->
    <!-- <activeTable></activeTable> -->
  </div>

</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
import activeTable from './activeTable';
import activityManage from './activityManage';
import activityStrategy from './activityStrategy';
import company from "./company";
import pic from "./pictures";
import user from "./user";
export default {
  name: 'store',
  components: {
    vHead,
    vSidebar,
    activeTable,
    activityManage,
    activityStrategy,
    company,
    pic,
    user
  },
  data() {
    return {
      collapse: false,
      selectedStone: 1,
      activeName: '/activeIndex/activityManage',
      tabList: [{
        name: '活动管理',
        path: '/activeIndex/activityManage'
      }, {
        name: '策略管理',
        path: '/activeIndex/activityStrategy'
      }, {
        name: '公司管理',
        path: '/activeIndex/company'

      }, {
        name: '用户管理',
        path: '/activeIndex/user'

      }, {
        name: '轮播图管理',
        path: '/activeIndex/pic'

      }]
    }
  },
  methods: {
    selectedStoneHandler(res) {
      this.selectedStone = res;
    },
    handleClick: function (event) {
      console.log(event.name);
      this.$router.push(event.name);
    },
  },
  mounted() {
    console.log("ddddddddddddddddddddd");
    console.log(this.$route.path);
    if (this.$route.path == "/activeIndex") {
      this.activeName = '/activeIndex/activityManage';
    } else {
      this.activeName = this.$route.path;
    }
    this.$router.push(this.activeName);

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
