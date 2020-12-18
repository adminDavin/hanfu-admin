/* eslint-disable require-jsdoc */
import Axios from './index';

function getMessageContent(params) {
  return Axios.get('/api/api/user/user/getMessageContent', {params});
}
function updateIsUse(params) {
  return Axios.get('/api/api/user/user/updateIsUse', {params});
}
function getMessageContentType() {
  return Axios.get('/api/api/user/user/getMessageContentType');
}
function getTemplateParam(params) {
  let fd = new FormData();
  fd.append('type', params.type);
  return Axios.get('/api/api/user/user/getTemplateParam', {params});
}
function addTemplateMessage(params) {
  let fd = new FormData();
  fd.append('type', params.type);
  fd.append('bossId', params.bossId);
  fd.append('content', params.content);
  fd.append('contentType', params.contentType);
  fd.append('messageType', params.messageType);

  if (params.subject !== '') {
    fd.append('subject', params.subject);
  }
  return Axios.post('/api/api/user/user/addTemplateMessage', fd);
}
function addAnnouncement(params) {
  let fd = new FormData();
  fd.append('content', params.content);
  fd.append('userId ', params.userId);
  return Axios.post('/api/api/product/home/addAnnouncement', fd);
}
function getAnnouncement() {
  return Axios.get('/api/api/product/home/getAnnouncement');
}
function getMessageInstanceList(params) {
  return Axios.get('/api/api/user/user/getMessageInstanceList', {params});
}
function updateMessageInstance(params) {
  return Axios.get('/api/api/user/user/updateMessageInstance', {params});
}
function getRefuse(id) {
  return Axios.get('/api/api/user/user/getRefuse?id=' + id);
}
function addMessage(params) {
  let fd = new FormData();
  fd.append('bossId', params.bossId);
  if (params.file) {
    fd.append('file', params.file);
  }
  fd.append('headline', params.headline);
  fd.append('secondDesc', params.secondDesc);
  return Axios.post('/api/api/user/Chat/addMessage', fd);
}
function updateMessage(params) {
  let fd = new FormData();
  fd.append('headline', params.headline);
  if (params.file) {
    fd.append('file', params.file);
  }
  fd.append('id', params.id);
  fd.append('secondDesc', params.secondDesc);
  return Axios.post('/api/api/user/Chat/updateMessage', fd);
}
function announcement(params) {
  let fd = new FormData();
  fd.append('message', params.message);
  return Axios.post('/api/api/user/Chat/announcement', fd);
}
function selectMessage(bossId) {
  return Axios.get('/api/api/user/Chat/selectMessage?bossId=' + bossId);
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
  updateMessage: updateMessage,
  selectMessage: selectMessage,
};
