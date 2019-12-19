<template>
  <div>
    <el-table :data="rewardData" style="margin-top: 30px;width: 100%;" height="500px">
      <el-table-column label="序列号" align="center" type="index" width="200"></el-table-column>
      <el-table-column label="微信头像" align="center" width="200" prop="avatar">
        <template  slot-scope="scope">
        <img :src="scope.row.avatar" alt="" style="width: 70px;height: 70px;"/>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center" width="200" prop="wxName"></el-table-column>
      <el-table-column label="部门" align="center" width="200" prop="departmentName"></el-table-column>
      <el-table-column label="真实姓名" align="center" width="200" prop="realName"></el-table-column>
      <el-table-column label="岗位名称" align="center" width="200" prop="jobposition"></el-table-column>

      <el-table-column label="添加时间" align="center" width="200" prop="createtime"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delecteuser(scope.row.userId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/apis/voteApi.js";
export default {
  data() {
    return {
      rewardData: [],
      checkdata: [],
      addcompany: {},
      ruletost: false,
      addcompanyRules: {
        companyName: [
          {
            required: true,
            message: "请填写公司名称",
            trigger: "blur"
          }
        ],
        companyInfo: [
          {
            required: true,
            message: "请填写公司编号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.userlist();
  },
  methods: {
    userlist: function() {
      api.getuser().then(response => {
        console.log("用户列表", response);
        this.rewardData = response.data.data;
        console.log(this.rewardData)
        // for (var i = 0; i < this.rewardData.length; i++) {
        //   if (this.rewardData[i]) {
        //     this.rewardData[i].img = this.rewardData[i].avatar;
        //   } else {
        //   }
        // }
      });
    },
    delecteuser: function(index) {
      api.deleteuser(index).then(response => {
        this.userlist();
      });
    }
  }
};
</script>

<style>
</style>
