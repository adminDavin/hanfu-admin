/* eslint-disable require-jsdoc */
import goods from '@/api/goods.js';

async function getGoodsByProductId(productId, handleResult) {
  goods.getGoodsByProductId(productId).then((res) => handleResult(res));
}
// 根据文件ID获取图片
async function getFileFileId(fileId, handleResult) {
  goods.getFileFileId(fileId).then((res) => handleResult(res));
}
// 添加物品
async function addProduct(fileId, handleResult) {
  goods.addProduct(fileId).then((res) => handleResult(res));
}
// 添加物品规格值
async function additionSpecs(fileId, handleResult) {
  goods.additionSpecs(fileId).then((res) => handleResult(res));
}
// 删除物品
async function deleteById(fileId, handleResult) {
  goods.deleteById(fileId).then((res) => handleResult(res));
}
export default {
  getGoodsByProductId: getGoodsByProductId,
  getFileFileId: getFileFileId,
  addProduct: addProduct,
  additionSpecs: additionSpecs,
  deleteById: deleteById,
};
