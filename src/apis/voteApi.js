import Axios from "axios";

// 添加奖品
function addWard(params) {
  console.log(1111);
  console.log(params)
  let fd = new FormData();
  console.log(params.awardName,params.empNum)
  fd.append('awardName', params.awardName);
  fd.append('empNum', params.empNum);
  return Axios.post("/api/users/addAwardInfo", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 添加奖品
function getDepartment(params) {
  //   let params = {
  //     params: {
  //       id: 192,

  //     }
  //   }

  return Axios.get("/api/users/getEmpAllDept");
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

function addStrategy(params) {

  let fd = new FormData();
  fd.append('id', 1);
  fd.append('userId', 1);
  fd.append('strategyDesc', params.strategyDesc);
  fd.append('strategyName', params.strategyName);
  // fd.append('strategyStatus', params.strategyStatus);
  fd.append('strategyType', params.strategyType);
  return Axios.post("/api/activity/addActivityStrategy", fd, { responseType: 'arraybuffer' });

}
// 添加策略规则

function addStrategyRule(params) {
console.log(params);
  let fd = new FormData();
  fd.append('id', 1);
  fd.append('requestId', 1);
  fd.append('ruleDesc', params.ruleDesc);
  fd.append('ruleName', params.ruleName);
  fd.append('ruleStatus', params.ruleStatus);
  fd.append('ruleType', params.ruleType);
  fd.append('ruleValueType', params.ruleValueType);
  fd.append('strategyId', params.strategyId);
  return Axios.post("/api/wareHouse/addStrategyRule", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

// 删除活动策略
function deleteActivityStrategy(params) {
  let fd = new FormData();
  fd.append('activityStrategyId', params.id);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/activity/deleteActivityStrategy", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除策略规则
function deleteStrategyRule(params) {
  let fd = new FormData();
  fd.append('strategyRuleId', params.id);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/strategy/deleteStrategyRule", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
//获取投票结果
function getResult(params) {
  // let fd = new FormData();
  // fd.append('activityId', params.activityId);
  // fd.append('ruleId', params.ruleId);
  // fd.append('strategyId', params.strategyId);
  // fd.append('ruleName', params.ruleName);
  // fd.append('ruleSDesc', params.ruleSDesc);
  // fd.append('ruleValue', params.ruleValue);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/wareHouse/statisticsTicket", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 设置活动规则

function setActivityRules(params) {
  let fd = new FormData();
  console.log(params)
  fd.append('activityId', params.activityId);
  fd.append('ruleId', params.ruleId);
  fd.append('strategyId', params.strategyId);
  // fd.append('ruleName', params.ruleName);
  // fd.append('ruleSDesc', params.ruleSDesc);
  // fd.append('ruleValue', params.ruleValue);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/wareHouse/addActivityUser", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除活动
function deleteActivity(params) {
  let fd = new FormData();
  fd.append('activityId ', params.id);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/activity/deleteActivity", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

function getActivityDetail(id) {
    let params = {
      params: {
        activityId: id,
      }
    }
  return Axios.get("/api/wareHouse/findActivityResult",params);
}
function addActivity(params) {
console.log(params)
  let fd = new FormData();
  fd.append('activityDesc ', params.activityDesc);
  fd.append('activityName ',  params.activityName);
  fd.append('activityDesc', params.activityDesc );
  fd.append('activiyType', params.activiyType);
  fd.append('activityStatus', params.activityStatus);
  fd.append('userId', 1);
  fd.append('strategyId', params.strategyId);
  return Axios.post("/api/wareHouse/addActivity", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 获取用户列表
function getuser(params) {
  return Axios.get("/user/user/userList");
}
// 修改规则值

function creatrCode(params) {
  console.log(params)
  let fd = new FormData();
  fd.append('usersId', params.id);
  fd.append('activityId', params.activityId);
  return Axios.post("/api/wareHouse/creatrCode", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
function updateStrategyRule(params) {

  let fd = new FormData();
  fd.append('ruleType ', params.ruleType);
  fd.append('id ', params.id);
  return Axios.post("/api/strategy/updateStrategyRule", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
//查询活动
function getActivity() {
  return Axios.get("/api/activity/listActivity");
}
//获取参与人
function getPerson(id) {
  let params = {
    params: {
      activityId: id,
    }
  }
  return Axios.get("/api/wareHouse/listActivityUser",params);
}

// 获取策略
function getStrategy() {

  return Axios.get("/api/activity/listActivityStrategy");

}
// 获取活动实体规则
function getActiveShi() {

  return Axios.get("/api/activity/listActivityStrategyInstance");

}
// 获取策略规则
function getStrategyRule(id) {

    let params = {
      params: {
        strategyId: id,

      }
    }

  return Axios.get("/api/wareHouse/findStrategyRule", params);
}

// 添加活动的参与者
function addpreson(params) {
console.log(params)
  let fd = new FormData();
  fd.append('activityId ', params.activityId);
  fd.append('ruleId ',  params.ruleId);
  fd.append('userIds', params.userIds);

  // fd.append('empNum', params.empNum);
  return Axios.post("/api/wareHouse/addActivityUser", fd);
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

//统计投票结果
function count(params) {

  let fd = new FormData();
  fd.append('activityId ', params.activityId);
  fd.append('ruleId ',  params.ruleId);
  fd.append('ruleInstanceId', params.ruleInstanceId );
  fd.append('userIds', params.userIds);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/wareHouse/statisticsTicket", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// function bianProduct() {
//   let fd = new FormData();
//   fd.append('id', 1);
//   fd.append('productDesc',1);
//   return Axios.post("/api/product/updateProductId", fd, { responseType: 'arraybuffer' });
// }
// function addProduct1() {
//   let fd = new FormData();
//   fd.append('bossId', 1);
//   fd.append('brandId', 1);
//   fd.append('hfName', 1);
//   fd.append('categoryId', 1);
//   fd.append('productDesc', 1);
//   // fd.append('hfName', params.hfName);
//   return Axios.post("/api/product/addproduct", fd, { responseType: 'arraybuffer' });
// }
//查看订单详情
// function orderDetail(id) {
//   let params = {
//     params: {
//       id: 192,

//     }
//   }
//   return Axios.get("/order/order/queryDetail", params);
// }
export default {
   addActivity:addActivity,
   addWard:addWard,
   getDepartment:getDepartment,
   addStrategy:addStrategy,
   getStrategy:getStrategy,
   getActivity:getActivity,
   addStrategyRule:addStrategyRule,
   getuser:getuser,
   deleteActivity:deleteActivity,
   getStrategyRule:getStrategyRule,
   deleteStrategyRule:deleteStrategyRule,
   deleteActivityStrategy:deleteActivityStrategy,
   setActivityRules:setActivityRules,
   getActiveShi:getActiveShi,
   addpreson:addpreson,
   count:count,
   updateStrategyRule:updateStrategyRule,
   getActivityDetail:getActivityDetail,
   creatrCode:creatrCode,
   getPerson:getPerson
};
