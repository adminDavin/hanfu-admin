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
  fd.append('strategyStatus', params.strategyStatus);
  fd.append('strategyType', params.strategyType);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/activity/addActivityStrategy", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 添加策略规则
function addStrategyRule(params) {

  let fd = new FormData();
  fd.append('id', 1);
  fd.append('requestId', 1);
  fd.append('ruleDesc', params.ruleDesc);
  fd.append('ruleName', params.ruleName);
  fd.append('ruleStatus', params.ruleStatus);
  fd.append('ruleType', params.ruleType);
  fd.append('ruleValueType', params.ruleValueType);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/activity/addActivityStrategy", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
function addActivity(params) {

  let fd = new FormData();
  fd.append('activityDesc ', params.activityDesc);
  fd.append('activityName ',  params.activityName);
  fd.append('strategyDesc', params.activityName );
  fd.append('strategyName', params.strategyName);
  fd.append('strategyStatus', params.strategyStatus);
  fd.append('strategyType', params.strategyType);
  // fd.append('empNum', params.empNum);
  return Axios.post("/api/activity/addActivity", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 获取用户列表
function getuser(params) {
  return Axios.get("/user/user/userList");
}
//查询活动
function getActivity() {
  return Axios.get("/api/activity/listActivity");
}
// 获取策略
function getStrategy() {

  return Axios.get("/api/activity/listActivityStrategy");

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
   getuser:getuser
};
