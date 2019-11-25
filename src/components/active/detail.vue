<template>
  <div class="wrapper">

    <!-- <div class="content-box" :class="{'content-collapse':collapse}"> -->
 <div  style="padding: 20px 20px 0 40px; ">
   <div style="font-size: 18px;background: #00d1cf;color: #fff;padding: 10px;border-radius: 4px;">
     活动详情
   </div>
      <el-form :inline="true" :data="detaildata" class="demo-form-inline" style="margin-top: 40px;margin-left: 9px;" label="活动详情">
        <el-form-item  label="活动名称">
          <el-input  :value="detaildata.activityName" :disabled="true"  placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动描述">
          <el-input :value="detaildata.activityDesc" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动状态">
          <el-input :value="detaildata.activityStatus" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="活动类型">
          <el-input :value="detaildata.activiyType" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="创建时间">
          <el-input :value="detaildata.createTime" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 30px;font-weight: bold;font-size: 18px;margin-left: 10px;">规则列表</div>
      <el-table :data="StrategyRule" style="margin-top: 20px;width: 80%;margin-left: -22px;" height="300" title="规则列表">
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
        detaildata:[],
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
  .el-table__header-wrapper{
    font-size: 16px;
  }
</style>
