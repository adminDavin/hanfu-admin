<template>
  <div>


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动管理" name="first" >
        <div>
          <el-button type="success" @click="addStrategy" style="margin-right: 60px; margin-bottom: 20px; overflow: hidden; margin-top: 20px;margin-left: 20px;float:right;">添加活动</el-button>
        </div>



        <el-dialog title="添加活动" :visible.sync="addeditFormVisible" :close-on-click-modal="false">
          <el-form :inline="true" :model='addForm' label-width="80px" :rules="bianRules" ref="addForm">
            <el-form-item label="活动描述" prop="activityDesc" label-width="120px">
              <el-input v-model="addForm.activityDesc" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动名称" prop="activityName" label-width="120px">
              <el-input v-model="addForm.activityName" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动状态" prop="activityStatus" label-width="120px">
              <el-input v-model="addForm.activityStatus" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动类型" prop="activiyType" label-width="120px">
              <el-input v-model="addForm.activiyType" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item prop="activiyType" label="活动策略" label-width="120px">
              <el-select v-model="value" placeholder="请选择" @change="changedata()">
                <el-option v-for="(item,index) in strategyData" :key="index" :value="item.strategyName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addeditFormVisible=false">取消</el-button>
            <el-button type="primary" @click="addjiSubmit">提交</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改活动" :visible.sync="editFormVisible" :close-on-click-modal="false">
          <el-form :inline="true" :model='editForm' label-width="80px" :rules="bianRules" ref="addForm">
            <el-form-item label="活动描述" prop="activityDesc" label-width="120px">
              <el-input v-model="editForm.activityDesc" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动名称" prop="activityName" label-width="120px">
              <el-input v-model="editForm.activityName" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动状态" prop="activityStatus" label-width="120px">
              <el-input v-model="editForm.activityStatus" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动类型" prop="activiyType" label-width="120px">
              <el-input v-model="editForm.activiyType" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item prop="activiyType" label="活动策略" label-width="120px">
              <el-select v-model="value" placeholder="请选择" @change="changedata()">
                <el-option v-for="(item,index) in strategyData" :key="index" :value="item.strategyName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible=false">取消</el-button>
            <el-button type="primary" @click="addjiSubmit">提交</el-button>
          </div>
        </el-dialog>
        <!-- 表格 -->

        <el-table :data="activeData" style="width: 100%;margin-top: 30px;">

          <el-table-column label="序列号" align="center" type="index" width="100">
          </el-table-column>
         <!-- <el-table-column prop="activityName" label="活动名称" width="120" align="center">
            <template slot-scope="scope">

              <el-tag>{{ scope.row.activityName }}</el-tag>

            </template>
          </el-table-column> -->
          <el-table-column label="活动名称" width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>活动名称: {{ scope.row.activityName }}</p>
               <!-- <p>住址: {{ scope.row.activityName }}</p> -->
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.activityName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="activityDesc" label="活动描述" width="150" align="center">
          </el-table-column>

          <el-table-column prop="activityStatus" label="活动状态" width="120" align="center">
          </el-table-column>
          <el-table-column prop="activiyType" label="活动类型" width="120" align="center">
          </el-table-column>

          <el-table-column prop="strategyId" label="活动策略" width="300" align="center">
            <template slot-scope="scope">
              <el-button type="info" @click="strategy(scope.row.strategyId,scope.row.id)">选举策略{{scope.$index+1}}</el-button>

              <!-- <el-button type="info" @click="editActive(scope.row.id,scope.row.strategyId)">活动详情</el-button> -->
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="300" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="info"  @click="strategy(scope.row.strategyId,scope.row.id)">策略设置</el-button> -->

              <el-button type="info" @click="editActive(scope.row.id,scope.row.strategyId)">活动详情</el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="策略管理" name="second">
        <el-table :data="strategyData1" style="margin-top: 20px;" :height="tableHeight">
          <el-table-column prop="strategyName" label="策略名称" fixed width="120" align="center" fixed>
          </el-table-column>
          <el-table-column prop="strategyStatus" label="策略状态" width="150" align="center">
          </el-table-column>

          <el-table-column prop="strategyType" label="策略类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="strategyDesc" label="策略描述" width="300" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="300" align="center">
          </el-table-column>
          <el-table-column label="操作" width="320" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleRole(scope.row.id)">编辑</el-button> -->
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
              <el-button type="success" @click="addcerule(scope.row.id)" size="mini">添加规则</el-button>
              <el-button type="success" @click="getStrategyRule(scope.row.id)" size="mini">查询规则</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="增加策略规则" :visible.sync="addeditFormVisiblerule" :close-on-click-modal="false">
          <el-form :inline="true" :model='addrule' label-width="80px" :rules="Rules" ref="addrules">

            <el-form-item label="规则名字" prop="ruleName" label-width="120px">
              <el-input v-model="addrule.ruleName" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="规则描述" prop="ruleDesc" label-width="120px">
              <el-input v-model="addrule.ruleDesc" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="规则状态" prop="ruleStatus" label-width="120px">
              <el-input v-model="addrule.ruleStatus" auto-complete="off"></el-input>
            </el-form-item>
            <br>

            <el-form-item label="规则值" prop="ruleType" label-width="120px">
              <el-input v-model="addrule.ruleType" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="规则值类型" prop="ruleValueType" label-width="120px">
              <el-input v-model="addrule.ruleValueType" auto-complete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addeditFormVisiblerule=false">取消</el-button>
            <el-button type="primary" @click="addRule">提交</el-button>
          </div>
        </el-dialog>
        <el-dialog title="规则" :visible.sync="ruletost" :close-on-click-modal="false">
          <el-table :data="StrategyRule" style="margin-top: 20px;margin-left: 20px;" height="450">
            <el-table-column prop="ruleName" label="规则名称" fixed width="120" align="center">
            </el-table-column>
            <el-table-column prop="ruleStatus" label="规则状态" width="150" align="center">
            </el-table-column>
            <el-table-column prop="ruleDesc" label="规则描述" width="150" align="center">
            </el-table-column>

            <el-table-column prop="ruleType" label="规则值(可修改)" width="300" align="center">
              <!-- <template slot-scope="scope">
                <input type="text" v-model="addrule.ruleType" @change="edit">
                <input type="text">
              </template> -->
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.ruleType" placeholder="请输入内容" @change="edit(scope.row.id,scope.row.ruleType)"
                  style="width: 100px;"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ruelValueType" label="规则值类型" width="300" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="300" align="center">
            </el-table-column>

          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="ruletost=false">取消</el-button>
            <!-- <el-button type="primary" @click="addRule" >提交</el-button> -->
          </div>
        </el-dialog>
      </el-tab-pane>

    </el-tabs>


  </div>
