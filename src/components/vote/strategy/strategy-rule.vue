<template>
<div>
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
</div>
</template>


<script>

export default {
  name: 'strategy-info',
  data() {
    return {
      checked: null,
      activity: {},
      dialogTableVisible: false,
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
