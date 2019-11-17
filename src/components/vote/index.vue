<template>
<el-container>
  <el-main>
    <el-row>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/vote/activity">活动管理</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/vote/strategy">策略管理</router-link>
        </el-menu-item>
      </el-menu>
      <div>
        <router-view></router-view>
      </div>
    </el-row>
  </el-main>
</el-container>
</template>

<script>
import {
  mapState
} from 'vuex';
export default {
  name: 'store',
  components: {},
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
