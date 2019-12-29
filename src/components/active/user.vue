<template>
  <div class="realava">
    <el-table :data="rewardData" style="margin-top: 30px;width: 100%;">
      <el-table-column label="序列号" align="center" type="index" width="200"></el-table-column>
      <el-table-column label="微信头像" align="center" width="200" prop="avatar">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="width: 70px;height: 70px;" />
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center" width="200" prop="wxName"></el-table-column>
      <el-table-column label="部门" align="center" width="200" prop="departmentName"></el-table-column>
      <el-table-column label="真实头像" align="center" prop="userId" width="200">
        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="http://39.100.86.77:9200/wareHouse/updateUserAvatar"
            name="fileInfo"
            file="file"
            list-type="picture-card"
            :on-success="onsuccess"
            :data="{userId:scope.row.userId}"
            :on-remove="onRemove"
          >
            <img
              v-if="scope.row.img"
              :src="scope.row.img"
              class="avatar"
              style="width:100%;height:100%"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
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
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/apis/voteApi.js";
export default {
  data() {
    return {
      // 分页
      fenye: {
        pageSize: 10,
        pageNum: 1
      },
      total: 1000,

      pic: [],
      imageUrl: "",
      dialogVisible: false,
      picUrl: "",
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.fenye.pageNum = val;
      this.userlist();
    },
    onsuccess(res, file) {
      // this.getUserlist(id);
      this.userlist();
    },

    onRemove(file) {
      console.log("remove:", file);
    },

    // getUserlist: function() {
    //   api.getuser().then(response => {
    //     let _this=this;
    //     console.log("用户列表", response);
    //     _this.rewardData = response.data.data;
    //     for (var i = 0; i < _this.rewardData.length; i++) {
    //       if (_this.rewardData[i].fileId) {
    //         _this.rewardData[i].img= URL.createObjectURL(file.raw);
    //       }
    //     }
    //     console.log(_this.rewardData);
    //   });
    // },

    userlist: function() {
      var param = this.fenye;
      api.getuser(param).then(response => {
        console.log("用户列表", response);
        this.rewardData = response.data.data.list;
        this.total = parseInt(response.data.data.total);
        for (var i = 0; i < this.rewardData.length; i++) {
          if (this.rewardData[i].fileId) {
            this.rewardData[i].img =
              "/api/wareHouse/getFile?fileId=" + this.rewardData[i].fileId;
          } else {
          }
        }
        console.log(this.rewardData);
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
/* .realava .el-upload--picture-card {
  width:80px;
  height:80px;
} */
.el-pagination {
  float: right;
}
</style>
