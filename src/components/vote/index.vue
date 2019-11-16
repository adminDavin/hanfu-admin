<template>
<el-container>
    <el-header>Header</el-header>
      <el-main>
        <el-row>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            
            <el-tab-pane
                v-for="(item) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :index="item.name"
              >
                <component :is=item.content></component>
              </el-tab-pane>
          </el-tabs>
        </el-row>

      </el-main>
</el-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'store',
  components: {
  },
  data() {
    return {       
      activeName: 'second',
      editableTabs: [{
          title: '活动管理',
          name: '1',
          content: ''
        }, {
          title: '策略管理',
          name: '2',
          content: ''
        }],
      tabIndex: 2
    }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  computed: mapState({
      siderbar: state => state.menu.menuList,
      onRoutes() {
        console.log(this.$route.path);
        return this.$route.path.replace('/', '');
      }
    }),
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
