/* eslint-disable require-jsdoc */
import product from '@/api/product.js';

async function getProductsByBossId(handleResult) {
  let bossId = 1;
  product.getProductsByBossId(bossId).then((res) => handleResult(res));
}

async function getProductListBoss(bossId, handleResult) {
  // let bossId = 1;
  product.getProductListBoss(bossId).then((res) => handleResult(res));
}
async function productNameListBos(inquire, handleResult) {
  let bossId = 1;
  product.productNameListBos(bossId, inquire).then((res) => handleResult(res));
}
async function deleteById(productId, handleResult) {
  product.deleteProductById(productId).then((res) => handleResult(res));
}

async function ceateProduct(productInfo, handleResult) {
  // 组装请求参数
  product.ceateProduct(productInfo).then((res) => handleResult(res));
}

async function getCatagery(handleResult) {
  product.getCatagery().then((res) => handleResult(res));
}

async function selectProductPictures(productId, handleResult) {
  product.selectProductPictures(productId).then((res) => handleResult(res));
}

async function selectProductIntroducePictrue(productId, handleResult) {
  product.selectProductIntroducePictrue(productId).then((res) => handleResult(res));
}
async function deleteProductPictrue(fileId, productId, handleResult) {
  product.deleteProductPictrue(fileId, productId).then((res) => handleResult(res));
}
async function deletedPictrue(fileId, productId, handleResult) {
  product.deletedPictrue(fileId, productId).then((res) => handleResult(res));
}
// 获取商品规格
async function specifies(productId, handleResult) {
  product.specifies(productId).then((res) => handleResult(res));
}
//  添加商品规格
async function addSpecify(productId, handleResult) {
  product.addSpecify(productId).then((res) => handleResult(res));
}
//  添加商品规格
async function deleteProduct(productId, handleResult) {
  product.deleteProduct(productId).then((res) => handleResult(res));
}
//  更新商品接口
async function updateProduct(productId, handleResult) {
  product.updateProduct(productId).then((res) => handleResult(res));
}
// 通过商品ID获取当前商品
async function getDetail(productId, stoneId, handleResult) {
  product.getDetail(productId, stoneId).then((res) => handleResult(res));
}
//  删除商品规格
async function deleteSpecifies(productSpecId, handleResult) {
  product.deleteSpecifies(productSpecId).then((res) => handleResult(res));
}
//  更新商品规格
async function updatespec(productId, handleResult) {
  product.updatespec(productId).then((res) => handleResult(res));
}
//  批量删除商品
async function deleteSelectProduct(productId, handleResult) {
  product.deleteSelectProduct(productId).then((res) => handleResult(res));
}

// 优惠券筛选
async function selectDiscountCoupon(params, handleResult) {
  product.selectDiscountCoupon(params).then((res) => handleResult(res));
}
// 商家是否同意仓库申请物品
async function bossAgreeApply(params, handleResult) {
  product.bossAgreeApply(params).then((res) => handleResult(res));
}
// 获取商品商品管理列表2
async function getProductListBos(bossId, handleResult) {
  product.getProductListBos(bossId).then((res) => handleResult(res));
}
// 店铺添加商品
async function addStoneProduct(params, handleResult) {
  product.addStoneProduct(params).then((res) => handleResult(res));
}
// --------------------------------数据统计----------------------------------------------
async function findAmountData(handleResult) {
  product.findAmountData().then((res) => handleResult(res));
}
// 获取首页各类目占比
// async function findCategoryData(bossId, handleResult) {
//   product.findCategoryData(bossId).then((res) => handleResult(res));
// }
// 获取首页会员数
async function findMemberData(handleResult) {
  product.findMemberData().then((res) => handleResult(res));
}

// 获取首页订单数量
async function findOrderData(handleResult) {
  product.findOrderData().then((res) => handleResult(res));
}
// 获取首页订单类型数据
async function findOrderTypeData(handleResult) {
  product.findOrderTypeData().then((res) => handleResult(res));
}
// 获取首页销量排行数据
async function findSalesVolumeData(handleResult) {
  product.findSalesVolumeData().then((res) => handleResult(res));
}
// 获取首页销量排行数据
async function findVistisData(handleResult) {
  product.findVistisData().then((res) => handleResult(res));
}
// -------------------------------------------------------------------------------------
export default {
  getProductsByBossId: getProductsByBossId,
  deleteById: deleteById,
  ceateProduct: ceateProduct,
  getCatagery: getCatagery,
  selectProductPictures: selectProductPictures,
  specifies: specifies,
  addSpecify: addSpecify,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getDetail: getDetail,
  deleteSpecifies: deleteSpecifies,
  deleteProductPictrue: deleteProductPictrue,
  updatespec: updatespec,
  selectProductIntroducePictrue: selectProductIntroducePictrue,
  getProductListBoss: getProductListBoss,
  productNameListBos: productNameListBos,
  deleteSelectProduct: deleteSelectProduct,
  deletedPictrue: deletedPictrue,
  selectDiscountCoupon: selectDiscountCoupon,
  bossAgreeApply: bossAgreeApply,
  getProductListBos: getProductListBos,
  addStoneProduct: addStoneProduct,

  findAmountData: findAmountData,
  // findCategoryData: findCategoryData,
  findMemberData: findMemberData,
  findOrderData: findOrderData,
  findOrderTypeData: findOrderTypeData,
  findSalesVolumeData: findSalesVolumeData,
  findVistisData: findVistisData,
};
