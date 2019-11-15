<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <el-table :data="StrategyRule" style="margin-top: 20px;margin-left: 20px;width: 80%;" height="300" title="规则列表">
        <el-table-column label="" width="65" fixed  label="单选">
          <template scope="scope">
            <el-radio :label="scope.row.id" v-model="templateRadio"  @change="getTemplateRow(scope.row)"></el-radio>
          </template>
        </el-table-column>
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
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateStrategyRule(scope.row.id)">编辑</el-button>
            <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改活动" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model='editForm' label-width="80px" :rules="bianRules" ref="addForm">
          <el-form-item label="规则值" prop="ruleType" label-width="120px">
            <el-input v-model="editForm.ruleType" auto-complete="off" type="number"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible=false">取消</el-button>
          <el-button type="primary" @click="addjiSubmit">提交</el-button>
        </div>
      </el-dialog>

      <el-form :inline="true" :model='editForm' label-width="80px" :rules="bianRules1" ref="addForm1" style="margin-top: 30px;">
        <el-form-item label="规则名称" prop="ruleType" label-width="120px">
          <el-input v-model="ruleName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-button type="primary" @click="person">批量生成参与码</el-button>
        <el-form-item style="margin-bottom:50px;" label="参与码" label-width="100px" >
         <el-input  auto-complete="off" type="textarea" resize="none" style="width:550px;"></el-input>
        </el-form-item>
      </el-form>

      <el-table :data="rewardData" style="width:80%;margin-top: 30px;" title="用户列表" height="300" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="用户名" fixed width="300" align="center">
        </el-table-column>
        <el-table-column prop="userStatus" label="用户状态" width="300" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="120" align="center">
        </el-table-column>
        <el-table-column prop="birthDay" label="生日" width="300" align="center">
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
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
        ruleName:'',
        activeid:'',
        bianRules1: {
          ruleType: [{
            required: true,
            message: "填写规则值",
            trigger: "blur"
          }]
        },
        datalist:{},
         multipleSelection: [],
        templateRadio:'',
        templateSelection: {},
        bianRules: {
          ruleType: [{
            required: true,
            message: "填写规则值",
            trigger: "blur"
          }]
        },
        editForm: {},
        editFormVisible: false,
        ruleType: '',
        StrategyRule: [],
        collapse: false,
        selectedStone: 1,
        rewardData: []
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.activeid = this.$route.query.active;
      this.datalist.activityId = this.$route.query.active;
      this.getStrategyRule(this.id);
      this.userlist();
    },
    methods: {
      // 设置活动参与者
      person: function() {
        if (!this.datalist.userIds) {
          this.$message({
            showClose: true,
            message: '请在下方用户列表勾选参与人'
          });
          return
        }

        if (!this.datalist.ruleId ) {
          this.$message({
            showClose: true,
            message: '请选择策略规则'
          });
          return
        }


        console.log(this.datalist)
        api.addpreson(this.datalist).then(response => {
          console.log('设置活动参与者', response);

          // this.rules = response.data.data;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        let arr = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].id)
        }
        console.log(arr);
        this.datalist.userIds = arr;
      },
      getTemplateRow(row) { //获取选中数据
        this.templateSelection = row;
        this.ruleName=row.ruleName
        this.datalist.ruleId= this.templateSelection.id;

        console.log(this.templateSelection.ruleName)
      },
      userlist: function() {
        api.getuser().then(response => {
          console.log('用户列表', response);
          this.rewardData = response.data.data;
        })
      },
      // 添加策略
      addjiSubmit: function() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.editForm);

              api.updateStrategyRule(this.editForm).then(response => {
                console.log(response)
                if (response.status === 200) {

                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.editFormVisible = false;
                  this.getStrategyRule(this.id);

                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });

                  this.editFormVisible = false;
                }
              });
            });
          }
        });
      },
      updateStrategyRule: function(id) {
        console.log(id);
        this.editFormVisible = true;
        this.editForm.id = id;
      },
      //获取策略规则
      getStrategyRule: function(id) {
        this.ruletost = true;
        console.log(id);
        api.getStrategyRule(id).then(response => {
          console.log('获取策略规则', response);
          this.StrategyRule = response.data.data;
        })
      },
      selectedStoneHandler(res) {
        this.selectedStone = res;
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
