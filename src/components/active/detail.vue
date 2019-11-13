<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">

      <el-select v-model="value" placeholder="请选择策略规则" @change="getData()">
        <el-option v-for="(item,index) in rules" :key="index" :value="item.ruleName">
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="请选择策略" @change="getDataStary()">
        <el-option v-for="(item,index) in staryData" :key="index" :value="item.strategyName">
        </el-option>
      </el-select>
      <el-button type="primary" @click="setActivityRules">设置活动规则</el-button>
    </div>
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
        staryData:[],
        ruleData:{},
        rules: [],
        id: '',
        collapse: false,
        selectedStone: 1,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1:''
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.ruleData.activityId=this.$route.query.id;
      this.getRule();
      this.getstaryData();
    },
    methods: {
      getDataStary:function(){
        let obj = {};
        obj = this.staryData.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.strategyName == this.value1) {
           return item;
          }
        });
         this.ruleData.strategyId=obj.id;
         console.log( this.ruleData.strategyId);
      },
      getData:function(){
        let obj = {};
        obj = this.rules.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.ruleName == this.value) {
           return item;
          }
        });
        // 活动策略里的规则id
         this.ruleData.ruleId = obj.id;
         this.ruleData.ruleName=obj.ruleName;
         this.ruleData.ruleSDesc=obj.ruleDesc;
         this.ruleData.ruleValue=obj.ruelValueType;
      },
      selectedStoneHandler(res) {
        this.selectedStone = res;
      },
      setActivityRules: function() {
        console.log(this.ruleData);
        api.setActivityRules(this.ruleData).then(response => {
          console.log('设置活动规则',response);
          if(response.status==200){
            this.$message({
              message: "提交成功",
              type: "success"
            });

          }
           this.$router.push({name:'activeIndex'});
        })
      },
      //获取活动规则
      getstaryData: function() {
        api.getStrategy().then(response => {
          console.log('获取策略', response);
          this.staryData = response.data.data;
        })
      },
      getRule: function() {
        api.getStrategyRule(this.ruleData).then(response => {
          console.log('活动策略规则', response);

          this.rules = response.data.data;
        })
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
