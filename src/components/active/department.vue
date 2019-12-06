<template>
  <div style="padding: 20px 20px 0px 40px;">
    <div style="font-size: 18px;
    background: rgb(0, 209, 207);
    color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 4px;">
      部门
    </div>

    <div>
      <el-button type="primary"  style="margin-right: 60px; margin-bottom: 20px; overflow: hidden;
       margin-top: 20px;margin-left: 20px;float:right;" @click="adddepartdent">添加部门</el-button>
    </div>
    <el-dialog title="添加部门" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model='addForm' label-width="80px" :rules="bianRules" ref="addForm">
       <el-form-item label="部门名称" prop="departmentName" label-width="120px">
          <el-input v-model="addForm.departmentName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="addFormVisible=false">取消</el-button>
        <el-button type="primary" @click="addjiactive">提交</el-button>

      </div>
    </el-dialog>
    <el-table :data="list" style="margin-top: 20px;" >
      <el-table-column prop="departmentName" label="序号"  type="index"  width="120" align="center" >
      </el-table-column>
      <el-table-column prop="departmentName" label="部门名称"  width="120" align="center" >
      </el-table-column>
     <!-- <el-table-column prop="strategyStatus" label="策略状态" width="150" align="center">
      </el-table-column> -->

      <!-- <el-table-column prop="strategyDesc" label="策略描述" width="300" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" width="320" align="center" fixed="right">
        <template slot-scope="scope">


          <el-button type="success" @click="addcerule(scope.row.id)" size="small" style="margin-right: 2px;">添加规则</el-button>
          <el-button type="success" @click="getStrategyRule(scope.row.id)" size="small">查询规则</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delectestrategy(scope.row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

  </div>
</template>

<script>
   import api from '@/apis/voteApi.js';
 export default{
    data(){
      return {
        list:[],
        id:'',
       bianRules:{
         departmentName: [{
           required: true,
           message: "请填写部门名称",
           trigger: "blur"
         }]

       },
        addForm:{},
        addFormVisible:false
      }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.addForm.companyId=this.$route.query.id;
        this.findDepartment();
    },
    methods:{
      findDepartment:function(){
        api.findDepartment(this.id).then(response => {
          console.log(response)
          this.list=response.data.data;
        });
      },
      adddepartdent:function(){
        this.addFormVisible=true;
      },
      addjiactive:function(){
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.addForm);

              api.updateDepartment(this.addForm).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.findDepartment();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.addFormVisible=false;
                } else {
                  this.$message({
                    message: "提交失败",

                  });

                 this.addFormVisible=false;
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
