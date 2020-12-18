/* eslint-disable require-jsdoc */
import vip from '@/api/vip-api.js';

async function addLevel(params, handleResult) {
  vip.addLevel(params).then((res) => handleResult(res));
}
async function checkLevel (handleResult) {
  vip.checkLevel().then((res) => handleResult(res));
}
async function addVip(params, handleResult) {
  vip.addVip(params).then((res) => handleResult(res));
}
async function findvip(handleResult) {
  vip.findvip().then((res) => handleResult(res));
}
async function findvips(params, handleResult) {
  vip.findvips(params).then((res) => handleResult(res));
}
async function editLevel(params, handleResult) {
  vip.editLevel(params).then((res) => handleResult(res));
}
async function adddes(params, handleResult) {
  vip.adddes(params).then((res) => handleResult(res));
}
async function finddes(levelId, handleResult) {
  vip.finddes(levelId).then((res) => handleResult(res));
}
async function deletevip(id, handleResult) {
  vip.deletevip(id).then((res) => handleResult(res));
}
async function deleteUserMemberLevel(id, handleResult) {
  vip.deleteUserMemberLevel(id).then((res) => handleResult(res));
}
async function deleteMemberLevelDescribe(id, handleResult) {
  vip.deleteUserMemberLevel(id).then((res) => handleResult(res));
}


async function addVipCard(params, handleResult) {
  vip.addVipCard(params).then((res) => handleResult(res));
}
async function selectVipCard(bossId, handleResult) {
  vip.selectVipCard(bossId).then((res) => handleResult(res));
}
async function deleteVipCard(params, handleResult) {
  vip.deleteVipCard(params).then((res) => handleResult(res));
}
async function addVipPrivilege(params, handleResult) {
  vip.addVipPrivilege(params).then((res) => handleResult(res));
}
async function deleteVipPrivilege(params, handleResult) {
  vip.deleteVipPrivilege(params).then((res) => handleResult(res));
}
async function selectVipPrivilege(params, handleResult) {
  vip.selectVipPrivilege(params).then((res) => handleResult(res));
}
async function updateVipCard(params, handleResult) {
  vip.updateVipCard(params).then((res) => handleResult(res));
}
async function updateVipPrivilege(params, handleResult) {
  vip.updateVipPrivilege(params).then((res) => handleResult(res));
}
async function selectVip(params, handleResult) {
  vip.selectVip(params).then((res) => handleResult(res));
}
async function deleteVip(params, handleResult) {
  vip.deleteVip(params).then((res) => handleResult(res));
}
export default {
  addLevel: addLevel,
  checkLevel: checkLevel,
  addVip: addVip,
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
  deleteVip: deleteVip,
};

