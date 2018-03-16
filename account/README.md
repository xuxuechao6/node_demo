

# RT-Thread 用户中心

## 需求背景

* 网站各系统都有一个独立的帐号，用户注册麻烦，管理也麻烦。
* 强制实名以后是趋势，使用各个独立的系统，后面工作量巨大。
* 各个系统原有的用户系统可能有漏洞，容易被攻击者利用。

因此希望开发一套公共的独立的帐号系统，以便后续跟综和管理。

## 一些想法

* 对外接口主要基于 OAuth 2.0 规范。
* 各个应用（禅知，discuz）来适配OAuth 2.0，以及将来开放给其它应用，如原来的云IDE和GUI builder。
* 各个应用内依然有帐号数据表存在，与主帐号有一一对应关系，以方便应用内自己做帐号合并等操作。
* 用户系统支持传统的主动注册以及第三方快速注册，并能输出用户的认证级别到应用中。
如人工认证，已邮箱验证，已手机验证，已微信验证以及自定义属性。用户中可以根据这些属性来判断用户的级别。比如非实名认证的用户，晚上10点后不能发贴等。
或已微信/QQ验证的用户，在深夜发贴需要再次验证微信/QQ等。


## 技术栈

node + express + ejs +  webpack + oauth2.0 + mysql

## 项目运行


```  

cd account

npm install

node bin/www

```
=======
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

```
=======

