<template>
  <div>
            <el-dialog title="添加活动策略" :visible.sync="addce" :close-on-click-modal="false">
          <el-form
            :inline="true"
            :model="addceform"
            label-width="80px"
            :rules="addceformRules"
            ref="addceform"
          >
            <el-form-item label="活动策略描述" prop="strategyDesc" label-width="120px">
              <el-input v-model="addceform.strategyDesc" auto-complete="off"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="活动策略名称" prop="strategyName" label-width="120px">
              <el-input v-model="addceform.strategyName" auto-complete="off"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="活动策略状态" prop="strategyStatus" label-width="120px">
              <el-input v-model="addceform.strategyStatus" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <!-- <br>
             <el-form-item label="活动策略类型" prop="strategyType" label-width="120px">
               <el-input v-model="addceform.strategyType" :disabled="true"  auto-complete="off"></el-input>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addce=false">取消</el-button>
            <el-button type="primary" @click="addjice">提交</el-button>
          </div>
        </el-dialog>
        <el-button
          type="primary"
          size="medium"
          @click="addStrategy"
          style="float: right;margin-right: 70px;width: 179px;"
        >添加活动策略</el-button>
        <el-table :data="strategyData1" style="margin-top: 20px;" :height="tableHeight">
          <el-table-column prop="strategyName" label="策略名称" fixed width="120" align="center"></el-table-column>
          <el-table-column prop="strategyStatus" label="策略状态" width="150" align="center"></el-table-column>
          <!-- <el-table-column prop="strategyType" label="策略类型" width="120" align="center">
          </el-table-column>-->
          <el-table-column prop="strategyDesc" label="策略描述" width="300" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
          <el-table-column label="操作" width="320" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleRole(scope.row.id)">编辑</el-button> -->

              <el-button
                type="success"
                @click="addcerule(scope.row.id)"
                size="small"
                style="margin-right: 2px;"
              >添加规则</el-button>
              <el-button type="success" @click="getStrategyRule(scope.row.id)" size="small">查询规则</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delectestrategy(scope.row.id)"
                size="mini"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="增加策略规则"
          :visible.sync="addeditFormVisiblerule"
          :close-on-click-modal="false"
        >
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
              <el-input v-model="addrule.ruleStatus" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <br />

            <el-form-item label="规则值" prop="ruleType" label-width="120px">
              <el-input v-model="addrule.ruleType" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="规则值类型" prop="ruleValueType" label-width="120px">
              <!-- <el-input v-model="addrule.ruleValueType" auto-complete="off"></el-input> -->
              <el-select v-model="addrule.ruleValueType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in datatype"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
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
            <el-table-column prop="ruleName" label="规则名称" fixed width="120" align="center"></el-table-column>
            <el-table-column prop="ruleStatus" label="规则状态" width="150" align="center"></el-table-column>
            <el-table-column prop="ruleDesc" label="规则描述" width="150" align="center"></el-table-column>

            <el-table-column prop="ruleType" label="规则类型" width="300" align="center">
              <!-- <template slot-scope="scope">
                <input type="text" v-model="addrule.ruleType" @change="edit">
                <input type="text">
              </template>-->
              <!-- <template slot-scope="scope" prop="ruleType" >

              </template>-->
            </el-table-column>
            <el-table-column prop="ruelValueType" label="规则值类型" width="300" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="300" align="center"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="ruletost=false">取消</el-button>
            <!-- <el-button type="primary" @click="addRule" >提交</el-button> -->
          </div>
        </el-dialog>

  </div>
</template>

