<template>
<el-container>
  <el-header>投票系统</el-header>
  <el-main>
    <div v-if="isLogin == false">
      <Login></Login>
    </div>
    <div v-else>
      <Vote></Vote>    
    </div>
  </el-main>
</el-container>
</template>


<script>
import Login from './login';
import Vote from './vote';
export default {
  name: 'strategy-info',
  components: [Login, Vote],
  data() {
    return {
      isLogin: false, 
    }
  },
  methods: {
    
  }
}
</script>
