/* eslint-disable require-jsdoc */
import news from '@/api/news-api.js';
// 查询消息内容
async function getMessageContent(params, handleResult) {
  news.getMessageContent(params).then((res) => handleResult(res));
}
async function getMessageContentType(handleResult) {
  news.getMessageContentType().then((res) => handleResult(res));
}
async function updateIsUse(params, handleResult) {
  news.updateIsUse(params).then((res) => handleResult(res));
}
async function getTemplateParam(params, handleResult) {
  news.getTemplateParam(params).then((res) => handleResult(res));
}
async function addTemplateMessage(params, handleResult) {
  news.addTemplateMessage(params).then((res) => handleResult(res));
}
async function addAnnouncement(params, handleResult) {
  news.addAnnouncement(params).then((res) => handleResult(res));
}
async function getAnnouncement(handleResult) {
  news.getAnnouncement().then((res) => handleResult(res));
}
async function getMessageInstanceList(params, handleResult) {
  news.getMessageInstanceList(params).then((res) => handleResult(res));
}
async function updateMessageInstance(params, handleResult) {
  news.updateMessageInstance(params).then((res) => handleResult(res));
}
async function getRefuse(id, handleResult) {
  news.getRefuse(id).then((res) => handleResult(res));
}
async function addMessage(params, handleResult) {
  news.addMessage(params).then((res) => handleResult(res));
}
async function announcement(params, handleResult) {
  news.announcement(params).then((res) => handleResult(res));
}
async function updateMessage(params, handleResult) {
  news.updateMessage(params).then((res) => handleResult(res));
}
async function selectMessage(bossId, handleResult) {
  news.selectMessage(bossId).then((res) => handleResult(res));
}
export default {
  getMessageContent: getMessageContent,
  getMessageContentType: getMessageContentType,
  updateIsUse: updateIsUse,
  getTemplateParam: getTemplateParam,
  addTemplateMessage: addTemplateMessage,
  addAnnouncement: addAnnouncement,
  getAnnouncement: getAnnouncement,
  getMessageInstanceList: getMessageInstanceList,
  updateMessageInstance: updateMessageInstance,
  getRefuse: getRefuse,
  addMessage: addMessage,
  announcement: announcement,
  selectMessage: selectMessage,
  updateMessage: updateMessage,
};

