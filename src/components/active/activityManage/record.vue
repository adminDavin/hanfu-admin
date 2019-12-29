<template>
  <div>
    <el-table :data="recordHistory" style="margin-top: 20px;width: 80%;margin-left: -22px;" title="投票记录列表">
      <el-table-column label="序列号" align="center" width="200" type="index"></el-table-column>
      <el-table-column label="推举人" align="center" width="200" prop="voteName" v-if="detaildata.activiyType=='election'"></el-table-column>
      <el-table-column label="评委" align="center" width="200" prop="eceltedName" v-if="detaildata.activiyType=='score'"></el-table-column>
      <el-table-column label="投票者" align="center" width="200" prop="eceltedName" v-if="detaildata.activiyType=='praise'"></el-table-column>
      <el-table-column label="评分" align="center" width="200" prop="totalScore" v-if="detaildata.activiyType=='score'"></el-table-column>
      <el-table-column label="线上评分" align="center" width="200" prop="onlineScore" v-if="detaildata.activiyType=='score'"></el-table-column>
      <el-table-column label="线下评分" align="center" width="200" prop="offlineScore" v-if="detaildata.activiyType=='score'"></el-table-column>
      <el-table-column label="投票人數" align="center" width="200" prop="totalScore" v-if="detaildata.activiyType=='praise'"></el-table-column>
      <el-table-column label="投票人" align="center" width="200" v-if="detaildata.activiyType=='praise'">
        <template slot-scope="scope">
          <el-button type="text" @click="RecordsDetail(scope.row.userId)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="打分人数" align="center" width="200" prop="voteCount" v-if="detaildata.activiyType=='score'"></el-table-column>
      <el-table-column label="操作" align="center" width="200" v-if="detaildata.activiyType=='score'">
        <template slot-scope="scope">
          <el-button type="text" @click="Detail(scope.row.userId,0)">线上</el-button>
          <el-button type="text" @click="Detail(scope.row.userId,1)">线下</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="选手姓名" align="center" width="200" prop="eceltedName"></el-table-column> -->
      <!-- <el-table-column label="添加时间" align="center" width="200" prop="voteTimes"></el-table-column> -->
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :data="gridData">
        <el-table-column property="voteRealName" label="真实名称"></el-table-column>
        <el-table-column property="voteNickName" label="微信名称"></el-table-column>
        <el-table-column property="totalScore" label="投票数"></el-table-column>
        <el-table-column property="voteTimes" label="日期"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="收货地址" :visible.sync="dialogTable">
      <el-table :data="gridData">
        <el-table-column property="voteRealName" label="评委"></el-table-column>
        <el-table-column property="voteNickName" width="90" label="微信名称"></el-table-column>
        <el-table-column property="socre[0]" label="A">
          <input type="text" />
        </el-table-column>
        <el-table-column property="socre[1]" label="B"></el-table-column>
        <el-table-column property="socre[2]" label="C"></el-table-column>
        <el-table-column property="socre[3]" label="D"></el-table-column>
        <el-table-column property="socre[4]" label="E"></el-table-column>
        <el-table-column property="socre[5]" label="F"></el-table-column>
        <el-table-column property="socre[6]" label="G"></el-table-column>
        <!-- <el-table-column label="操作" align="center" v-if="detaildata.activiyType=='score'">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
            </template>
          </el-table-column>-->
        <el-table-column label="操作" align="center" width="200" v-if="detaildata.activiyType=='score'">
          <template slot-scope="scope">
            <el-button type="text" @click="FormVisible(scope)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column property="totalScore" label="合计"></el-table-column>
        <el-table-column property="voteTimes" width="170" label="时间"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogFormVisible4">
      <el-form :model="list">
        <el-form-item label="A" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="B" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="C" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </div>
    </el-dialog>

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
