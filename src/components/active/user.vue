<template>
  <div>


    <el-table :data="rewardData" style="margin-top: 30px;width: 100%;" height="500px" >

              <el-table-column label="序列号" align="center" type="index"  width="200">
              </el-table-column>
              <el-table-column label="头像" align="center"   width="200">
                <template  slot-scope="scope">
                  <img :src="scope.row.img" alt="" style="width: 70px;height: 70px;"></image>

                </template>
              </el-table-column>
              <el-table-column label="用户名" align="center" width="200" prop="nickName">
              </el-table-column>
              <el-table-column label="手机号" align="center"width="200" prop="phone">
          </el-table-column>
          <el-table-column label="地址" align="center"width="200" prop="address">
          </el-table-column>
          <el-table-column label="邮箱" align="center"width="200" prop="email">
          </el-table-column>

          <el-table-column label="添加时间" align="center"  width="200" prop="createDate">
          </el-table-column>
          <el-table-column label="操作" align="center"  width="200" >
              <template slot-scope="scope">
                   <el-button type="danger" icon="el-icon-delete"  size="mini">删除</el-button>
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
       rewardData:[],
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
    this.userlist()
   },
     methods:{
       userlist: function() {
         api.getuser().then(response => {
           console.log('用户列表', response);
           this.rewardData = response.data.data;
           for(var i=0;i<this.rewardData.length;i++){
             if(this.rewardData[i].fileId){
               this.rewardData[i].img='/api/wareHouse/getFile?fileId='+this.rewardData[i].fileId
             }else{

             }
           }
         })
       }



     }
}
</script>

<style>
</style>
