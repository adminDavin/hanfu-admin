/* eslint-disable require-jsdoc */
import Axios from './index';

function addLevel(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('name', params.name);
  fd.append('levelDescribe', params.levelDescribe);
  fd.append('level', params.level);
  fd.append('bossId', params.bossId);
  return Axios.post('/api/api/user/hf-auth/addUserMemberLevel', fd);
}
function checkLevel() {
  return Axios.get('/api/api/user/hf-auth/findUserMemberLevel');
}
// function addvip(params) {
//   let fd = new FormData();
//   console.log(params);
//   fd.append('levelId', params.levelId);
//   fd.append('userId', params.userId);
//   return Axios.post('/api/api/user/hf-auth/addUserMember', fd);
// }
function findvip() {
  return Axios.get('/api/api/user/hf-auth/findUserMember');
}
function findvips(param) {
  console.log(param);
  let params = {

  };
  if (param.productCategoryName !== '') {
    params.phone = param.productCategoryName;
  }
  if (param.goodsName !== '') {
    params.name = param.goodsName;
  }
  return Axios.get('/api/api/user/hf-auth/findUserMember', {params});
}
function editLevel(params) {
  let fd = new FormData();
  fd.append('levelDescribe', params.levelDescribe);
  fd.append('name', params.name);
  fd.append('id', params.id);
  return Axios.post('/api/api/user/hf-auth/updateUserMemberLevel', fd);
}
function adddes(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('expireTime', params.expireTime);
  fd.append('startTime', params.startTime);
  fd.append('prerogative', params.prerogative);
  fd.append('levelDescribe', params.levelDescribe);
  fd.append('levelId', params.levelId);
  return Axios.post('/api/api/user/hf-auth/addMemberLevelDescribe', fd);
}
function finddes(levelId) {
  return Axios.get('/api/api/user/hf-auth/findMemberLevelDescribe?levelId=' + levelId);
}
function deletevip(id) {
  return Axios.get('/api/api/user/hf-auth/deleteUserMember?id=' + id);
}
function deleteUserMemberLevel(id) {
  return Axios.get('/api/api/user/hf-auth/deleteUserMemberLevel?id=' + id);
}
function deleteMemberLevelDescribe(id) {
  return Axios.get('/api/api/user/hf-auth/deleteMemberLevelDescribe?id=' + id);
}

// ----------------------------------------新修改的会员------------------------------------------------
// 添加会员卡
function addVipCard(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('bossId', params.bossId);
  fd.append('fileId', params.fileId);
  fd.append('label', params.label);
  fd.append('price', params.price);
  fd.append('vipDay', params.vipDay);
  fd.append('vipName', params.vipName);
  return Axios.post('/api/api/user/vip/addVipCard', fd);
}
// 查询会员卡
function selectVipCard(bossId) {
  return Axios.get('/api/api/user/vip/selectVipCard?bossId=' + bossId);
}
// 删除会员卡
function deleteVipCard(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('vipId', params.vipId);
  return Axios.post('/api/api/user/vip/deleteVipCard', fd);
}
// 添加会员特权
function addVipPrivilege(params) {
  let fd = new FormData();
  fd.append('bossId', params.bossId);
  fd.append('fileId', params.fileId);
  fd.append('privilegeName', params.privilegeName);
  return Axios.post('/api/api/user/vip/addVipPrivilege', fd);
}
// 修改会员卡
function updateVipCard(params) {
  let fd = new FormData();
  fd.append('fileId', params.fileId);
  fd.append('label', params.label);
  fd.append('price', params.price);
  fd.append('vipDay', params.vipDay);
  fd.append('vipId', params.vipId);
  fd.append('vipName', params.vipName);
  return Axios.post('/api/api/user/vip/updateVipCard', fd);
}
// 删除会员特权
function deleteVipPrivilege(params) {
  let fd = new FormData();
  fd.append('privilegeId', params.privilegeId);
  return Axios.post('/api/api/user/vip/deleteVipPrivilege', fd);
}
// 查询会员特权
function selectVipPrivilege(params) {
  let fd = new FormData();
  fd.append('bossId', params.bossId);
  return Axios.post('/api/api/user/vip/selectVipPrivilege', fd);
}
// 修改会员特权
function updateVipPrivilege(params) {
  let fd = new FormData();
  fd.append('fileId', params.fileId);
  fd.append('privilegeId', params.privilegeId);
  fd.append('privilegeName', params.privilegeName);
  return Axios.post('/api/api/user/vip/updateVipPrivilege', fd);
}
// 查询会员
function selectVip(bossId) {
  return Axios.get('/api/api/user/vip/selectVip?bossId=' + bossId);
}
// 添加会员
function addVip(params) {
  let fd = new FormData();
  fd.append('bossId', params.bossId);
  fd.append('day', params.day);
  fd.append('userId', params.userId);
  return Axios.post('/api/api/user/vip/addVip', fd);
}
// 添加会员
function deleteVip(params) {
  let fd = new FormData();
  fd.append('userVipId', params.userVipId);
  return Axios.post('/api/api/user/vip/deleteVip', fd);
}
// ---------------------------------------------------------------------------------------------------
export default {
  addLevel: addLevel,
  checkLevel: checkLevel,
  // addvip: addvip,
  findvip: findvip,
  editLevel: editLevel,
  adddes: adddes,
  finddes: finddes,
  deletevip: deletevip,
  findvips: findvips,
  deleteUserMemberLevel: deleteUserMemberLevel,
  deleteMemberLevelDescribe: deleteMemberLevelDescribe,
  addVipCard: addVipCard,
  selectVipCard: selectVipCard,
  deleteVipCard: deleteVipCard,
  addVipPrivilege: addVipPrivilege,
  deleteVipPrivilege: deleteVipPrivilege,
  selectVipPrivilege: selectVipPrivilege,
  updateVipCard: updateVipCard,
  updateVipPrivilege: updateVipPrivilege,
  selectVip: selectVip,
  addVip: addVip,
  deleteVip: deleteVip,
};
