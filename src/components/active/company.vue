<template>
  <div>
    <div style="background:rgb(51, 218, 193) ;color: #fff;  width: 100px;padding: 10px 20px;text-align: center;float: right;
    margin-right: 100px;
    font-size: 14px;
    border-radius: 4px;" @click="company">
      添加公司
    </div>
    <el-dialog title="添加公司" :visible.sync="ruletost" :close-on-click-modal="false"  class="demo-form-inline">
      <el-form :inline="true" :model='addcompany' label-width="80px" :rules="addcompanyRules" ref="addrules">
        <el-form-item label="公司名称" prop="companyName" label-width="120px">
          <el-input v-model="addcompany.companyName" auto-complete="off"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="公司编号" prop="companyInfo" label-width="120px">
          <el-input v-model="addcompany.companyInfo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template>
            <el-button @click="ruletost=false">取消</el-button>
            <el-button type="primary" @click="submintCompany">提交</el-button>
        </template>
      </div>
    </el-dialog>
    <el-table :data="checkdata" style="margin-top: 30px;width: 100%;" height="500px" >

              <el-table-column label="序列号" align="center" type="index"  width="200">
              </el-table-column>
              <el-table-column label="公司名" align="center" width="200" prop="companyName">
              </el-table-column>
              <el-table-column label="公司编号" align="center"width="200" prop="companyInfo">
              </el-table-column>
              <el-table-column label="添加时间" align="center"  width="200" prop="createTime">
              </el-table-column>
              <el-table-column  align="center"  width="200" prop="createTime">
                  <template slot-scope="scope">
                      <el-button type="success" @click="department(scope.row.id)">部门</el-button>

                  </template>
              </el-table-column>

   </el-table>
  </div>
</template>

<script>
import api from '@/apis/voteApi.js';
export default{
   data() {
     return{
       checkdata:[],
        addcompany:{},
        ruletost:false,
        addcompanyRules:{
         companyName: [{
           required: true,
           message: "请填写公司名称",
           trigger: "blur"
         }],
         companyInfo: [{
           required: true,
           message: "请填写公司编号",
           trigger: "blur"
         }],
       },
     }
   },
   mounted() {
     this.check();
   },
     methods:{
       department:function(id){
         this.$router.push({'name':'department',query:{'id':id}})
       },
       submintCompany:function(){
         this.$refs.addrules.validate(valid => {
           if (valid) {
        api.addCompany(this.addcompany).then(response => {
          console.log('添加公司',response);
          if (response.status === 200) {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.ruletost=false;
              this.check()
          } else {
            this.$message({
              message: "提交失败",

            });
          }
        });
        }})
       },
       check:function(){
         api.checkcompany().then(response => {
           console.log('查询公司',response);
            this.checkdata=response.data.data;
            console.log(this.checkdata);
         });
       },
        company:function(){
          this.ruletost=true;
        }
     }
}
</script>

<style>
</style>
