<template>
<el-container>
  <el-main>
    <el-button type="text" @click="dialogFormVisible = true">添加活动</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column prop="activityName" label="序列号">
      </el-table-column>
      <el-table-column label="活动名称">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="activityDesc" label="活动描述">
      </el-table-column>
      <el-table-column prop="activityStatus" label="活动状态">
      </el-table-column>
      <el-table-column prop="activiyType" label="活动类型">
      </el-table-column>
      <el-table-column label="活动策略">
        <template slot-scope="scope">
          <el-button type="info" @click="toStrategy(scope.row)">{{ scope.row.strategyName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="createTime" label="创建人">
      </el-table-column>
      
      <el-table-column prop="createTime" label="创建人">
        <template slot-scope="scope">
          <el-button type="info" @click="toActivity(scope.row)">{{ "活动详情" }}</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-main>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        strategyId: 1,
        activityId: 1,
        strategyName: '选举策略1'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        strategyId: 2,
        activityId: 2,
        strategyName: '选举策略2'

      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        strategyId: 3,
        activityId: 3,
        strategyName: '选举策略3'

      }],
      currentRow: null,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    toStrategy(row) {
      console.log(row.strategyId);
      console.log("/vote/activity/" + row.activityId + "/activity");
      this.$router.push({
        path: "/vote/activity/" + row.activityId + "/strategy"
      });
    },
    toActivity(row) {
      console.log(row.strategyId);
      console.log("/vote/activity/" + row.activityId + "/activity");
      this.$router.push({
        path: "/vote/activity/" + row.activityId + "/activity"
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
}
</script>
