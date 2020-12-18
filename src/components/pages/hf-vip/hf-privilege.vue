<template>
  <div style>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>权限管理>查看</span>
  </div>
     <div style="overflow:hidden;margin-bottom:30px;float:right;">
      <el-button class="unification" type="primary" @click="desdrawer=true">添加特权</el-button>
    </div>
    <el-table :data="miaodata" stripe style>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="privilegeName" align="center" label="特权名称"></el-table-column>
      <el-table-column prop="fileId" align="center" label="图片id"></el-table-column>
      <!-- <el-table-column prop="levelDescribe" align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.prerogativeState==-1">不生效</span>
          <span v-if="scope.row.prerogativeState==1">生效</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editlevel(scope.row)">修改</el-button>
          <el-button type="text" @click="deletevip(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>


    <el-dialog width="40%" title="添加特权" :visible.sync="desdrawer" center>
      <el-form
        :model="ruleForm3"
        status-icon
        :rules="rules3"
        ref="ruleForm3"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="特权名称" prop="privilegeName ">
          <el-input style="width:300px;" v-model="ruleForm3.privilegeName " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-upload
            action
            list-type="picture-card"
            ref="upload"
            multiple
            :auto-upload="false"
            :limit="2"
            :file-list="fileList"
            :on-change="imgUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="desdrawer = false">取 消</el-button>
        <el-button type="primary" @click="submitForm3('ruleForm3')">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog width="40%" title="修改特权" :visible.sync="leveledit" center>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="特权名称" prop="privilegeName ">
          <el-input style="width:300px;" v-model="ruleForm.privilegeName " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-upload
            action
            list-type="picture-card"
            ref="upload"
            multiple
            :auto-upload="false"
            :limit="2"
            :file-list="fileList2"
            :on-change="imgUpload2"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leveledit = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import vip from '@/service/vip.js';
import store from '@/store';
import serviceGoods from '@/service/goods.js';

export default {
  data() {
    return {
      fileList: [], // 图片
      fileList2: [], // 图片
      desdrawer: false,
      leveledit: false,
      miaodata: [],
      ruleForm3: {
        privilegeName: '',
        fileId: '',
        bossId: '',
      },
      ruleForm: {
        privilegeName: '',
        fileId: '',
        privilegeId: '',
      },
      rules3: {
        privilegeName: [
          {
            required: true,
            message: '请输入特权名称',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          vip.updateVipPrivilege(this.ruleForm, (res) => {
            console.log(res);
            // eslint-disable-next-line no-magic-numbers
            if (res.data.status === 200) {
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.leveledit = false;
              this.checkLevel();
            } else {
              this.$message({
                message: '修改失败',
                type: 'error',
              });
            }
          });
        }
      });
    },
    editlevel: function(row) {
      console.log(row);
      this.leveledit = true;
      this.ruleForm.fileId = row.fileId;
      this.ruleForm.privilegeName = row.privilegeName;
      this.ruleForm.privilegeId = row.id;
      this.fileList2 = [];
      serviceGoods.getFileFileId(row.fileId, (res) => {
        this.fileList2.push({ url: res.config.url });
      });
    },
    imgUpload(file) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.picUrl = URL.createObjectURL(file.raw);
        this.uploadFile(file);
      } else {
        this.$message.error('请选择图片文件');
      }
    },
    uploadFile(file) {
      let fd = new FormData();
      fd.append('file', file.raw);
      // fd.append('id', this.imageId);
      axios
        .post('/api/api/product/goods/fileUpLoad', fd)
        .then((res) => {
          // this.acquire();
          console.log('图片', res.data.data);
          this.ruleForm3.fileId = res.data.data;
        });
    },
    imgUpload2(file) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.picUrl = URL.createObjectURL(file.raw);
        this.uploadFile2(file);
      } else {
        this.$message.error('请选择图片文件');
      }
    },
    uploadFile2(file) {
      let fd = new FormData();
      fd.append('file', file.raw);
      // fd.append('id', this.imageId);
      axios
        .post('/api/api/product/goods/fileUpLoad', fd)
        .then((res) => {
          // this.acquire();
          console.log('图片', res.data.data);
          this.ruleForm.fileId = res.data.data;
        });
    },
    deletevip (row) {
      console.log(row);
      vip.deleteVipPrivilege({privilegeId: row.id}, (res) => {
        console.log(res);
        this.checkLevel();
      });
    },
    formatTen: function(num) {
      // eslint-disable-next-line no-magic-numbers
      return num > 9 ? num + '' : '0' + num;
    },
    formatDate: function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      // eslint-disable-next-line no-unused-vars
      var hour = date.getHours();
      // eslint-disable-next-line no-unused-vars
      var minute = date.getMinutes();
      // eslint-disable-next-line no-unused-vars
      var second = date.getSeconds();
      // eslint-disable-next-line no-undef
      return (
        year +
        '-' +
        this.formatTen(month) +
        '-' +
        this.formatTen(day) +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      );
    },
    uptime1: function(val) {
      console.log(val);
      this.ruleForm3.startTime = this.formatDate(val);
    },
    uptime2: function(val) {
      console.log(val);
      this.ruleForm3.expireTime = this.formatDate(val);
    },
    submitForm3(ruleForm3) {
      this.$refs[ruleForm3].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm3);
          this.ruleForm3.bossId = store.getUser().BSid;
          vip.addVipPrivilege(this.ruleForm3, (res) => {
            console.log(res);
            // eslint-disable-next-line no-magic-numbers
            if (res.data.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.desdrawer = false;
              this.checkLevel();
            } else {
              this.$message({
                message: '添加失败',
                type: 'error',
              });
            }
          });
        }
      });
    },
    checkLevel: function() {
      let bossId = store.getUser().BSid;
      vip.selectVipPrivilege({bossId: bossId}, (res) => {
        console.log(res);
        this.miaodata = res.data.data;
      });
    },
  },
  mounted() {
    this.checkLevel();
  },
};
</script>

<style lang="less" scoped>
.element.style {
  width: 0;
}
</style>
