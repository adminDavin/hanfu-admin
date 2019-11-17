<template>
<el-container>
  <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="活动编号"><span>{{this.activity.id}}</span></el-form-item>
      <el-form-item label="活动名称"><span>{{this.activity.id}}</span></el-form-item>
      <el-form-item label="活动类型"><span>{{this.activity.id}}</span></el-form-item>
      <el-form-item label="活动状态"><span>{{this.activity.id}}</span></el-form-item>
      <el-form-item label="活动描述"><span>{{this.activity.id}}</span></el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="6">
        <h3>活动策略描述 {{this.activity.id}}</h3>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="活动策略编号"><span>{{this.activity.id}}</span></el-form-item>
          <el-form-item label="活动策略名称"><span>{{this.activity.id}}</span></el-form-item>
          <el-form-item label="活动策略类型"><span>{{this.activity.id}}</span></el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" highlight-current-row="" tooltip-effect="dark" style="width: 100%" @row-click="handleSelectionChange">
          <el-table-column label="规则名称">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="规则类型">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="16">
        <h3>策略规则描述 {{this.currentRule.id}}</h3>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="策略规则编号"><span>{{this.currentRule.date}}</span></el-form-item>
          <el-form-item label="策略规则名称"><span>{{this.currentRule.date}}</span></el-form-item>
          <el-form-item label="策略规则值">
            <el-input placeholder="规则值"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogTableVisible = true">设置活动参与者</el-button>
          </el-form-item>
        </el-form>
        <StrategyRule :activity="this.activity" :strategyRule="this.currentRule"></StrategyRule>
      </el-col>
    </el-row>
    <el-dialog title="设置活动参与者" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
       <el-button type="primary">添加为参与者</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</el-container>
</template>

<style scoped>
.el-table__body tr.current-row>td {
  background-color: #fdf3ea;
  color: #f19944;
}
</style>

<script>
import StrategyRule from './strategy-rule';

export default {
  name: 'strategy-info',
  components: {
    StrategyRule
  },
  data() {
    return {
      checked: null,
      activity: {},
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        checked: false
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        checked: false
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        checked: false
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        checked: false
      }],
      currentRow: null,
      currentRule: {
        id: 1,
        name: '规则名称'
      },
      multipleSelection: {}
    }
  },
  methods: {
    setActivityUser() {

    },
    openSetActivityUserModal() {
      dialogTableVisible = true;
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    getCurrentRule(val) {
      this.currentRule = val;
    },
    handleSelectionChange(row) {
      this.currentRule = row;
    }

  },
  created() {
    let params = this.$route.params;
    this.activity.id = params.activity;
  }
}
</script>
