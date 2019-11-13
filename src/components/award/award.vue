<template>
  <div>
    <!-- <el-form :inline="true" :model="addWard" label-width="80px" ref="addForm">
      <el-form-item style="margin-bottom:50px;" label="奖品名称">
        <el-input v-model="addWard.awardName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:50px;" label="奖品数量">
        <el-input v-model="addWard.empNum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:50px;">
        <el-button type="success" style="border-radius:3px;" @click="TellMeId" size="mini" round>添加</el-button>
      </el-form-item>
    </el-form> -->
    <el-table :data="rewardData" style="width: 100%;margin-top: 30px;">
      <el-table-column prop="username" label="用户名" fixed  width="300" align="center">
      </el-table-column>
      <el-table-column prop="userStatus" label="用户状态" width="300" align="center">
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="120" align="center">
      </el-table-column>
      <el-table-column prop="birthDay" label="生日" width="300" align="center">
      </el-table-column>
      <el-table-column  label="操作" width="300" align="center">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import api from '@/apis/voteApi.js';
  import Axios from "axios";
  export default {
    data() {
      return {
        rewardData: []
      }
    },

    methods: {
      userlist: function() {
        api.getuser().then(response => {
          console.log('用户列表', response);
          this.rewardData = response.data.data;
        })
      },
      // 添加奖品
      TellMeId() {
        console.log(this.addWard);
        api.addWard(this.addWard).then(resp => {
          console.log('订单详情', resp);
          // this.goodsData = resp.data.data;
        });
      },
      getgetDepartment() {
        // console.log(this.addWard);
        api.getDepartment().then(resp => {
          console.log('订单详情', resp.data.data);

          this.departmentData = resp.data.data;
        });
      }
    },
    mounted() {
      this.userlist()
    }
  }
</script>

<style>
</style>
