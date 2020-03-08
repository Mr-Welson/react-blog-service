'use strict';
// 前台控制器
const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    this.ctx.body = 'result';
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
    const data = await app.mysql.query(sql);
    ctx.body = { data };
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
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }
  // 获取博客类别列表
  async getTypeList() {
    const data = await this.app.mysql.select('type');
    this.ctx.body = { data };
  }
  // 根据博客类别获取文章列表
  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
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
    const data = await this.app.mysql.query(sql);
    this.ctx.body = { data };
  }
}

module.exports = IndexController;
