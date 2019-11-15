<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">

      <el-form :inline="true" :model="detaildata" class="demo-form-inline" style="margin-left: 50px;margin-top: 40px;" label="活动详情">
        <el-form-item  label="活动名称">
          <el-input v-model="detaildata.activityName"   placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动描述">
          <el-input v-model="detaildata.activityDesc" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动状态">
          <el-input v-model="detaildata.activityStatus" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动类型">
          <el-input v-model="detaildata.activiyType" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="创建时间">
          <el-input v-model="detaildata.createTime" placeholder="审批人"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 30px;margin-top: 30px;font-weight: bold;">规则列表</div>
      <el-table :data="StrategyRule" style="margin-top: 20px;margin-left: 20px;width: 80%;" height="300" title="规则列表">
        <el-table-column prop="ruleName" label="规则名称" fixed width="120" align="center">
        </el-table-column>
        <el-table-column prop="ruleStatus" label="规则状态" width="150" align="center">
        </el-table-column>
        <el-table-column prop="ruleDesc" label="规则描述" width="150" align="center">
        </el-table-column>
        <el-table-column prop="ruleType" label="规则值" width="300" align="center">
        </el-table-column>
        <el-table-column prop="ruelValueType" label="规则值类型" width="300" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import vSidebar from '@/components/common/sidebar.vue';
  import vHead from '@/components/common/header.vue';
  import api from '@/apis/voteApi.js';
  export default {
    name: 'store',
    components: {
      vHead,
      vSidebar
    },
    data() {
      return {
        detaildata: {},
        id: '',
        collapse: false,
        selectedStone: 1,
        StrategyRule:[]
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.getDetail();
      this.getStrategyRule();
    },
    methods: {
      getDetail: function() {
        api.getActivityDetail(this.id).then(response => {
          console.log('活动详情', response);
          this.detaildata = response.data.data;
        })
      },
      //获取策略规则
      getStrategyRule: function() {

        api.getStrategyRule(this.id).then(response => {
          console.log('获取策略规则', response);
          this.StrategyRule = response.data.data;
        })
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
