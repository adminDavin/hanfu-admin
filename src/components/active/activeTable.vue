<template>
  <div>


    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="活动管理" name="first" style="color:orange;">
        <div>
          <el-button type="primary" @click="addactive" style="margin-right: 60px; margin-bottom: 20px; overflow: hidden;
           margin-top: 20px;margin-left: 20px;float:right;">添加活动</el-button>
        </div>
        <el-dialog title="添加活动" :visible.sync="addFormVisible" :close-on-click-modal="false">
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

            <el-button @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="addjiactive">提交</el-button>

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

        <el-table :data="activeData" style="margin-top: 30px;" height="500px" >

          <el-table-column label="序列号" align="center" type="index" width="100">
          </el-table-column>

          <el-table-column label="活动名称" width="100" align="center">
            <template slot-scope="scope" >
              <!-- <el-popover  placement="top" trigger="hover"> -->
                <p style="width: 80px;margin: 0 auto; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">{{ scope.row.activityName }}</p>
               <!-- <p>住址: {{ scope.row.activityName }}</p> -->
                <!-- <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.activityName }}</el-tag>
                </div>
              </el-popover> -->
            </template>
          </el-table-column>
          <el-table-column prop="activityDesc" label="活动描述" width="150" align="center">
          </el-table-column>
          <el-table-column  label="活动类型" width="120" align="center">
            <template slot-scope="scope">
                 <span v-if="scope.row.type=='score'">评分制</span>
                 <span v-if="scope.row.type=='election'">内推制</span>
                 <span v-if="scope.row.type=='ticket_count'">投票制</span>
                 <span v-if="scope.row.type=='praise'">积赞制</span>
                 <!-- <span v-if="!scope.row.count">--</span> -->
             </template>
               <!-- <template slot-scope="scope"><div v-if="scope.row.activiyType==score">打分活动 </div></template> -->
          </el-table-column>


          <el-table-column prop="activityStatus" label="活动状态" width="120" align="center">

            <template slot-scope="scope">
              <div v-if="scope.row.isTimingStart==0">尚未开始</div>
              <div v-if="scope.row.isTimingStart==1">进行中</div>
            </template>
          </el-table-column>

          <el-table-column prop="strategyId" label="活动策略" width="200" align="center">
            <template slot-scope="scope" >

              <div  @click="strategy(scope.row.strategyId,scope.row.id,scope.row.type)" style="color: #fff;font-size: 14px;
              width: 98px;height:40px;  border-radius: 4px;margin: 0 auto;color: #00D1B2;
text-overflow:ellipsis;overflow: hidden;
line-height:40px ;
text-align: center;
white-space: nowrap;">
               查看
              </div>
              <!-- <el-button type="info" width="300" size="medium"  ></el-button> -->

              <!-- <el-button type="info" @click="editActive(scope.row.id,scope.row.strategyId)">活动详情</el-button> -->
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"  align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editActive(scope.row.id,scope.row.strategyId)">活动详情</el-button>
              <el-button type="primary" v-if="scope.row.isTimingStart==0" style="background:#E04C2F;border:1px solid  #E04C2F;" size="mini" @click="control(scope.row.id)">开启活动</el-button>
              <el-button type="primary" v-if="scope.row.isTimingStart==1" style="background:#bbb;border:1px solid  #bbb;"  size="mini" @click="control(scope.row.id)">关闭活动</el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="策略管理" name="second">
        <el-dialog title="添加活动策略" :visible.sync="addce" :close-on-click-modal="false">
          <el-form :inline="true"  :model='addceform' label-width="80px" :rules="addceformRules" ref="addceform">
             <el-form-item label="活动策略描述" prop="strategyDesc" label-width="120px">
               <el-input v-model="addceform.strategyDesc" auto-complete="off"></el-input>
             </el-form-item>
             <br>
             <el-form-item label="活动策略名称" prop="strategyName" label-width="120px">
               <el-input v-model="addceform.strategyName" auto-complete="off"></el-input>
             </el-form-item>
             <br>
            <el-form-item label="活动策略状态" prop="strategyStatus" label-width="120px">
              <el-input v-model="addceform.strategyStatus" auto-complete="off"></el-input>
            </el-form-item>
            <br>
             <el-form-item label="活动策略类型" prop="strategyType" label-width="120px">
               <el-input v-model="addceform.strategyType" auto-complete="off"></el-input>
             </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addce=false">取消</el-button>
            <el-button type="primary" @click="addjice" >提交</el-button>
          </div>
        </el-dialog>
           <el-button type="primary"  size="medium" @click="addStrategy" style="float: right;margin-right: 70px;width: 179px;">添加活动策略</el-button>
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
              <el-button type="success" @click="addcerule(scope.row.id)" size="small" style="margin-right: 2px;">添加规则</el-button>
              <el-button type="success" @click="getStrategyRule(scope.row.id)" size="small">查询规则</el-button>
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
              <!-- <el-input v-model="addrule.ruleValueType" auto-complete="off"></el-input> -->
              <el-select v-model="addrule.ruleValueType" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in datatype"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
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

            <el-table-column prop="ruleType" label="规则类型" width="300" align="center">
              <!-- <template slot-scope="scope">
                <input type="text" v-model="addrule.ruleType" @change="edit">
                <input type="text">
              </template> -->
             <!-- <template slot-scope="scope" prop="ruleType" >

              </template> -->
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
        addceformRules:{
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
        addceform:{},
        addce:false,
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
        addFormVisible:false,
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
        datatype:[]
      }
    },
    mounted() {

      this.getStrategy();
      this.getActive();
      this.getStrategy1();
      this.getStrategyType();

    },
    methods: {
      control:function(id){

        api.start(id).then(response => {
          console.log(response);
          if (response.status === 200) {
              this.$message({
                message: "提交成功",
                type: "success"
              });
                  this.getActive();
          } else {
            this.$message({
              message: "提交失败",

            });
          }
        });
      },
      // 添加策略
       addjice:function(){
        this.$refs.addceform.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.addceform);

              api.addStrategy(this.addceform).then(response => {
                console.log(response)
                if (response.status === 200) {

                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                   this.getStrategy1();
                    this.getStrategy();
                  this.addce = false;
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });

                  this.addce = false;
                }
              });
            });
          }
        });
      },
    addStrategy: function(){
      this.addeditFormVisible=true;
    },
    //获取规则类型
    getStrategyType: function(id) {

      console.log(id);
      api.getStrategyType().then(response => {
        console.log('获取规则类型', response);
        this.datatype= response.data.data;
      })
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
                   this.getStrategy();
                  this.addeditFormVisible = false;
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });

                  this.addce = false;
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
      strategy: function(id, activeid,type) {
        console.log(id,activeid);
        this.$router.push({
          name: 'Rule',
          query: {
            'id': id,
            'active': activeid,
            'type': type,
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
        this.addce = true;
      },
      addactive:function(){
          this.addFormVisible = true;
      },
      // 添加活动
      addjiactive: function() {
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

                  this.addFormVisible = false;
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
<style>
  .el-tabs__item.is-active {
      color: red;
  }
</style>
