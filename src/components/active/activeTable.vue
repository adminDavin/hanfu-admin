<template>
  <div>
    <el-button type="success" @click="addStrategy" style="margin-top: 20px;margin-left: 20px;">添加活动</el-button>


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
            <el-option v-for="item in strategyData" :label="item.strategyName" :value="item.strategyName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addeditFormVisible=false">取消</el-button>
        <el-button type="primary" @click="addjiSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->

    <el-table :data="activeData" style="width: 100%;margin-top: 30px;" >
      <el-table-column prop="activityName" label="活动名称" fixed width="120" align="center">
      </el-table-column>
      <el-table-column  prop="activityDesc" label="活动描述" width="150" align="center">
      </el-table-column>

      <el-table-column prop="activityStatus" label="活动状态" width="120" align="center">
      </el-table-column>
      <el-table-column prop="activiyType" label="活动类型" width="120" align="center">
      </el-table-column>
      <el-table-column prop="strategyId" label="活动策略" width="300" align="center">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import api from '@/apis/voteApi.js';
  export default {

    data() {
      return {
        activeData:[],
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
        tableData: []
      }
    },
    mounted() {
      this.getStrategy();
      this.getActive();
    },
    methods: {

      getActive:function(){
        api.getActivity().then(response => {
          console.log('活动列表',response);
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
          console.log('获取策略',response);
          this.strategyData = response.data.data;
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
