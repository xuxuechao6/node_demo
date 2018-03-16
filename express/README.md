## 技术栈

node + express + ejs +  webpack + oauth2.0 + mysql

## 项目运行

```  

cd account

npm install

node bin/www

```
## 项目结构

```
.
├── bin                                       
│   └── www                                     // 项目入口文件
├── config                                      
│   └── db.js                                   // 数据库配置文件
├── controllers                                 // 业务逻辑层
│   ├── oauth2                                  
│   │   ├── qq                                  // qq第三方登录
│   │   ├── sina                                // 新浪第三方登录
│   │   └── wx                                  // 微信第三方登录
│   └── oauth2server                            
│       ├── client.js                           // 客户端登录
│       └── oauthserver.js                      // 第三方认证
├── lib                                         
│   └── sql.js                                  // sql查询语句
├── middlewares                                 
│   ├── dbconnection.js                         // 连接数据库中间键
│   └── mysql                                   // 数据库查询中间键
├── models                                      // 数据模块
├── public                                      // 公共资源目录
├── routes                                      // 路由
│   ├── index.js                                // 根路由
│   ├── oauth.js                                // 第三方登录
│   └── oauthserver.js                          // 提供登录认证服务
├── views                                       
│   ├── error.ejs                               // 报错页面
│   ├── index.ejs                               // 首页
│   └── login.ejs                               // 登录页面
├── app.js                                      // 存放的Express项目中最基本的配置信息
├── favicon.ico                                 // 图标
├── package.json                                // 项目依赖文件
.