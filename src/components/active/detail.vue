<template>
  <div style="padding-bottom:100px;overflow: auto;" >


 <div  style="padding: 20px 20px 0 40px; ">
   <div style="font-size: 18px;background: #00d1cf;color: #fff;padding: 10px;border-radius: 4px;">
     活动详情
   </div>
   <div style="display: flex;">
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
     <el-form v-if="type=='score'" :inline="true" :model="templateData"  ref="addFormRules"  :rules="addFormRules"  class="demo-form-inline"
     style=" border-radius:10px;height: 257px; padding:30px;
     border:1px solid #00D1B2; margin-top: 40px;margin-left: 100px;" label="活动详情">
     <el-form-item label-width="100px"  >
      <div style="font-size: 20px;text-align: center;">评优事迹:</div>
     </el-form-item>
     <br>
       <el-form-item  label="评分项名称" label-width="100px" prop="evaluateType">
         <el-input  v-model="templateData.evaluateType"  placeholder="评分项名称"></el-input>
       </el-form-item>
       <br>
       <el-form-item  label="评分权重" label-width="100px" prop="evaluateWeight">
         <el-input v-model="templateData.evaluateWeight"  placeholder="评分权重" type="number"></el-input>
       </el-form-item>
        <br>
        <el-form-item style="margin-top: 20px;margin-left: 19%;" >
          <template slot-scope="scope" >
              <el-button type="primary"  size="medium" style="width: 200px;" @click="add" >添加</el-button>
           </template>
        </el-form-item>

     </el-form>
      <el-form v-if="type=='score'" :inline="true" :model="templateData1"  ref="addFormRules1"  :rules="addFormRules"  class="demo-form-inline"
      style=" border-radius:10px;height: 257px; padding:30px;
      border:1px solid #00D1B2; margin-top: 40px;margin-left: 100px;" label="活动详情">
        <el-form-item label-width="100px"  >
         <div style="font-size: 20px;text-align: center;">现场汇报:</div>
        </el-form-item>
        <br>
        <el-form-item  label="评分项名称" label-width="100px" prop="evaluateType">
          <el-input  v-model="templateData1.evaluateType"  placeholder="评分项名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item  label="评分权重" label-width="100px" prop="evaluateWeight">
          <el-input v-model="templateData1.evaluateWeight"  placeholder="评分权重" type="number"></el-input>
        </el-form-item>
         <br>
         <el-form-item style="margin-top: 20px;margin-left: 19%;" >
           <template slot-scope="scope" >
               <el-button type="primary"  size="medium" style="width: 200px;" @click="add1" >添加</el-button>
            </template>
         </el-form-item>

      </el-form>
   </div>

<div style="margin-top: 30px;font-weight: bold;font-size: 18px;margin-left: 10px;"  v-if="type=='score'">评分项</div>
      <el-table :data="templatedata" style="margin-top: 20px;width: 80%;margin-left: -22px;" title="评分项列表"  v-if="type=='score'">
        <el-table-column prop="evaluateType" label="评分项名称" width="150" align="center">
        </el-table-column>
        <el-table-column prop="evaluateWeight" label="评分权重" width="150" align="center">
        </el-table-column>
      </el-table>
      <div style="margin-top: 30px;font-weight: bold;font-size: 18px;margin-left: 10px;">规则列表</div>
      <el-table :data="StrategyRule" style="margin-top: 20px;width: 80%;margin-left: -22px;"  title="规则列表">
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
        templateData1:{},
        type:'',
        templateWeight:0,
        templatedata:[],
       addFormRules: {
         evaluateType: [{
           required: true,
           message: "请输入评分项名称",
           trigger: "blur"
         }],
         evaluateWeight: [{
           required: true,
           message: "请输入评分权重",
           trigger: "blur"
         }]


       },
        templateData:{},
        detaildata:{},
        id: '',
        collapse: false,
        selectedStone: 1,
        StrategyRule:[]
      }
    },
    mounted() {
      this.id = this.$route.query.id;
        this.type = this.$route.query.type;
      this.templateData.parentTemplateId = this.$route.query.id;
      this.getDetail();
      this.getStrategyRule();
      this.findUserTemplate();
      this.checkWeight();
    },
    methods: {
      add:function(){
       this.templateData.evaluateType=0;
        var he=Number(this.templateWeight) + Number(this.templateData.evaluateWeight);
        console.log(this.templateData.evaluateWeight,this.templateWeight)
          if(he>1){
            this.$message({
              message: "权重之和不能超过1",

            });
            return;
          }
          this.$refs.addFormRules.validate(valid => {
            if (valid) {
          this.$confirm("确认添加吗？", "提示", {}).then(() => {
          console.log(this.templateData)
          api.EvaluationTemplate(this.templateData).then(response => {
            console.log('评分项', response);
            this.findUserTemplate()
          })

          });
}
          });

        },
        add1:function(){
               this.templateData1.evaluateType=1;
                var he=Number(this.templateWeight) + Number(this.templateData1.evaluateWeight);
                console.log(this.templateData1.evaluateWeight,this.templateWeight)
                  if(he>1){
                    this.$message({
                      message: "权重之和不能超过1",

                    });
                    return;
                  }
                  this.$refs.addFormRules1.validate(valid => {
                    if (valid) {
                  this.$confirm("确认添加吗？", "提示", {}).then(() => {
                  console.log(this.templateData1)
                  api.EvaluationTemplate(this.templateData1).then(response => {
                    console.log('评分项', response);
                    this.findUserTemplate()
                  })

                  });
        }
                  });

                },
  checkWeight:function(){
    api.checkTemplateWeight(this.id).then(response => {
      console.log('查找权重', response);
      this.templateWeight= response.data.data;
    })
  },
       findUserTemplate: function() {
          api.findUserTemplate(this.id).then(response => {
            console.log('查找模板', response);
            this.templatedata = response.data.data;
          })
        },
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
