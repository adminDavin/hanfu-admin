<template>
  <div>
    <div style="overflow: hidden; margin-top: 120px;margin-right: 50px;">
      <el-button type="success" @click="addStrategy" style="float: right;">添加活动策略</el-button>
    </div>

    <el-dialog title="添加活动策略" :visible.sync="addeditFormVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="addForm" label-width="80px" :rules="bianRules" ref="addForm">
        <el-form-item label="活动策略描述" prop="strategyDesc" label-width="120px">
          <el-input v-model="addForm.strategyDesc" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="活动策略名称" prop="strategyName" label-width="120px">
          <el-input v-model="addForm.strategyName" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="活动策略状态" prop="strategyStatus" label-width="120px">
          <el-input v-model="addForm.strategyStatus" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="活动策略类型" prop="strategyType" label-width="120px">
          <el-input v-model="addForm.strategyType" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addeditFormVisible=false">取消</el-button>
        <el-button type="primary" @click="addjiSubmit">提交</el-button>
      </div>
    </el-dialog>
    <div style="display: flex;">
      <el-table :data="strategyData" style="width: 50%;margin-top: 20px;" height="450">
        <el-table-column prop="strategyName" label="策略名称" fixed width="120" align="center"></el-table-column>
        <el-table-column prop="strategyStatus" label="策略状态" width="150" align="center"></el-table-column>

        <el-table-column prop="strategyType" label="策略类型" width="120" align="center"></el-table-column>
        <el-table-column prop="strategyDesc" label="策略描述" width="300" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
        <el-table-column label="操作" width="320" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleRole(scope.row.id)">编辑</el-button> -->
            <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            <el-button type="success" @click="addcerule(scope.row.id)" size="mini">添加规则</el-button>
            <el-button type="success" @click="getStrategyRule(scope.row.id)" size="mini">查询规则</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="规则" :visible.sync="ruletost" :close-on-click-modal="false">
        <el-table :data="StrategyRule" style="margin-top: 20px;margin-left: 20px;" height="450">
          <el-table-column prop="ruleName" label="规则名称" fixed width="120" align="center"></el-table-column>
          <el-table-column prop="ruleStatus" label="规则状态" width="150" align="center"></el-table-column>
          <el-table-column prop="ruleDesc" label="规则描述" width="150" align="center"></el-table-column>

          <el-table-column prop="ruleType" label="规则值(可修改)" width="300" align="center">
            <!-- <template slot-scope="scope">
          <input type="text" v-model="addrule.ruleType" @change="edit">
          <input type="text">
            </template>-->
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.ruleType"
                placeholder="请输入内容"
                @change="edit(scope.row.id,scope.row.ruleType)"
                style="width: 100px;"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="ruelValueType" label="规则值类型" width="300" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
          <el-table-column label="操作" width="220" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleRole(scope.row.id)"
              >编辑</el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ruletost=false">取消</el-button>
          <!-- <el-button type="primary" @click="addRule" >提交</el-button> -->
        </div>
      </el-dialog>
    </div>
    <el-dialog title="增加策略规则" :visible.sync="addeditFormVisiblerule" :close-on-click-modal="false">
      <el-form :inline="true" :model="addrule" label-width="80px" :rules="Rules" ref="addrules">
        <el-form-item label="规则名字" prop="ruleName" label-width="120px">
          <el-input v-model="addrule.ruleName" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="规则描述" prop="ruleDesc" label-width="120px">
          <el-input v-model="addrule.ruleDesc" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="规则状态" prop="ruleStatus" label-width="120px">
          <el-input v-model="addrule.ruleStatus" auto-complete="off"></el-input>
        </el-form-item>
        <br />

        <el-form-item label="规则值" prop="ruleType" label-width="120px">
          <el-input v-model="addrule.ruleType" auto-complete="off" @change="edit" disabled="false"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="规则值类型" prop="ruleValueType" label-width="120px">
          <el-input v-model="addrule.ruleValueType" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addeditFormVisiblerule=false">取消</el-button>
        <el-button type="primary" @click="addRule">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/apis/voteApi.js';
export default {

  data () {
    return {
      ruletost: false,
      StrategyRule: [],
      strategyData: [],
      Rules: {
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
      addeditFormVisiblerule: false,
      addForm: {},
      addrule: {},
      bianRules: {
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

      addWu: {},
      addeditFormVisible: false,
      tableData: []
    }
  },
  mounted () {
    this.getStrategy();
    // this.getStrategyRule();
  },
  methods: {
    edit: function (id, row) {
      console.log(id, row)
      // fd.append('ruleType ', params.ruleType);
      // fd.append('id ', params.id);
      let aa = {
        ruleType: row,
        id: id
      }
      api.updateStrategyRule(aa).then(response => {
        console.log(response)
        if (response.status === 200) {

          this.$message({
            message: "提交成功",
            type: "success"
          });
          // this.editFormVisible = false;
          // this.getStrategyRule(this.id);

        } else {
          this.$message({
            message: "提交失败",
            type: "success"
          });

          // this.editFormVisible = false;
        }
      });
    },
    // 获取策略
    getStrategy: function () {

      api.getStrategy().then(response => {
        console.log('获取策略', response);
        this.strategyData = response.data.data;
      })
    },
    //获取策略规则
    getStrategyRule: function (id) {
      this.ruletost = true;
      console.log(id);
      api.getStrategyRule(id).then(response => {
        console.log('获取策略规则', response);
        this.StrategyRule = response.data.data;
      })
    },

    // 添加策略规则
    addRule: function () {
      this.$refs.addrules.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addrule);

            api.addStrategyRule(this.addrule).then(response => {
              console.log(response)
              if (response.status === 200) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });

                this.addeditFormVisiblerule = false;
                // this.getStrategyRule();
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
    addcerule: function (id) {
      console.log(id)
      this.addrule.strategyId = id;
      this.addeditFormVisiblerule = true;
    },
    addStrategy: function () {
      this.addeditFormVisible = true;
    },
    // 添加策略
    addjiSubmit: function () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addForm);

            api.addStrategyRule(this.addForm).then(response => {
              console.log(response)
              if (response.status === 200) {

                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.getStrategy();
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
