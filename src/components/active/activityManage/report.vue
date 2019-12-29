<template>
<div>
  <el-form v-if="type=='score'" :inline="true" :model="templateData1" ref="addFormRules1" :rules="addFormRules1" class="demo-form-inline" style=" border-radius:10px;height: 357px; padding:30px;
      border:1px solid #00D1B2; margin-top: 40px;margin-left: 100px;" label="活动详情">
    <el-form-item label-width="100px">
      <div style="font-size: 20px;text-align: center;">现场汇报:</div>
    </el-form-item>
    <br />
    <el-form-item label="评分项名称" label-width="100px" prop="evaluateType">
      <el-input v-model="templateData1.evaluateType" placeholder="评分项名称"></el-input>
    </el-form-item>
    <br />
    <el-form-item label="评分权重" label-width="100px" prop="evaluateWeight">
      <el-input v-model="templateData1.evaluateWeight" placeholder="评分权重" type="number"></el-input>
    </el-form-item>
    <br />
    <el-form-item label="评分内容" label-width="100px" prop="evaluateContent">
      <el-input v-model="templateData1.evaluateContent" placeholder="评分内容"></el-input>
    </el-form-item>
    <br />

    <el-form-item style="margin-top: 20px;margin-left: 19%;">
      <template slot-scope>
        <el-button type="primary" size="medium" style="width: 200px;" @click="add1">添加</el-button>
      </template>
    </el-form-item>
  </el-form>
  <div style="margin-top: 30px;font-weight: bold;font-size: 18px;margin-left: 10px;" v-if="type=='score'">现场汇报</div>
  <el-table :data="templatedata1" style="margin-top: 20px;width: 80%;margin-left: -22px;" title="评分项列表" v-if="type=='score'">
    <el-table-column prop="evaluateType" label="评分项名称" width="500" align="center"></el-table-column>
    <el-table-column prop="evaluateWeight" label="评分权重" width="150" align="center"></el-table-column>
    <el-table-column prop="evaluateContent" label="评价内容" width="500" align="center"></el-table-column>
  </el-table>
</div>
</template>

