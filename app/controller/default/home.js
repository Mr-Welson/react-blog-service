'use strict';
// 前台控制器
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'result';
  }
  async getArticleList() {
    const { ctx, app } = this;
    const sql = `
      SELECT article.id as id , 
      article.title as title ,
      article.introduce as introduce ,
      article.create_time as create_time ,
      article.view_count as view_count ,
      type.type_name as type_name 
      FROM article LEFT JOIN type ON article.type_id = type.id
    `;
    const data = await app.mysql.query(sql);
    ctx.body = { data };
  }
}

module.exports = HomeController;
