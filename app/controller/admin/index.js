'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    this.ctx.body = 'admin result';
  }

  handleSuccessResult(data) {
    return { code: 200, message: 'success', data };
  }

  handleErrorResult(error, defaultData) {
    // console.log(error);
    return {
      code: 500,
      errorMsg: error,
      message: '服务器错误',
      data: defaultData,
    };
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const sql = `
      SELECT username FROM admin_user WHERE username = '${username}' AND password = '${password}' `;
    try {
      const data = await app.mysql.query(sql);
      if (!data.length) {
        ctx.body = {
          code: 201,
          message: '用户名或密码不正确',
          data: undefined,
        };
        return;
      }
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = this.handleSuccessResult(data[0]);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, {});
    }
  }
}

module.exports = IndexController;
