/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583334997747_6658';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 数据库配置
  config.mysql = {
    client: {
      // host 服务器地址
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨域设置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  };
  config.cors = {
    origin: 'http://localhost:5010',
    credentials: true, // 允许 cookie 跨域
    allowMethods: 'GET,POST,OPTINOS,DELETE,PUT',
  };

  return {
    ...config,
    ...userConfig,
  };
};
