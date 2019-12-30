<template>
<el-row>
  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>
  <div style="font-weight: bold;font-size: 18px;margin-left: 10px;">评优事迹</div>
  <el-col :span="6">
    <el-form :inline="true" :model="templateData" ref="addFormRules" :rules="addFormRules" class="demo-form-inline" style=" border-radius:10px;height: 357px; border:1px solid #00D1B2; margin-top: 15px;margin-right: 30px;" label="活动详情">
      <el-form-item label-width="100px">
        <div style="font-size: 20px;text-align: center;">评优事迹:</div>
      </el-form-item>
      <br />
      <el-form-item label="评分项名称" label-width="100px" prop="evaluateType">
        <el-input v-model="templateData.evaluateType" placeholder="评分项名称"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="评分权重" label-width="100px" prop="evaluateWeight">
        <el-input v-model="templateData.evaluateWeight" placeholder="评分权重" type="number"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="备注" label-width="100px" prop="remarks">
        <el-input v-model="templateData.remarks" placeholder="备注"></el-input>
      </el-form-item>
      <br />
      <el-form-item style="margin-top: 20px;margin-left: 19%;">
        <template slot-scope>
          <el-button type="primary" size="medium" style="width: 200px;" @click="add">添加</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="18">
    <el-scrollbar style="height:100%">
      <el-table :data="templatedata" style="margin-top: 20px;margin-left: -22px; overflow:hidden;" title="评分项列表">
        <el-table-column label="操作" width="300" align="center" prop="evaluateTemplateId">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="changeShiji(scope.$index)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteShiji(scope.row.evaluateTemplateId)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateType" label="评分项名称" width="500" align="center"></el-table-column>
        <el-table-column prop="evaluateWeight" label="评分权重" width="150" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="500" align="center"></el-table-column>
      </el-table>
    </el-scrollbar>
  </el-col>
  <el-dialog title="修改评优事迹" :visible.sync="changeSjVisible" :close-on-click-modal="false">
    <el-form :inline="true" :model="changeSjForm" label-width="80px" :rules="changeSjRules" ref="addSjForm">
      <el-form-item label="评分项名称" prop="evaluateType" label-width="120px">
        <el-input v-model="changeSjForm.evaluateType" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="评分权重" prop="evaluateWeight" label-width="120px">
        <el-input v-model="changeSjForm.evaluateWeight" auto-complete="off" type="number"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks" label-width="120px">
        <el-input v-model="changeSjForm.remarks" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeSjVisible=false">取消</el-button>
      <el-button type="primary" @click="changeSjSubmit(changeSjForm)">提交</el-button>
    </div>
  </el-dialog>

</el-row>
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
      activeNames: ['1'],
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
    handleChange(val) {
      console.log(val);
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
        this.gridData = response.data.data[0];
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

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-submenu__title {
  font-weight: bold !important;
  font-size: 18px !important;
}

.el-table__header-wrapper {
  font-size: 16px;
}
</style>
