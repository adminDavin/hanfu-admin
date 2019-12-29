<template>
<div>
  <!-- <v-head></v-head> -->
  <!-- <v-sidebar></v-sidebar> -->
  <!-- <div class="content-box" :class="{'content-collapse':collapse}">

  </div> -->
  <div style="padding: 20px 20px 0 40px; ">
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
    </el-tabs>
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
      activeName: "first",
    }
  },
  methods: {
    selectedStoneHandler(res) {
      this.selectedStone = res;
    },
    handleClick: function (tab, event) {
      console.log(tab, event);
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
