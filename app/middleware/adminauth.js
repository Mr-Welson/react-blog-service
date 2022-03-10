'use strict';

// 路由守卫
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { code: 401, message: '用户验证失败,请重新登录' };
    }
  };
};
