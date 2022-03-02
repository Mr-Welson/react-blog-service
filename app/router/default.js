'use strict';
// 前台路由配置文件

module.exports = app => {
  const { router, controller } = app;
  const { index } = controller.default;
  router.get('/default/index', index.index);
  router.get('/default/getArticleList', index.getArticleList);
  router.get('/default/getArticleById/:id', index.getArticleById);
  router.get('/default/getTypeList', index.getTypeList);
  router.get('/default/getArticleListByTypeId/:id', index.getArticleListByTypeId);
};