</template>

<script>
  import api from '@/apis/voteApi.js';
  export default {

    data() {
      return {
        tableHeight: window.innerHeight - 170,
        ruletost: false,
        StrategyRule: [],
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
        strategyData1: [],
        activeName: 'first',
        editForm: {},
        editFormVisible: false,
        activeData: [],
        value: '',
        strategyData: [],
        addForm: {},
        bianRules: {
          activityDesc: [{
            required: true,
            message: "活动描述",
            trigger: "blur"
          }],
          activityName: [{
            required: true,
            message: "活动名称",
            trigger: "blur"
          }],
          activityStatus: [{
            required: true,
            message: "活动状态",
            trigger: "blur"
          }],
          activiyType: [{
            required: true,
            message: "活动类型",
            trigger: "blur"
          }],
          value: [{
            required: true,
            message: "选择活动策略",
            trigger: "blur"
          }]

        },
        addWu: {},
        addeditFormVisible: false,
        tableData: [],
        addrule: {},
        addeditFormVisiblerule: false,
      }
    },
    mounted() {

      this.getStrategy();
      this.getActive();
      this.getStrategy1();
    },
    methods: {

      //获取策略规则
      getStrategyRule: function(id) {
        this.ruletost = true;
        console.log(id);
        api.getStrategyRule(id).then(response => {
          console.log('获取策略规则', response);
          this.StrategyRule = response.data.data;
        })
      },
      edit: function(id, row) {
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
      // 添加策略规则
      addRule: function() {
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
      addcerule: function(id) {
        console.log(id)
        this.addrule.strategyId = id;
        this.addeditFormVisiblerule = true;
      },
      getStrategy1: function() {

        api.getStrategy().then(response => {
          console.log('获取策略', response);
          this.strategyData1 = response.data.data;
        })
      },
      handleClick: function(tab, event) {
        console.log(tab, event);
      },
      strategy: function(id, activeid) {
        this.$router.push({
          name: 'Rule',
          query: {
            'id': id,
            'active': activeid
          }
        });
      },
      editActive: function(id, strategyId) {
        this.$router.push({
          name: 'activityDetail',
          query: {
            'id': id,
            'strategyId': strategyId
          }
        });
      },
      //删除活动
      delecteActive: function(id) {
        console.log(id);
        api.deleteActivityStrategy(id).then(response => {
          console.log('活动列表', response);
          // this.activeData = response.data.data;
        })
      },
      getActive: function() {
        api.getActivity().then(response => {
          console.log('活动列表', response);
          this.activeData = response.data.data;
        })
      },
      changedata: function() {

        let obj = {};
        obj = this.strategyData.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.strategyName == this.value) {
            return item
          }
        });
        this.addForm.strategyId = obj.id;

      },
      // 获取策略
      getStrategy: function() {
        api.getStrategy().then(response => {
          console.log('获取策略', response);
          this.strategyData = response.data.data;
          console.log(this.strategyData);
        })
      },
      addStrategy: function() {
        this.addeditFormVisible = true;
      },
      // 添加活动
      addjiSubmit: function() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.addForm);

              api.addActivity(_this.addForm).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.getActive();
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
        console.log(this.addForm)
        var _this = this;

      }
    }
  }
</script>
