import Axios from "axios";

// 添加奖品
function addWard (params) {
  console.log(1111);
  console.log(params)
  let fd = new FormData();
  console.log(params.awardName, params.empNum)
  fd.append('awardName', params.awardName);
  fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/users/addAwardInfo", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

function EvaluationTemplate (params) {
  console.log(1111);
  console.log(params)
  let fd = new FormData();
  fd.append('evaluateContent', params.evaluateContent);
  fd.append('evaluateType', params.evaluateType);
  fd.append('evaluateWeight', params.evaluateWeight);
  fd.append('isDeleted', params.isDeleted);
  fd.append('parentTemplateId', params.parentTemplateId);
  fd.append('remarks', params.remarks);

  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/addUserEvaluationTemplate", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

function checkTemplateWeight (data) {
  console.log(data)
  let params = {
    params: {
      activityId: data.activityId,
      type: data.type
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/findEvaluationTemplateWeight", params);
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
function checkTemplateWeight1 (data) {
  console.log(data)
  let params = {
    params: {
      activityId: data.activityId,
      type: data.type
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/findEvaluationTemplateWeight", params);
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 添加奖品
function getDepartment (params) {
  //   let params = {
  //     params: {
  //       id: 192,

  //     }
  //   }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/users/getEmpAllDept");
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除参与人
function deleteperson (num) {
  console.log(num)
  let params = {
    params: {
      userId: num.id,
      activityId: num.activityId,
    }
  }
  console.log(params)
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/deleteActivityUser", params);
}
// 获取规则值类型
function getStrategyType () {

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/listStrategyRule");


}
function addStrategy (params) {

  let fd = new FormData();
  fd.append('id', 1);
  fd.append('userId', 1);
  fd.append('strategyDesc', params.strategyDesc);
  fd.append('strategyName', params.strategyName);
  // fd.append('strategyStatus', params.strategyStatus);
  fd.append('strategyType', params.strategyType);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/addActivityStrategy", fd, { responseType: 'arraybuffer' });

}
// 添加策略规则

function addStrategyRule (params) {
  console.log(params);
  let fd = new FormData();
  // fd.append('id', 1);
  fd.append('requestId', 1);
  fd.append('ruleDesc', params.ruleDesc);
  fd.append('ruleName', params.ruleName);
  fd.append('ruleStatus', params.ruleStatus);
  // fd.append('ruleValue', params.ruleType);//规则值
  fd.append('ruleType', params.ruleValueType);//规则值类型
  fd.append('strategyId', params.strategyId);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/addStrategyRule", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

// 删除活动策略
function deleteActivityStrategy (params) {
  let fd = new FormData();
  fd.append('activityStrategyId', params.id);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/activity/deleteActivityStrategy", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除策略规则
function deleteStrategyRule (params) {
  let fd = new FormData();
  fd.append('strategyRuleId', params.id);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/deleteStrategyRule", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
//获取投票结果
function getResult (params) {
  // let fd = new FormData();
  // fd.append('activityId', params.activityId);
  // fd.append('ruleId', params.ruleId);
  // fd.append('strategyId', params.strategyId);
  // fd.append('ruleName', params.ruleName);
  // fd.append('ruleSDesc', params.ruleSDesc);
  // fd.append('ruleValue', params.ruleValue);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/statisticsTicket", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 设置活动规则

function setActivityRules (params) {
  let fd = new FormData();
  console.log(params)
  fd.append('activityId', params.activityId);
  fd.append('ruleId', params.ruleId);
  fd.append('strategyId', params.strategyId);
  // fd.append('ruleName', params.ruleName);
  // fd.append('ruleSDesc', params.ruleSDesc);
  // fd.append('ruleValue', params.ruleValue);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/addActivityUser", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除活动
function deleteActivity (id) {
  let fd = new FormData();
  fd.append('activityId ', id);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/activity/deleteActivity", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 删除策略
function delectestrategy (id) {
  let fd = new FormData();
  fd.append('activityStrategyId ', id);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/activity/deleteActivityStrategy", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
function getActivityDetail (id) {
  let params = {
    params: {
      activityId: id,
    }
  }
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/findActivityResult", params);
}
// /strategy/delterUserEvaluationTemplate





function addActivity (params) {
  console.log(params)
  let fd = new FormData();
  fd.append('activityName ', params.activityName);
  fd.append('activityDesc', params.activityDesc);
  fd.append('activiyType', params.activiyType);
  fd.append('activityStatus', params.activityStatus);
  fd.append('userId', 1);
  fd.append('strategyId', params.strategyId);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/addActivity", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });?pageNum=1&pageSize=20
}
// 获取用户列表
function getuser (param) {
  // console.log('12320',param)
  // console.log('12320',params)
  let params = {
    params: {
      pageNum: param.pageNum,
      pageSize: param.pageSize,
      time: 1,
    }
  }
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/user/user/userList", params);
}
//  获取用户列表 strategy. 使用的 
function getuser1 () {
  // console.log('12320',param)
  // console.log('12320',params)
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/user/user/userList");
}
// 修改规则值

function creatrCode (params) {
  console.log(params)
  let fd = new FormData();
  fd.append('usersId', params.id);
  fd.append('activityId', params.activityId);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/creatrCode", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
function updateStrategyRule (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('ruleValue ', params.ruleValue);
  fd.append('activityId ', params.activityId);
  fd.append('ruleInstanceId', params.ruleInstanceId);

  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/setActivityRules", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
//查询活动
function getActivity () {
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/listActivity");
}
//获取参与人
function getPerson (id) {
  let params = {
    params: {
      activityId: id,
    }
  }
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/listActivityUser", params);
}

// 获取策略
function getStrategy () {

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/listActivityStrategy");

}
// 获取活动实体规则
function getActiveShi () {

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/listActivityStrategyInstance");

}
// 获取策略规则
function getStrategyRule (id) {

  let params = {
    params: {
      strategyId: id,

    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/findStrategyRule", params);
}

// 添加活动的参与者
function addpreson (params) {
  console.log(params)
  let fd = new FormData();
  fd.append('activityId ', params.activityId);
  fd.append('ruleInstanceId', params.ruleId);
  fd.append('userIds', params.userIds);

  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/addActivityUser", fd);
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}
// 开启活动
function start (id) {
  let fd = new FormData();
  fd.append('activityId ', id);

  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/startActivity", fd);

}
// 开启活动
function addCompany (data) {
  let fd = new FormData();
  fd.append('companyInfo ', data.companyInfo);
  fd.append('companyName ', data.companyName);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/addCompany", fd);

}
function login (data) {
  console.log(data)
  let params = {
    params: {
      authKey: data.authKey,
      authType: 2,
      passwd: data.passwd
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/user/user/login", params);
}
function erCode (phone) {
  let fd = new FormData();
  fd.append('phone ', phone);

  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/user/user/code", fd);
}
//统计投票结果
function count (params) {

  let fd = new FormData();
  fd.append('activityId ', params.activityId);
  fd.append('ruleId ', params.ruleId);
  fd.append('ruleInstanceId', params.ruleInstanceId);
  fd.append('userIds', params.userIds);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/statisticsTicket", fd, { responseType: 'arraybuffer' });
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
// 根据活动id查策略规则
function getStrategyRuleByActive (id) {
  console.log(id)
  let params = {
    params: {
      activityId: id,

    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/listActivityStrategyInstance", params);
}
// 根据活动id查策略规则
function checkcompany () {
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/findCompany");
}
// 根据活动id查评分模板
function findUserTemplate (data) {

  let params = {
    params: {
      activityId: data.activityId,
      type: data.type
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/findUserEvaluationTemplate", params);
}

function deleteuser (id) {

  let params = {
    params: {
      userId: id
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/user/user/deleteUser", params);
}
function updateDepartment (params) {

  let fd = new FormData();

  fd.append('companyId', params.companyId);
  fd.append('departmentName', params.departmentName);
  // fd.append('empNum', params.empNum);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/updateDepartment", fd, { responseType: 'arraybuffer' });
  // return Axios.post("/api/users/addAwardInfo",{awardName:'孙王大',empNum:'孙王大' });
}

function findDepartment (id) {

  let params = {
    params: {
      companyId: id
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/findDepartmentByCompanyId", params);
}
//投票记录
function ActivityvoteRecords (id) {
  let params = {
    params: {
      activityId: id
    }
  }

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/ActivityvoteRecords", params);
}
//删除事迹
function deleteSJ (id) {
  let params = {
    params: {
      id: id
    }
  }
  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/delterUserEvaluationTemplate", params);
}
//设置晋级人数
function VictoryCount (data) {
  let fd = new FormData();
  fd.append('count', data.count);
  fd.append('activityId', data.activityId);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/setActivityVictoryCount", fd, { responseType: 'arraybuffer' });
}

function updateSJ (data) {
  let fd = new FormData();
  fd.append('id', data.evaluateTemplateId);
  fd.append('evaluateType', data.evaluateType);
  fd.append('evaluateWeight', data.evaluateWeight);
  fd.append('remarks', data.remarks);
  fd.append('isDeleted', 0);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/strategy/updateUserEvaluationTemplate", fd, { responseType: 'arraybuffer' });
}

function sortStart (id) {
  let fd = new FormData();
  fd.append('activityId ', id);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/startActivityResult", fd);
}

// 后台活动投票记录详情查询
function ActivityvoteRecordsDetail (params) {
  // console.log('12320',param)
  // console.log('12320',params)

  return Axios.get("https://swcloud.tjsichuang.cn:1445/api/activity/activity/ActivityvoteRecordsDetail", params);
}

function ActivityvoteRecordsUpdate (data) {
  console.log(data)
  let fd = new FormData();
  fd.append('activityId', data.params.activityId);
  fd.append('userId', data.params.userId);
  fd.append('electedId', data.params.electedId);
  fd.append('type', data.params.type);
  fd.append('score', data.params.score);
  return Axios.post("https://swcloud.tjsichuang.cn:1445/api/activity/activity/ActivityvoteRecordsUpdate", fd, { responseType: 'arraybuffer' });
}

export default {
  getStrategyRuleByActive: getStrategyRuleByActive,
  addActivity: addActivity,
  addWard: addWard,
  getDepartment: getDepartment,
  addStrategy: addStrategy,
  getStrategy: getStrategy,
  getActivity: getActivity,
  addStrategyRule: addStrategyRule,
  getuser: getuser,
  deleteActivity: deleteActivity,
  getStrategyRule: getStrategyRule,
  deleteStrategyRule: deleteStrategyRule,
  deleteActivityStrategy: deleteActivityStrategy,
  setActivityRules: setActivityRules,
  getActiveShi: getActiveShi,
  addpreson: addpreson,
  count: count,
  updateStrategyRule: updateStrategyRule,
  getActivityDetail: getActivityDetail,
  creatrCode: creatrCode,
  getPerson: getPerson,
  getStrategyType: getStrategyType,
  deleteperson: deleteperson,
  start: start,
  EvaluationTemplate: EvaluationTemplate,
  erCode: erCode,
  login: login,
  findUserTemplate: findUserTemplate,
  addCompany: addCompany,
  checkcompany: checkcompany,
  checkTemplateWeight: checkTemplateWeight,
  delectestrategy: delectestrategy,
  deleteuser: deleteuser,
  updateDepartment: updateDepartment,
  findDepartment: findDepartment,
  checkTemplateWeight1: checkTemplateWeight1,
  ActivityvoteRecords: ActivityvoteRecords,
  deleteSJ: deleteSJ,
  VictoryCount: VictoryCount,
  updateSJ: updateSJ,
  sortStart: sortStart,
  ActivityvoteRecordsDetail: ActivityvoteRecordsDetail,
  getuser1: getuser1,
  ActivityvoteRecordsUpdate: ActivityvoteRecordsUpdate
};
