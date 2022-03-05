'use strict';
// 前台路由配置文件

module.exports = (app) => {
  const { router, controller } = app;
  const { index } = controller.admin;
  router.get('/admin/index', index.index);
  router.post('/admin/login', index.login);
};
