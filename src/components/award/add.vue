<template>
  <div>
    <el-form :inline="true" :model="addWard" label-width="80px" ref="addForm">
      <el-form-item style="margin-bottom:50px;" label="奖品名称">
        <el-input v-model="addWard.awardName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:50px;" label="奖品数量">
        <el-input v-model="addWard.empNum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:50px;">
        <el-button type="success" style="border-radius:3px;" @click="TellMeId" size="mini" round>添加</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  import api from '@/apis/voteApi.js';
  import Axios from "axios";
  export default {
    data() {
      return {
        addWard: {

        }
      }
    },
    methods: {
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

          this.departmentData= resp.data.data;
        });
      }
    },
    mounted() {
      // this.getgetDepartment();
    }
  }
</script>

<style>
</style>
