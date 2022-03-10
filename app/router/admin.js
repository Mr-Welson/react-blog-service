'use strict';
// 前台路由配置文件

module.exports = (app) => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminauth();
  const { index } = controller.admin;
  router.get('/admin/index', index.index);
  router.post('/admin/login', index.login);
  router.get('/admin/getTypeList', adminAuth, index.getTypeList);
  router.get('/admin/queryArticleList', adminAuth, index.queryArticleList);
  router.post('/admin/addArticle', adminAuth, index.addArticle);
  router.post('/admin/updateArticle', adminAuth, index.updateArticle);
};
