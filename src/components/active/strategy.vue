<template>
  <div class="wrapper">
    <img src="../../img/back.png" style="width:25px;height:25px;margin-left: 35px;margin-top: 30px;" @click="back"   alt="">
   <!-- <v-head></v-head>
    <v-sidebar></v-sidebar> -->
    <!-- <div class="content-box" :class="{'content-collapse':collapse}"> -->
    <el-form :inline="true" :model="detaildata" class="demo-form-inline" style="font-size: 12px;height:36px; margin-left: 50px;
    margin-top: 30px;border-bottom:1px solid #00D1B2;" label="活动详情">
      <el-form-item  label="">
       <template slot-scope="scope">
         <div style="display: flex;font-size: 15px;font-weight: 500;">
           <div style="font-size: 15px;">
             活动名称:
           </div>
           <div >{{detaildata.activityName}}</div>
         </div>
       </template>
        <!-- <el-input v-model="" :disabled="true"   placeholder="审批人"></el-input> -->
      </el-form-item>

     <!-- <el-form-item  label="">
        <div style="display: flex;font-size: 15px;font-weight: 500;">
          <div>
            活动描述:
          </div>
          <div>{{detaildata.activityDesc}}</div>
        </div>


      </el-form-item> -->

     <!-- <el-form-item  label="">
        <div style="display: flex;font-size: 15px;font-weight: 500;">
          <div>
            活动状态:
          </div>
          <div>{{detaildata.activityStatus}}</div>
        </div>

      </el-form-item> -->

     <!-- <el-form-item  label="">
        <div style="display: flex;font-size: 15px;font-weight: 500;">
          <div>
            活动类型:
          </div>
          <div>{{detaildata.activiyType}}</div>
        </div>

      </el-form-item> -->

      <el-form-item  label="">
        <div style="display: flex;font-size: 15px;font-weight: 500;">
          <div>
            创建时间:
          </div>
          <div>{{detaildata.createTime}}</div>
        </div>
         <!-- <div>{{detaildata.createTime}}</div> -->
        <!-- <el-input v-model="detaildata.createTime" :disabled="true"  placeholder="审批人"></el-input> -->
      </el-form-item>
    </el-form>
    <div style="padding: 10px 20px 0 40px; display: flex;" >
      <div style="width: 40%;">
        <div style="align-items: center;margin-top: 45px;">
          <div style="margin-left: 9px;font-weight: bold;font-size: 20px;">活动规则</div>
          <div style="float: right;margin-right: 60px;">
            <el-form :inline="true"  label-width="80px" :rules="VictoryRules" ref="jinji" :model="countData">
               <el-form-item label="设置晋级者人数" prop="count" label-width="120px">
                 <el-input v-model="countData.count" auto-complete="off" type="number"></el-input>
               </el-form-item>
               <el-form-item   label-width="120px">
                <template>
                  <el-button type="primary" @click="subVictory" >提交</el-button>
                </template>
               </el-form-item>
            </el-form>
          </div>

        </div>



        <el-table :data="StrategyRule" style="margin-top: 40px;margin-left: -21px;" height="500" title="规则列表" @row-click="handleSelectionChange1">
         <!-- <el-table-column label="" width="65" fixed  label="单选">
            <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="templateRadio"  @change="getTemplateRow(scope.row)"></el-radio>
            </template>
          </el-table-column> -->
          <el-table-column type="index" label="序号"  fixed width="120" align="center" >
           </el-table-column>
         <el-table-column prop="id" style="background: #000;" label="规则编号"  fixed width="120" align="center" >
          </el-table-column>
          <el-table-column prop="ruleName" label="规则名称"  width="120" align="center" >
          </el-table-column>
          <el-table-column prop="ruleStatus" label="规则状态" width="150" align="center" >
          </el-table-column>
          <el-table-column prop="ruleDesc" label="规则描述" width="150" align="center">
          </el-table-column>
          <el-table-column  label="人数上限" width="200" align="center"  >
           <template slot-scope="scope" v-if="scope.row.ruleValueType=='user_list'">
              <el-input size="small" v-model="scope.row.ruleValue"  placeholder="请输入内容" @change="edit(scope.row.id,scope.row.ruleValue)"
                style="text-align:center; vertical-align:middel;text-align: center;"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="ruleValueType"    label="规则值类型" width="200" align="center">

          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"  width="200" align="center">
          </el-table-column>

        </el-table>
        <el-dialog title="修改活动" :visible.sync="editFormVisible" :close-on-click-modal="false">
          <el-form :inline="true" :model='editForm' label-width="80px" :rules="bianRules" ref="addForm">
            <el-form-item label="规则值" prop="ruleType" label-width="120px">
              <el-input v-model="editForm.ruleType" auto-complete="off" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible=false">取消</el-button>
            <el-button type="primary" @click="addjiSubmit">提交</el-button>
          </div>
        </el-dialog>
      </div>


        <div style="width: 50%;margin-left: 20px;">

          <el-form :inline="true" :data='multipleSelection1'  :rules="bianRules1" ref="addForm1" style="margin-top: 45px;">
            <el-form-item  prop="ruleType">
               <div style="font-weight: bold;font-size: 20px;margin-left: 31px;">参选人</div>
            </el-form-item>

            <el-form-item label="规则编号:" prop="ruleType" label-width="120px" style="margin-left:16px;">
              <div>
                {{bianid}}
              </div>
            </el-form-item>
            <el-form-item label="规则名称:" prop="ruleType" label-width="120px" style="margin-left: 32px;">
              <div>
                {{ruleName}}
              </div>

            </el-form-item>
            <el-form-item label="规则值:" prop="ruleType" label-width="120px" style="margin-left: 24px;">
              <div>
                {{ruleValue}}
              </div>
            </el-form-item>

             <el-button type="primary" style="float:right;margin-right: 15px;" @click="shezhi"  >设置活动的参选者</el-button>
          </el-form>


           <!-- <div style="margin-left: 20px;margin-top: 30px;">参选人</div> -->
          <el-table :data="persondata" style="margin-top: 1px;margin-left: 20px;" title="用户列表" height="500" @selection-change="handleSelectionChange2">

            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="birthDay"   label="参与人" width="100" fixed align="center">
              <template slot-scope="scope">
                  <span v-if="!scope.row.isElected">投票人</span>
                  <span v-if="scope.row.isElected">被投票人</span>
              </template>
            </el-table-column>
            <el-table-column label="邀请码" width="130" fixed align="center" prop="code" >
            </el-table-column>
            <el-table-column prop="" label="所持票数" width="100" align="center" v-if="type=='ticket_count'">
             <template slot-scope="scope">
                  <span v-if="scope.row.count">{{scope.row.count}}</span>
                  <span v-if="!scope.row.count">--</span>
              </template>
            </el-table-column>

            <el-table-column prop="nickName" label="用户名"  width="300" align="center" >
            </el-table-column>
            <el-table-column prop="userStatus" label="用户状态" width="300" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="120" align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="120" align="center">
            </el-table-column>
            <el-table-column prop="birthDay" label="生日" width="300" align="center">
            </el-table-column>


            <el-table-column label="操作" width="230" align="center" fixed="right">
              <template slot-scope="scope">
                  <el-button type="primary" @click="ma1(scope.row.id)" size="mini"  v-if="scope.row.isElected==false">生成参与码</el-button>
                  <el-button type="danger" size="mini" @click="deleteperson(scope.row.id)">删除</el-button>
               </template>

            </el-table-column>
          </el-table>
          <div style="overflow: hidden;">
            <el-button type="danger"  @click="deleteperson1()" style="float: right;margin-top: 20px;">批量删除参与人</el-button>
            <el-button type="primary" @click="ma()" style="float: right;margin-right: 10%;margin-top: 20px;" v-if="type!='election'">批量生成参与码</el-button>
          </div>

          <el-dialog title="所有人员" :visible.sync="ren" :close-on-click-modal="false">
            <el-table :data="rewardData" style="width:80%;margin-top: 30px;margin-left: 20px;" title="用户列表" height="300" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="nickName" label="用户名" fixed width="300" align="center">
              </el-table-column>
              <el-table-column prop="userStatus" label="用户状态" width="300" align="center">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="120" align="center">
              </el-table-column>
              <el-table-column prop="address" label="地址" width="120" align="center">
              </el-table-column>
              <el-table-column prop="birthDay" label="生日" width="150" align="center">
              </el-table-column>

            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button  type="primary" style="float: left;margin-left: 10px;"  @click="person">添加为参与者</el-button>
              <el-button @click="ren=false">取消</el-button>
              <!-- <el-button type="primary">提交</el-button> -->
            </div>
          </el-dialog>


        </div>



   </div>
    <!-- </div> -->

  </div>