<script>
import vSidebar from "@/components/common/sidebar.vue";
import vHead from "@/components/common/header.vue";
import api from "@/apis/voteApi.js";
export default {
  name: "store",
  components: {
    vHead,
    vSidebar
  },
  data() {
    return {
      list1: '', // type 
      list: [],
      form: {
        name: "",
        region: "",
        date1: "",
      },
      loading: true,
      // 弹窗控制显示隐藏
      dialogTableVisible: false,
      dialogTable: false,
      dialogFormVisible4: false,
      // 弹窗表格数据
      gridData: [],
      changeSjForm: {},
      changeSjVisible: false,
      changeSjRules: {
        // ruleType: [
        //   {
        //     required: true,
        //     message: "填写评优事迹项",
        //     trigger: "blur"
        //   }
        // ]
      },
      recordHistory: [],
      templatedata1: [],
      templateData1: {},
      type: "",
      templateWeight: 0,
      templateWeight1: 0,
      templatedata: [],
      addFormRules: {
        evaluateType: [{
          required: true,
          message: "请输入评分项名称",
          trigger: "blur"
        }],
        evaluateWeight: [{
          required: true,
          message: "请输入评分权重",
          trigger: "blur"
        }],
        remarks: [{
          required: true,
          message: "请输入备注",
          trigger: "blur"
        }]
      },
      addFormRules1: {
        evaluateType: [{
          required: true,
          message: "请输入评分项名称",
          trigger: "blur"
        }],
        evaluateWeight: [{
          required: true,
          message: "请输入评分权重",
          trigger: "blur"
        }],
        evaluateContent: [{
          required: true,
          message: "请输入评价内容",
          trigger: "blur"
        }]
      },
      templateData: {},
      detaildata: {},
      id: "",
      collapse: false,
      selectedStone: 1,
      StrategyRule: [],
      quan: {},
      quan1: {},
      find: {},
      find1: {}
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.quan.activityId = this.$route.query.id;
    this.quan.type = 0;
    this.quan1.activityId = this.$route.query.id;
    this.quan1.type = 1;
    this.type = this.$route.query.type;
    this.templateData.parentTemplateId = this.$route.query.id;
    this.templateData1.parentTemplateId = this.$route.query.id;
    this.find.type = 0;
    this.find1.type = 1;
    this.find.activityId = this.$route.query.id;
    this.find1.activityId = this.$route.query.id;
    this.getDetail();
    this.getStrategyRule();
    this.findUserTemplate();
    this.checkWeight();
    if (this.type == "score") {
      this.checkWeight1();
      this.findUserTemplate1();
    }
    this.getActivityRecord(this.id);
  },
  methods: {
    changeShiji: function (index, id) {
      this.changeSjVisible = true;
      this.changeSjForm = this.templatedata[index];
      console.log("点击修改评优事迹:", this.changeSjForm);
    },
    changeSjSubmit: function (data) {
      this.changeSjVisible = false;
      api.updateSJ(data).then(res => {
        console.log(res);
        if (res.data == false) {
          console.log(1111111111111111111111);
          this.$message({
            message: "权重之和不能超过1"
          });
        } else {
          this.findUserTemplate();
        }
      });
    },
    deleteShiji: function (id) {
      api.deleteSJ(id).then(res => {
        console.log("删除事迹成功");
        this.findUserTemplate();
      });
    },
    getActivityRecord: function (id) {
      api.ActivityvoteRecords(id).then(response => {
        console.log("投票记录", response);
        this.recordHistory = response.data.data;
      });
    },
    add: function () {
      this.templateData.isDeleted = 0;
      console.log(this.templateWeight);
      if (
        this.templateData.evaluateWeight < 0 ||
        this.templateData.evaluateWeight == 0 ||
        this.templateData.evaluateWeight > 1
      ) {
        this.$message({
          message: "权重范围在0~1之间"
        });
        return;
      }
      console.log(this.templateData.evaluateWeight);
      let he =
        Number(this.templateWeight) + Number(this.templateData.evaluateWeight);
      console.log(he);
      console.log(this.templateData.evaluateWeight, this.templateWeight);
      if (he > 1) {
        this.$message({
          message: "权重之和不能超过1"
        });
        return;
      }
      this.$refs.addFormRules.validate(valid => {
        if (valid) {
          this.$confirm("确认添加吗？", "提示", {}).then(() => {
            console.log(this.templateData);
            api.EvaluationTemplate(this.templateData).then(response => {
              console.log("评分项", response);
              this.findUserTemplate();
            });
          });
        }
      });
    },
    add1: function () {
      this.templateData1.isDeleted = 1;
      if (
        this.templateData1.evaluateWeight < 0 ||
        this.templateData1.evaluateWeight == 0 ||
        this.templateData1.evaluateWeight > 1
      ) {
        this.$message({
          message: "权重范围在0~1之间"
        });
        return;
      }
      let he =
        Number(this.templateWeight1) +
        Number(this.templateData1.evaluateWeight);
      console.log(this.templateData1.evaluateWeight, this.templateWeight);
      if (he > 1) {
        this.$message({
          message: "权重之和不能超过1"
        });
        return;
      }
      this.$refs.addFormRules1.validate(valid => {
        if (valid) {
          this.$confirm("确认添加吗？", "提示", {}).then(() => {
            console.log(this.templateData1);
            api.EvaluationTemplate(this.templateData1).then(response => {
              console.log("评分项", response);
              this.findUserTemplate1();
            });
          });
        }
      });
    },
    checkWeight: function () {
      console.log(this.quan);
      api.checkTemplateWeight(this.quan).then(response => {
        console.log("查找权重", response);
        this.templateWeight = response.data.data;
      });
    },
    checkWeight1: function () {
      console.log(this.quan1);
      api.checkTemplateWeight1(this.quan1).then(response => {
        console.log("查找权重1", response);
        this.templateWeight1 = response.data.data;
      });
    },
    findUserTemplate: function () {
      api.findUserTemplate(this.find).then(response => {
        console.log("查找模板", response);
        this.templatedata = response.data.data;
      });
    },
    findUserTemplate1: function () {
      api.findUserTemplate(this.find1).then(response => {
        console.log("查找模板", response);
        this.templatedata1 = response.data.data;
      });
    },
    getDetail: function () {
      api.getActivityDetail(this.id).then(response => {
        console.log("活动详情", response);
        this.detaildata = response.data.data;
      });
    },
    //获取策略规则
    getStrategyRule: function () {
      api.getStrategyRule(this.id).then(response => {
        console.log("获取策略规则", response);
        this.StrategyRule = response.data.data;
      });
    },
    // 后台活动投票记录详情查询ID'  投票
    RecordsDetail: function (userId, type) {
      this.dialogTableVisible = true;
      this.list1 = type
      let params = {
        params: {
          activityId: this.quan.activityId,
          userId: userId
        }
      };
      // console.log("投票详情需要ID", this.quan);
      api.ActivityvoteRecordsDetail(params).then(response => {
        console.log("投票详情列表", response);
        this.gridData = response.data.data;
      });
    },
    // 后台活动投票记录详情查询ID' 评价分
    Detail: function (userId, type) {
      this.list1 = type
      this.dialogTable = true;
      let params = {
        params: {
          activityId: this.quan.activityId,
          userId: userId,
          type: type
        }
      };
      api.ActivityvoteRecordsDetail(params).then(response => {
        console.log("评分详情列表", response);
        this.gridData = response.data.data[1];
        console.log("评分详情列表123456", this.gridData);
      });
    },
    FormVisible: function (scope) {
      this.list = scope.row.socre
      this.dialogTable = false;
      this.dialogFormVisible4 = true;

      // console.log(scope)
    },
    // 修改 
    queding: function (scope) {
      this.dialogFormVisible4 = false;

      console.log(scope)
      let params = {
        params: {
          activityId: this.quan.activityId,
          userId: userId,
          type: type
        }
      };

    },
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-submenu__title {
  font-weight: bold !important;
  font-size: 18px !important;
}

.el-table__header-wrapper {
  font-size: 16px;
}
</style>
