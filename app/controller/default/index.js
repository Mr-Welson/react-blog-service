'use strict';
// 前台控制器
const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    this.ctx.body = 'result';
  }

  handleSuccessResult(data) {
    return { code: 200, message: 'success', data };
  }

  handleErrorResult(error, defaultData) {
    // console.log(error);
    return {
      code: 500,
      errorMsg: error.sqlMessage,
      message: '服务器错误',
      data: defaultData,
    };
  }

  // 获取文章列表
  async getArticleList() {
    const { ctx, app } = this;
    const sql = `
      SELECT article.id as id , 
      article.title as title ,
      article.introduce as introduce ,
      article.create_time as createTime ,
      article.view_count as viewCount ,
      type.name as typeName 
      FROM article LEFT JOIN type ON article.type_id = type.id
    `;
    try {
      const data = await app.mysql.query(sql);
      ctx.body = this.handleSuccessResult(data);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, []);
    }
  }
  // 根据ID获取文章详情
  async getArticleById() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const sql = `
      SELECT article.id as id , 
      article.title as title ,
      article.introduce as introduce ,
      article.content as content ,
      article.create_time as createTime ,
      article.view_count as viewCount ,
      type.name as typeName ,
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
  // 获取博客类别列表
  async getTypeList() {
    const data = await this.app.mysql.select('type');
    this.ctx.body = { data };
  }
  // 根据博客类别获取文章列表
  async getArticleListByTypeId() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const sql = `
      SELECT article.id as id , 
      article.title as title ,
      article.introduce as introduce ,
      article.create_time as createTime ,
      article.view_count as viewCount ,
      type.name as typeName 
      FROM article LEFT JOIN type ON article.type_id = type.id 
      WHERE type_id = ${id}
    `;

    try {
      const data = await app.mysql.query(sql);
      ctx.body = this.handleSuccessResult(data);
    } catch (error) {
      ctx.body = this.handleErrorResult(error, []);
    }
  }
}

module.exports = IndexController;