</template>

<script>
  import vSidebar from '@/components/common/sidebar.vue';
  import vHead from '@/components/common/header.vue';
  import api from '@/apis/voteApi.js';
  export default {
    name: 'store',
    components: {
      vHead,
      vSidebar
    },
    data() {
      return {
        countData:{},
        type:'',
        id:'',
        datalist2:[],
        multipleSelection2:[],
        persondata:[],
        detaildata:{},
        bianid:'规则编号',
        ren:false,
        ruleValue1:1,
        ruleValue:'规则值',
        ruleName:'规则名',
        activeid:'',
        VictoryRules:{
          count: [{
            required: true,
            message: "填写晋级人数",
            trigger: "blur"
          }]
        },
        bianRules1: {
          ruleType: [{
            required: true,
            message: "填写规则值",
            trigger: "blur"
          }]
        },

        datalist:{},
        multipleSelection1:[],
         multipleSelection: [],
        templateRadio:'',
        templateSelection: {},
        bianRules: {
          ruleType: [{
            required: true,
            message: "填写规则值",
            trigger: "blur"
          }]
        },
        editForm: {},
        editFormVisible: false,
        ruleType: '',
        StrategyRule: [],
        collapse: false,
        selectedStone: 1,
        rewardData: [],
        strategyType:[]
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.activeid = this.$route.query.active;
      this.countData.activityId=this.$route.query.active;
      this.type=this.$route.query.type;
      this.datalist.activityId = this.$route.query.active;
      this.datalist2.activityId = this.$route.query.active;
      console.log(this.datalist.activityId);


      this.getStrategyRule(this.activeid );
      this.userlist();
      this.getDetail();
      this.getPerson();
      this.getStrategyType();


    },
    methods: {
      back:function(){
        this.$router.push({
          name: 'activeIndex'

        });
      },
      deleteperson1: function() {
        if (!this.datalist2.userIds) {
          this.$message({
            showClose: true,
            message: '请勾选参与人'
          });
          return
        }

        this.$confirm("确认删除吗？", "提示", {}).then(() => {

            let param={
              id: this.datalist2.userIds,
              activityId:this.activeid
            }
            console.log(param)
            api.deleteperson(param).then(response => {
              console.log('删除人', response);
              if (response.status === 200) {

                this.$message({
                  message: "删除成功",
                  type: "success"
                });
               this.getPerson();

              } else {
                this.$message({
                  message: "删除失败",
                  type: "success"
                });
              }
            })
        });

      },
 // 删除人
      deleteperson: function(id) {
      this.$confirm("确认删除吗？", "提示", {}).then(() => {
          console.log(id);
          let param={
            id: id,
            activityId:this.activeid
          }
          console.log(param)
          api.deleteperson(param).then(response => {
            console.log('删除人', response);
            if (response.status === 200) {

              this.$message({
                message: "删除成功",
                type: "success"
              });
             this.getPerson();

            } else {
              this.$message({
                message: "删除失败",
                type: "success"
              });
            }
          })
      });
    },
    subVictory:function(){
      console.log(this.countData);
      this.$refs.jinji.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            // this.addLoading = true;
            console.log(this.countData);

            api.VictoryCount(this.countData).then(response => {
              console.log(response)
              if (response.status === 200) {

                this.$message({
                  message: "提交成功",
                  type: "success"
                });

              } else {
                this.$message({
                  message: "提交失败",

                });


              }
            });
          });
        }
      });

    },
		getStrategyType: function() {
		  api.getStrategyType().then(response => {
		    console.log('规则值类型', response);
        this.strategyType=response.data.data;

		  })
		},
    // creatrCode
      getPerson: function() {
        api.getPerson(this.activeid).then(response => {
          console.log('参与人', response);
          this.persondata = response.data.data;
        })
      },
      getDetail: function() {
        console.log(this.activeid)
        api.getActivityDetail(this.activeid).then(response => {
          console.log('活动详情', response);
          this.detaildata = response.data.data;
          if(this.detaildata.activityStatus){
            this.countData.count=this.detaildata.activityStatus;
          }else{
             this.countData.count=0;
          }

        })
      },


      shezhi:function(){
        this.ren=true;
      },
     isNumber: function (val) {
          var regPos = /^\d+(\.\d+)?$/; //非负浮点数
          var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
          if(regPos.test(val) || regNeg.test(val)) {
              return true;
              } else {
              return false;
              }
          },
      // 设置活动参与者
      person: function() {
        if (!this.datalist.userIds) {
          this.$message({
            showClose: true,
            message: '请在下方用户列表勾选参与人'
          });
          return
        }

        if (!this.datalist.ruleId ) {
          this.$message({
            showClose: true,
            message: '请选择策略规则'
          });
          return
        }
       console.log(this.ruleValue1)
        if (!this.isNumber(this.ruleValue1)) {
          this.$message({
            showClose: true,
            message: '规则值请设置为整数'
          });
          return
        }
        console.log(this.datalist)
        api.addpreson(this.datalist).then(response => {
           console.log(this.datalist.userIds)
          console.log('设置活动参与者', response);
          if(response.data.data=="超过限定人数"){
            this.ren=false;
            this.$message({
              message: "超过限定人数,不能在选择此规则",

            });
           return;
            // api.setActivityRules(this.datalist.userIds).then(response => {
            //   console.log('码', response);
            //   this.$message({
            //     message: "设置成功",
            //     type: "success"
            //   });
            //   // this.rules = response.data.data;
            // })
          }
          if(response.status==200){
            this.ren=false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
              this.getStrategyRule(this.activeid );
            this.getPerson();
            this.multipleSelection = [];
            // api.setActivityRules(this.datalist.userIds).then(response => {
            //   console.log('码', response);
            //   this.$message({
            //     message: "设置成功",
            //     type: "success"
            //   });
            //   // this.rules = response.data.data;
            // })
          }
          // this.rules = response.data.data;
        })
      },
      ma1: function(ids) {
        var arr =[];
        arr.push(ids)
        let arr1={
           activityId:this.activeid,
           id:arr,
           activityId:this.datalist2.activityId

        }

        api.creatrCode(arr1).then(response => {
          console.log('码', response);
          this.$message({
            message: "提交成功",
            type: "success"
          });
            this.getPerson();
          // this.rules = response.data.data;
        })
      },
      // 批量生成邀请码
      ma: function() {

        if (!this.datalist2.userIds) {
          this.$message({
            showClose: true,
            message: '请在下方用户列表勾选参与人'
          });
          return
        }

        let arr1={
           id:this.datalist2.userIds,
           activityId:this.datalist2.activityId

        }
        console.log(arr1)
        api.creatrCode(arr1).then(response => {
          console.log('码', response);
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getPerson();
          // this.rules = response.data.data;
        })
      },
      handleSelectionChange1(val) {

        this.multipleSelection1 = val;
        this.bianid= this.multipleSelection1.id;
        this.ruleValue=this.multipleSelection1.ruleValue;
        this.ruleName= this.multipleSelection1.ruleName;
        this.ruleValue1=this.multipleSelection1.ruleValue;
        this.datalist.ruleId= this.multipleSelection1.id;
        console.log(this.datalist.ruleId);
        console.log(this.multipleSelection1)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        let arr = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].id)
        }
        console.log(arr);
        this.datalist.userIds = arr;
      },
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
        console.log(this.multipleSelection2);
        let arr = [];
        for (var i = 0; i < this.multipleSelection2.length; i++) {
          arr.push(this.multipleSelection2[i].id)
        }
        console.log(arr);
        this.datalist2.userIds = arr;
      },
      getTemplateRow(row) { //获取选中数据
        this.templateSelection = row;
        this.ruleName=row.ruleName
        this.datalist.ruleId= this.templateSelection.id;

        console.log(this.templateSelection.ruleName)
      },
      userlist: function() {
        api.getuser().then(response => {
          console.log('用户列表', response);
          this.rewardData = response.data.data;
        })
      },
      // 添加策略
      addjiSubmit: function() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              // this.addLoading = true;
              console.log(this.editForm);

              api.updateStrategyRule(this.editForm).then(response => {
                console.log(response)
                if (response.status === 200) {

                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.editFormVisible = false;
                  this.getStrategyRule(this.id);

                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });

                  this.editFormVisible = false;
                }
              });
            });
          }
        });
      },
      // // 添加策略
      // addjiSubmit: function(){
      //   this.$refs.addForm.validate(valid => {
      //     if (valid) {
      //       this.$confirm("确认提交吗？", "提示", {}).then(() => {
      //         // this.addLoading = true;
      //         console.log(this.addForm);

      //         api.addStrategy(this.addForm).then(response => {
      //           console.log(response)
      //           if (response.status === 200) {

      //             this.$message({
      //               message: "提交成功",
      //               type: "success"
      //             });
      //              this.getStrategy();
      //             this.addeditFormVisible = false;
      //           } else {
      //             this.$message({
      //               message: "提交失败",
      //               type: "success"
      //             });

      //             this.addFormVisible = false;
      //           }
      //         });
      //       });
      //     }
      //   });


      // },
      updateStrategyRule: function(id) {
        console.log(id);
        this.editFormVisible = true;
        this.editForm.id = id;
      },

      selectedStoneHandler(res) {
        this.selectedStone = res;
      },


      // 改下面得
      edit:function(id,row){
         console.log(id,row)
         // fd.append('ruleType ', params.ruleType);
         // fd.append('id ', params.id);
         let aa={
           ruleValue :row,
           activityId:this.activeid,
           ruleInstanceId:id
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
      // 获取策略
      getStrategy: function() {

        api.getStrategy().then(response => {
          console.log('获取策略',response);
          this.strategyData = response.data.data;
        })
      },
      //获取策略规则
      getStrategyRule: function(id) {
        this.ruletost=true;
        console.log(id);
        api.getStrategyRuleByActive(id).then(response => {
          console.log('获取策略规则',response);
          this.StrategyRule = response.data.data;
        })
      },

       // 添加策略规则
       addRule:function(){
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
       addcerule: function(id){
         console.log(id)
         this.addrule.strategyId=id;
         this.addeditFormVisiblerule=true;
       },
       addStrategy: function(){
         this.addeditFormVisible=true;
       }


    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
