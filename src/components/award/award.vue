<template>
  <div>
    <el-form :inline="true" label-width="80px" ref="addForm" style="margin-top:20px ;">
      <el-form-item style="margin-bottom:50px;" label="活动">
        <el-select v-model="value" placeholder="请选择" @change="getactiveId">
          <el-option v-for="(item ,index) in activeData" :key="index" :value="item.activityName">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-bottom:50px;" label="策略规则">
        <el-select v-model="valuerule" placeholder="请选择" @change="getruleId">
          <el-option v-for="(item ,index) in rules" :key="index" :value="item.ruleName">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-bottom:50px;" label="活动实例规则" label-width="100px">
        <el-select v-model="valueShi" placeholder="请选择" @change="getShi">
          <el-option v-for="(item ,index) in Shirules" :key="index" :value="item.ruleName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottom:50px;" label="参与人类型" label-width="100px">
        <el-select v-model="persontype" placeholder="请选择" @change="getperson">
          <el-option v-for="(item ,index) in persondata" :key="index" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item style="margin-bottom:50px;" label="参与人类型" label-width="124px">
        <el-select v-model="persontype" placeholder="请选择" @change="getperson">
          <el-option v-for="(item ,index) in persondata" :key="index" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="person">设置活动参与者</el-button>
      <br>
      <el-form-item style="margin-bottom:50px;" label="安全码" label-width="100px" >
       <el-input  auto-complete="off" type="textarea" resize="none" style="width:550px;"></el-input>
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
        persontype: '',
        persondata: [{
          flag: true,
          value: '参与人'
        }, {
          flag: false,
          value: '投票人'
        }],
        valueShi: '',
        datalist: {

        },
        activityId: '',
        Shirules: [],
        rules: [],
        valuerule: '',
        arrlist: [],
        value: '',
        multipleSelection: [],
        rewardData: [],
        activeData: []
      }
    },

    methods: {
      //统计投票结果
      count:function(){
        api.count().then(response => {
          console.log('统计投票结果', response);

        })
      },
      // 设置活动参与者
      person: function() {
        if (!this.datalist.userIds) {
          this.$message({
            showClose: true,
            message: '请在下方用户列表勾选参与人'
          });
          return
        }
        if (!this.datalist.activityId) {
          this.$message({
            showClose: true,
            message: '请选择活动'
          });
          return
        }
        if (!this.datalist.ruleId ) {
          this.$message({
            showClose: true,
            message: '请选择策略规则'
          });
          return
        }
        if (!this.datalist.ruleInstanceId) {
          this.$message({
            showClose: true,
            message: '请选择活动实体规则'
          });
          return
        }
        if (!this.datalist.flag1) {
          this.$message({
            showClose: true,
            message: '请选择参与人类型'
          });
          return
        }
        console.log(this.datalist)
        api.addpreson(this.datalist).then(response => {
          console.log('设置活动参与者', response);

          // this.rules = response.data.data;
        })
      },

      getperson: function() {
        let obj = {};
        obj = this.persondata.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.value == this.persontype) {
            return item;
          }
        });
        console.log(obj.flag)
        this.datalist.flag = obj.flag;
        this.datalist.flag1 = 1;
      },

      getShi: function() {
        let obj = {};
        obj = this.Shirules.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.ruleName == this.valueShi) {
            return item;
          }
        });
        console.log(obj.id)
        this.datalist.ruleInstanceId = obj.id;
      },
      getactiveId: function() {
        let obj = {};
        obj = this.activeData.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.activityName == this.value) {
            return item;
          }
        });
        console.log(obj.id)
        this.datalist.activityId = obj.id
      },
      getruleId: function() {
        let obj = {};
        obj = this.rules.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.ruleName == this.valuerule) {
            return item;
          }
        });
        console.log(obj.id)
        this.datalist.ruleId = obj.id
      },

      getActiveShi: function() {
        api.getActiveShi(this.ruleData).then(response => {
          console.log('活动实体规则', response);

          this.Shirules = response.data.data;
        })
      },
      getRule: function() {
        api.getStrategyRule(this.ruleData).then(response => {
          console.log('活动策略规则', response);

          this.rules = response.data.data;
        })
      },
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
        let arr = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].id)
        }
        console.log(arr);
        this.datalist.userIds = arr;
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
      this.getRule();
      this.getActiveShi();
    }
  }
</script>

<style>
</style>