<script>
import api from "@/apis/voteApi.js";
export default {
  data() {
    return {
      addceformRules: {
        strategyDesc: [
          {
            required: true,
            message: "活动策略描述",
            trigger: "blur"
          }
        ],
        strategyName: [
          {
            required: true,
            message: "活动策略名称",
            trigger: "blur"
          }
        ]
        // strategyStatus: [{
        //   required: true,
        //   message: "活动策略状态",
        //   trigger: "blur"
        // }],
        // strategyType: [{
        //   required: true,
        //   message: "活动策略类型",
        //   trigger: "blur"
        // }]
      },
      addceform: {},
      addce: false,
      tableHeight: window.innerHeight - 170,
      ruletost: false,
      StrategyRule: [],
      Rules: {
        ruleDesc: [
          {
            required: true,
            message: "规则描述",
            trigger: "blur"
          }
        ],
        ruleName: [
          {
            required: true,
            message: "规则名字",
            trigger: "blur"
          }
        ],
        // ruleStatus: [{
        //   required: true,
        //   message: "规则状态",
        //   trigger: "blur"
        // }],
        // ruleType: [{
        //   required: true,
        //   message: "规则类型",
        //   trigger: "blur"
        // }],
        ruleValueType: [
          {
            required: true,
            message: "规则值类型",
            trigger: "blur"
          }
        ]
      },
      strategyData1: [],

      addFormVisible: false,
      editFormVisible: false,
      activeData: [],
      value: "",
      strategyData: [],
      addForm: {},
      bianRules: {
        activityDesc: [
          {
            required: true,
            message: "活动描述",
            trigger: "blur"
          }
        ],
        activityName: [
          {
            required: true,
            message: "活动名称",
            trigger: "blur"
          }
        ],
        // activityStatus: [{
        //   required: true,
        //   message: "活动状态",
        //   trigger: "blur"
        // }],
        // activiyType: [{
        //   required: true,
        //   message: "活动类型",
        //   trigger: "blur"
        // }],
        value: [
          {
            required: true,
            message: "选择活动策略",
            trigger: "blur"
          }
        ]
      },
      addWu: {},
      addeditFormVisible: false,
      tableData: [],
      addrule: {},
      addeditFormVisiblerule: false,
      datatype: []
    };
  },
  mounted() {
    this.getStrategy();
    this.getStrategy1();
    this.getStrategyType();
  },
  methods: {
    delectestrategy: function(id) {
      api.delectestrategy(id).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getStrategy1();
        } else {
          this.$message({
            message: "提交失败"
          });
        }
      });
    },
    // 上传图片
    upLoadPic: function(row) {
      // this.goodId = row.id;
      // this.picOpen = true;
      // this.selectedGoods = row;
      // console.log(this.selectedGoods);
      var main = this;
      // console.log(this.goodId)
      this.$ajax({
        method: "get",
        url: "/api/goods/pictures",
        params: {
          goodsId: main.goodId
        }
      }).then(
        function(resultData) {
          main.pics = resultData.data.data;
          console.log("fwefwe", resultData);
          for (var i = 0; i < main.pics.length; i++) {
            main.pics[i].img =
              "/api/goods/getFile?fileId=" + main.pics[i].fileId;
            console.log(main.pics[i].img);
          }
        },
        function(resultData) {
          // _this.tableData.message = "Local Reeuest Error!";
          //console.log(resultData);
          // for()
        }
      );
    },
    // 添加策略
    addjice: function() {
      this.$refs.addceform.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addceform);

            api.addStrategy(this.addceform).then(response => {
              console.log(response);
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
                  message: "提交失败"
                });

                this.addce = false;
              }
            });
          });
        }
      });
    },
    addStrategy: function() {
      this.addeditFormVisible = true;
    },
    //获取规则类型
    getStrategyType: function(id) {
      console.log(id);
      api.getStrategyType().then(response => {
        console.log("获取规则类型", response);
        this.datatype = response.data.data;
      });
    },
    //获取策略规则
    getStrategyRule: function(id) {
      this.ruletost = true;
      console.log(id);
      api.getStrategyRule(id).then(response => {
        console.log("获取策略规则", response);
        this.StrategyRule = response.data.data;
      });
    },
    // 添加策略规则
    addRule: function() {
      this.$refs.addrules.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addrule);
            var arr = this.addrule;
            var arr1 = arr;
            if (arr1.ruleValueType == "线上线下评分") {
              arr1.ruleValueType = "record_score";
              this.addrule = {};
            }
            if (arr1.ruleValueType == "星星投票") {
              arr1.ruleValueType = "vote_ticket_count";
              this.addrule = {};
            }
            if (arr1.ruleValueType == "内部选举") {
              arr1.ruleValueType = "internal_election";
              this.addrule = {};
            }
            if (arr1.ruleValueType == "公共选举") {
              arr1.ruleValueType = "public_praise";
              this.addrule = {};
            }
            if (arr1.ruleValueType == "投票人") {
              arr1.ruleValueType = "elector";
              this.addrule = {};
            }
            if (arr1.ruleValueType == "被投票人") {
              arr1.ruleValueType = "elected";
              this.addrule = {};
            }

            api.addStrategyRule(arr1).then(response => {
              console.log(response);
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
      console.log(id);
      this.addrule.strategyId = id;
      this.addeditFormVisiblerule = true;
    },
    getStrategy1: function() {
      api.getStrategy().then(response => {
        console.log("获取策略", response);
        this.strategyData1 = response.data.data;
      });
    },
    handleClick: function(tab, event) {
      console.log(tab, event);
    },
    strategy: function(id, activeid, type) {
      console.log(id, activeid);
      this.$router.push({
        name: "Rule",
        query: {
          id: id,
          active: activeid,
          type: type
        }
      });
    },
    editActive: function(id, strategyId, type) {
      this.$router.push({
        name: "activityDetail",
        query: {
          id: id,
          strategyId: strategyId,
          type: type
        }
      });
    },
    //删除活动
    getActive: function() {
      api.getActivity().then(response => {
        console.log("活动列表", response);
        this.activeData = response.data.data;
      });
    },
    changedata: function() {
      let obj = {};
      obj = this.strategyData.find(item => {
        //这里的selectList就是上面遍历的数据源
        //筛选出匹配数据
        if (item.strategyName == this.value) {
          return item;
        }
      });

      this.addForm.strategyId = obj.id;
    },
    // 获取策略
    getStrategy: function() {
      api.getStrategy().then(response => {
        console.log("获取策略", response);
        this.strategyData = response.data.data;
        console.log(this.strategyData);
      });
    },
    addStrategy: function() {
      this.addce = true;
    },
  }
};
</script>
<style>
.el-tabs__item.is-active {
  color: red;
}
</style>

