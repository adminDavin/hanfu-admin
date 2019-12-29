<template>
<div>
  <div>
    <el-button type="primary" @click="addactive" style="margin-right: 60px; margin-bottom: 20px; overflow: hidden;
           margin-top: 20px;margin-left: 20px;float:right;">添加活动</el-button>
  </div>
  <el-dialog title="添加活动" :visible.sync="addFormVisible" :close-on-click-modal="false">
    <el-form :inline="true" :model="addForm" label-width="80px" :rules="bianRules" ref="addForm">
      <el-form-item label="活动描述" prop="activityDesc" label-width="120px">
        <el-input v-model="addForm.activityDesc" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动名称" prop="activityName" label-width="120px">
        <el-input v-model="addForm.activityName" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动状态" prop="activityStatus" label-width="120px">
        <el-input v-model="addForm.activityStatus" :disabled="true" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动类型" prop="activiyType" label-width="120px">
        <el-input v-model="addForm.activiyType" :disabled="true" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item prop="activiyType" label="活动策略" label-width="120px">
        <el-select v-model="value" placeholder="请选择" @change="changedata()">
          <el-option v-for="(item,index) in strategyData" :key="index" :value="item.strategyName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible=false">取消</el-button>
      <el-button type="primary" @click="addjiactive">提交</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修改活动" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :inline="true" :model="editForm" label-width="80px" :rules="bianRules" ref="addForm">
      <el-form-item label="活动描述" prop="activityDesc" label-width="120px">
        <el-input v-model="editForm.activityDesc" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动名称" prop="activityName" label-width="120px">
        <el-input v-model="editForm.activityName" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动状态" prop="activityStatus" label-width="120px">
        <el-input v-model="editForm.activityStatus" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动类型" prop="activiyType" label-width="120px">
        <el-input v-model="editForm.activiyType" auto-complete="off"></el-input>
      </el-form-item>
      <br />
      <el-form-item prop="activiyType" label="活动策略" label-width="120px">
        <el-select v-model="value" placeholder="请选择" @change="changedata()">
          <el-option v-for="(item,index) in strategyData" :key="index" :value="item.strategyName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible=false">取消</el-button>
      <el-button type="primary" @click="addjiSubmit">提交</el-button>
    </div>
  </el-dialog>
  <!-- 表格 -->

  <el-table :data="activeData" style="margin-top: 30px;" height="500px">
    <el-table-column label="序列号" align="center" type="index" width="100"></el-table-column>

    <el-table-column label="活动名称" width="100" align="center">
      <template slot-scope="scope">
        <!-- <el-popover  placement="top" trigger="hover"> -->
        <p style="width: 80px;margin: 0 auto; text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">{{ scope.row.activityName }}</p>
        <!-- <p>住址: {{ scope.row.activityName }}</p> -->
        <!-- <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.activityName }}</el-tag>
                </div>
              </el-popover>-->
      </template>
    </el-table-column>
    <el-table-column prop="activityDesc" label="活动描述" width="150" align="center"></el-table-column>
    <el-table-column label="活动类型" width="120" align="center">
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
      <template slot-scope="scope">
        <div @click="strategy(scope.row.strategyId,scope.row.id,scope.row.type)" style="color: #fff;font-size: 14px;
              width: 98px;height:40px;  border-radius: 4px;margin: 0 auto;color: #00D1B2;text-overflow:ellipsis;overflow: hidden;line-height:40px ;text-align: center;white-space: nowrap;cursor:pointer;">查看</div>
        <!-- <el-button type="info" width="300" size="medium"  ></el-button> -->

        <!-- <el-button type="info" @click="editActive(scope.row.id,scope.row.strategyId)">活动详情</el-button> -->
        <!-- <el-button type="danger" icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button> -->
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="editActive(scope.row.id,scope.row.strategyId,scope.row.type)">活动详情</el-button>
        <el-button type="primary" v-if="scope.row.isDeleted==0" style="background:#E04C2F;border:1px solid  #E04C2F;" size="mini" @click="sort(scope.row.id)">开启排行榜</el-button>
        <el-button type="primary" v-if="scope.row.isDeleted==1" style="background:#bbb;border:1px solid  #bbb;" size="mini" @click="sort(scope.row.id)">关闭排行榜</el-button>
        <el-button type="primary" v-if="scope.row.isTimingStart==0" style="background:#E04C2F;border:1px solid  #E04C2F;" size="mini" @click="control(scope.row.id)">开启活动</el-button>
        <el-button type="primary" v-if="scope.row.isTimingStart==1" style="background:#bbb;border:1px solid  #bbb;" size="mini" @click="control(scope.row.id)">关闭活动</el-button>
        <el-button type="danger" plain icon="el-icon-delete" @click="delecteActive(scope.row.id)" size="mini">删除</el-button>
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
      addceform: {},
      addce: false,
      tableHeight: window.innerHeight - 170,
      activeName: "first",
      editForm: {},
      addFormVisible: false,
      editFormVisible: false,
      activeData: [],
      value: "",
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
        value: [{
          required: true,
          message: "选择活动策略",
          trigger: "blur"
        }]
      },
      addeditFormVisible: false,
      addeditFormVisiblerule: false,
      datatype: []
    };
  },
  mounted() {
    this.getStrategy();
    this.getActive();
    this.getStrategyType();
  },
  methods: {
    sort: function (id) {
      api.sortStart(id).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getActive();
        } else {
          this.$message({
            message: "提交失败"
          });
        }
      });
    },
    control: function (id) {
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
            message: "提交失败"
          });
        }
      });
    },
    addStrategy: function () {
      this.addeditFormVisible = true;
    },
    //获取规则类型
    getStrategyType: function (id) {
      console.log(id);
      api.getStrategyType().then(response => {
        console.log("获取规则类型", response);
        this.datatype = response.data.data;
      });
    },
    edit: function (id, row) {
      console.log(id, row);
      // fd.append('ruleType ', params.ruleType);
      // fd.append('id ', params.id);
      let aa = {
        ruleType: row,
        id: id
      };
      api.updateStrategyRule(aa).then(response => {
        console.log(response);
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
    // 添加策略
    addjiSubmit: function () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addForm);

            api.addStrategy(this.addForm).then(response => {
              console.log(response);
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
    handleClick: function (tab, event) {
      console.log(tab, event);
    },
    strategy: function (id, activeid, type) {
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
    editActive: function (id, strategyId, type) {
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
    delecteActive: function (id) {
      console.log(id);
      this.$confirm("确认删除吗？", "提示").then(() => {
        api.deleteActivity(id).then(response => {
          console.log("活动列表", response);
          if (response.status == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getActive();
          } else {
            this.$message({
              message: "删除失败",
              type: "success"
            });
          }
        });
      });
    },
    getActive: function () {
      api.getActivity().then(response => {
        console.log("活动列表", response);
        this.activeData = response.data.data;
      });
    },
    changedata: function () {
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
    getStrategy: function () {
      api.getStrategy().then(response => {
        console.log("获取策略", response);
        this.strategyData = response.data.data;
        console.log(this.strategyData);
      });
    },
    addactive: function () {
      this.addFormVisible = true;
    },
    // 添加活动
    addjiactive: function () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.addForm);

            api.addActivity(_this.addForm).then(response => {
              console.log(response);
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
      console.log(this.addForm);
      var _this = this;
    }
  }
};
</script>

<style>
.el-tabs__item.is-active {
  color: red;
}
</style>
