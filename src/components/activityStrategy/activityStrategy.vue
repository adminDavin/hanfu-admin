<template>
  <div>
     <el-button type="success" @click="addStrategy">添加策略</el-button>


     <el-dialog title="添加策略" :visible.sync="addeditFormVisible" :close-on-click-modal="false">
       <el-form :inline="true"  :model='addForm' label-width="80px" :rules="bianRules" ref="addForm">
          <el-form-item label="活动策略描述" prop="strategyDesc" label-width="120px">
            <el-input v-model="addForm.strategyDesc" auto-complete="off"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="活动策略名称" prop="strategyName" label-width="120px">
            <el-input v-model="addForm.strategyName" auto-complete="off"></el-input>
          </el-form-item>
          <br>
         <el-form-item label="活动策略状态" prop="strategyStatus" label-width="120px">
           <el-input v-model="addForm.strategyStatus" auto-complete="off"></el-input>
         </el-form-item>
         <br>
          <el-form-item label="活动策略类型" prop="strategyType" label-width="120px">
            <el-input v-model="addForm.strategyType" auto-complete="off"></el-input>
          </el-form-item>



       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="addeditFormVisible=false">取消</el-button>
         <el-button type="primary" @click="addjiSubmit" >提交</el-button>
       </div>
     </el-dialog>
    <el-table :data="strategyData" style="width: 100%;margin-top: 30px;" >
      <el-table-column prop="strategyName" label="活动名称" fixed width="120" align="center">
      </el-table-column>
      <el-table-column  prop="strategyStatus" label="策略状态" width="150" align="center">
      </el-table-column>

      <el-table-column prop="strategyType" label="策略类型" width="120" align="center">
      </el-table-column>
      <el-table-column prop="strategyDesc" label="策略描述" width="300" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="300" align="center">
      </el-table-column>
      <el-table-column  label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleRole(scope.row.id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-button type="success" @click="addcerule">增加策略规则</el-button>
     <el-dialog title="增加策略规则" :visible.sync="addeditFormVisiblerule" :close-on-click-modal="false">
       <el-form :inline="true"  :model='addrule' label-width="80px" :rules="Rules" ref="addrules">
          <el-form-item label="规则描述" prop="ruleDesc" label-width="120px">
            <el-input v-model="addrule.ruleDesc" auto-complete="off"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="规则名字" prop="ruleName" label-width="120px">
            <el-input v-model="addrule.ruleName" auto-complete="off"></el-input>
          </el-form-item>
          <br>
        <!-- <el-form-item label="规则状态" prop="ruleStatus" label-width="120px">
           <el-input v-model="addrule.ruleStatus" auto-complete="off"></el-input>
         </el-form-item>
         <br> -->
          <el-form-item label="规则类型" prop="ruleType" label-width="120px">
            <el-input v-model="addrule.ruleType" auto-complete="off"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="规则值类型" prop="ruleValueType" label-width="120px">
            <el-input v-model="addrule.ruleValueType" auto-complete="off"></el-input>
          </el-form-item>

       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="addeditFormVisiblerule=false">取消</el-button>
         <el-button type="primary" @click="addRule" >提交</el-button>
       </div>
     </el-dialog>


  </div>
</template>

<script>
  import api from '@/apis/voteApi.js';
  export default {

    data() {
      return {
        strategyData:[],
        Rules:{
          ruleDesc: [{
            required: true,
            message: "规则描述",
            trigger: "blur"
          }],
          ruleName: [{
            required: true,
            message: "规则名字",
            trigger: "blur"
          }],
          ruleStatus: [{
            required: true,
            message: "规则状态",
            trigger: "blur"
          }],
          ruleType: [{
            required: true,
            message: "规则类型",
            trigger: "blur"
          }],
          ruleValueType: [{
            required: true,
            message: "规则值类型",
            trigger: "blur"
          }]

        },
        addeditFormVisiblerule:false,
        addForm:{},
        addrule:{},
        bianRules:{
          strategyDesc: [{
            required: true,
            message: "活动策略描述",
            trigger: "blur"
          }],
          strategyName: [{
            required: true,
            message: "活动策略名称",
            trigger: "blur"
          }],
          strategyStatus: [{
            required: true,
            message: "活动策略状态",
            trigger: "blur"
          }],
          strategyType: [{
            required: true,
            message: "活动策略类型",
            trigger: "blur"
          }]

        },

        addWu:{},
        addeditFormVisible:false,
        tableData: []
      }
    },
    mounted(){
      this.getStrategy();
    },
    methods: {
     // 获取策略
     getStrategy: function() {
       api.getStrategy().then(response => {
         console.log('获取策略',response);
         this.strategyData = response.data.data;
       })
     },
      // 添加策略规则
      addRule:function(){
        this.$refs.addrules.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.Rules);

              api.addStrategyRule(this.Rules).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });

                  this.addeditFormVisiblerule = false;
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });
                }

              });
            });
          }
        });
      },
      addcerule: function(){
        this.addeditFormVisiblerule=true;
      },
      addStrategy: function(){
        this.addeditFormVisible=true;
      },
      // 添加策略
      addjiSubmit: function(){
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.addForm);

              api.addStrategy(this.addForm).then(response => {
                console.log(response)
                if (response.status === 200) {

                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });

                  this.addeditFormVisible = false;
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });

                  this.addFormVisible = false;
                }
              });
            });
          }
        });


      }
    }
   }


</script>

<style>

</style>
