<template>
  <div>
    <el-form :inline="true" :model="addWard" label-width="80px" ref="addForm">
      <el-form-item style="margin-bottom:50px;" label="奖品名称">
        <el-select v-model="value" placeholder="请选择" prop="选择活动">
          <el-option v-for="(item ,index) in activeData" :key="index" :value="item.activityName">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>



    <el-table :data="rewardData" style="width: 100%;margin-top: 30px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="username" label="用户名" fixed width="300" align="center">
      </el-table-column>
      <el-table-column prop="userStatus" label="用户状态" width="300" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="120" align="center">
      </el-table-column>
      <el-table-column prop="birthDay" label="生日" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
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
        multipleSelection: [],
        rewardData: [],
        activeData: []
      }
    },

    methods: {
      getActive: function() {
        api.getActivity().then(response => {
          console.log('活动列表', response);
          this.activeData = response.data.data;
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      userlist: function() {
        api.getuser().then(response => {
          console.log('用户列表', response);
          this.rewardData = response.data.data;
        })
      },
      // 添加奖品
      // TellMeId() {
      //   console.log(this.addWard);
      //   api.addWard(this.addWard).then(resp => {
      //     console.log('订单详情', resp);
      //     // this.goodsData = resp.data.data;
      //   });
      // },
      // getgetDepartment() {
      //   // console.log(this.addWard);
      //   api.getDepartment().then(resp => {
      //     console.log('订单详情', resp.data.data);

      //     this.departmentData = resp.data.data;
      //   });
      // }
    },
    mounted() {
      this.userlist();
      this.getActive();
    }
  }
</script>

<style>
</style>
