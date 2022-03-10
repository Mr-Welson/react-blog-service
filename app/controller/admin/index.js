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

  // 登录
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
      ctx.body = this.handleSuccessResult(openId);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, {});
    }
  }

  // 获取文章分类
  async getTypeList() {
    const data = await this.app.mysql.select('type');
    this.ctx.body = this.handleSuccessResult(data);
  }

  // 获取文章列表
  async queryArticleList() {
    const { ctx, app } = this;
    const sql = `
      SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.create_time as createTime,
      article.view_count as viewCount ,
      type.name as typeName 
      FROM article LEFT JOIN type ON article.type_id = type.Id 
      ORDER BY article.id DESC 
    `;
    try {
      const data = await app.mysql.query(sql);
      ctx.body = this.handleSuccessResult(data);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, []);
    }
  }

  // 添加文章
  async addArticle() {
    const { ctx, app } = this;
    try {
      const articleInfo = ctx.request.body;
      const { typeId, createTime, viewCount, ...rest } = articleInfo;
      const insertInfo = {
        type_id: typeId,
        create_time: createTime,
        view_count: viewCount,
        ...rest,
      };
      const result = await app.mysql.insert('article', insertInfo);
      const { insertId, affectedRows } = result;
      const insertSuccess = affectedRows === 1;
      if (insertSuccess) {
        ctx.body = this.handleSuccessResult({ id: insertId });
      } else {
        ctx.body = this.handleErrorResult(result);
      }
    } catch (error) {
      ctx.body = this.handleErrorResult(error);
    }
  }

  // 更新文章
  async updateArticle() {
    const { ctx, app } = this;
    try {
      const articleInfo = ctx.request.body;
      const { typeId, createTime, viewCount, ...rest } = articleInfo;
      const insertInfo = {
        type_id: typeId,
        create_time: createTime,
        view_count: viewCount,
        ...rest,
      };
      const result = await app.mysql.update('article', insertInfo);
      const { affectedRows } = result;
      const insertSuccess = affectedRows === 1;
      if (insertSuccess) {
        ctx.body = this.handleSuccessResult();
      } else {
        ctx.body = this.handleErrorResult(result);
      }
    } catch (error) {
      ctx.body = this.handleErrorResult(error);
    }
  }

  async deleteArticle() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    try {
      const result = await app.mysql.delete('article', { id });
      ctx.body = this.handleSuccessResult(result);
    } catch (error) {
      ctx.body = this.handleErrorResult(error);

    }
  }

  async getArticleById() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const sql = `
      SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.content as content,
      article.create_time as createTime,
      article.view_count as viewCount,
      type.name as typeName,
      type.id as typeId 
      FROM article LEFT JOIN type ON article.type_id = type.id
      WHERE article.id = ${id}
    `;
    try {
      const data = await app.mysql.query(sql);
      ctx.body = this.handleSuccessResult(data[0]);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, {});
    }
  }
}

module.exports = IndexController;
