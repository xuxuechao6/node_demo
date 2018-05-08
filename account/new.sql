/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.14 : Database - rtt_user_center
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`rtt_user_center` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `rtt_user_center`;

/*Table structure for table `oauth2_client` */

DROP TABLE IF EXISTS `oauth2_client`;

CREATE TABLE `oauth2_client` (
  `client_id` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `client_secret` varchar(64) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL,
  `grant_types` varchar(128) DEFAULT NULL,
  `scope` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `oauth2_client` */

insert  into `oauth2_client`(`client_id`,`name`,`client_secret`,`redirect_uri`,`grant_types`,`scope`) values ('101454832','QQ','471cae00074fbfbf2b26cc073097db35','http://localhost:3000/oauth/qq/redirect',NULL,NULL),('wx9a865aa77929c654','WX','964a0c8aaacf9ad56016ed023d32208c','http://localhost:3000/oauth/wx/redirect',NULL,NULL),('123456789','bbs','e10adc3949ba59abbe56e057f20f883e','http://localhost:3000/oauth/bbs/redirect',NULL,NULL),('527345899','sina','372f7194321e5da73661ee13060c8acc','http://localhost:3000/oauth/sina/redirect',NULL,NULL);

/*Table structure for table `qq_token` */

DROP TABLE IF EXISTS `qq_token`;

CREATE TABLE `qq_token` (
  `access_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

/*Data for the table `qq_token` */

/*Table structure for table `uc_active_email` */

DROP TABLE IF EXISTS `uc_active_email`;

CREATE TABLE `uc_active_email` (
  `email` varchar(64) NOT NULL,
  `token` varchar(32) NOT NULL,
  `expires` int(11) NOT NULL DEFAULT '86400',
  `reg_date` varchar(15) NOT NULL,
  `is_active` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `uc_active_email` */

insert  into `uc_active_email`(`email`,`token`,`expires`,`reg_date`,`is_active`) values ('897867078@qq.com','56b207796e392f98d6964bf89958eae3',86400,'1521802630461',1);

/*Table structure for table `uc_oauth2_info` */

DROP TABLE IF EXISTS `uc_oauth2_info`;

CREATE TABLE `uc_oauth2_info` (
  `oauth2_id` int(11) NOT NULL AUTO_INCREMENT,
  `oauth2_type` varchar(128) DEFAULT NULL,
  `oauth2_appid` varchar(64) DEFAULT NULL,
  `oauth2_appsecret` varchar(64) DEFAULT NULL,
  `oauth2_callback_url` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`oauth2_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `uc_oauth2_info` */

/*Table structure for table `uc_post_email` */

DROP TABLE IF EXISTS `uc_post_email`;

CREATE TABLE `uc_post_email` (
  `email_id` int(16) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) DEFAULT NULL,
  `from_username` varchar(256) DEFAULT NULL,
  `from_email` varchar(256) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `text` text,
  `html` text,
  PRIMARY KEY (`email_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `uc_post_email` */

insert  into `uc_post_email`(`email_id`,`type`,`from_username`,`from_email`,`subject`,`text`,`html`) values (1,'register','RT-Thread用户中心','xuxuechao@rt-thread.com','[RT-Thread] 帐户激活通知！','        \r\n        感谢您注册RT-Thread，您只需要点击下面链接，激活您的帐户，您便可以享受RT-Thread各项业务。\r\n        \r\n        url\r\n        \r\n       (如果无法点击该URL链接地址，请将它复制并粘帖到浏览器的地址输入框，然后单击回车即可。该链接使用后将立即失效。\r\n        \r\n        注意:重复发送激活码，则历史激活码失效。请您在收到邮件24小时进行激活，否则该激活码将会失效。7天后您的帐户将会失效。',NULL);

/*Table structure for table `uc_users` */

DROP TABLE IF EXISTS `uc_users`;

CREATE TABLE `uc_users` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `companyName` varchar(128) DEFAULT NULL,
  `companyType` varchar(128) DEFAULT NULL,
  `regdate` int(11) DEFAULT NULL,
  `lastloginip` varchar(16) DEFAULT NULL,
  `lastlogintime` int(11) DEFAULT NULL,
  `salt` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

/*Data for the table `uc_users` */

insert  into `uc_users`(`uid`,`username`,`password`,`email`,`phone`,`companyName`,`companyType`,`regdate`,`lastloginip`,`lastlogintime`,`salt`) values (46,'小许60','ba947327576ba0bc36e494603dfb1ade','1446525499@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'遗失的小许','f1fe7f64eb28f1880574d8854f720910','897867078@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,'小许6啊','ba947327576ba0bc36e494603dfb1ade','810899612@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `wx_token` */

DROP TABLE IF EXISTS `wx_token`;

CREATE TABLE `wx_token` (
  `access_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

/*Data for the table `wx_token` */

/*Table structure for table `wx_user_info` */

DROP TABLE IF EXISTS `wx_user_info`;

CREATE TABLE `wx_user_info` (
  `openid` varchar(32) NOT NULL,
  `nickname` char(20) DEFAULT NULL,
  `sex` int(2) DEFAULT NULL,
  `language` varchar(24) NOT NULL DEFAULT '',
  `city` varchar(24) NOT NULL DEFAULT '',
  `province` varchar(24) NOT NULL DEFAULT '',
  `country` varchar(24) NOT NULL DEFAULT '',
  `headimgurl` varchar(1000) NOT NULL DEFAULT '',
  `privilege` varchar(128) NOT NULL DEFAULT '[]',
  `unionid` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `wx_user_info` */

insert  into `wx_user_info`(`openid`,`nickname`,`sex`,`language`,`city`,`province`,`country`,`headimgurl`,`privilege`,`unionid`) values ('oabZl0085ZVKF4o-z3XrpIoMC6sE','遗失的小许',1,'zh_CN','Jiyuan','Henan','China','http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLKDeJwmJINEc3aWm0E7uFFRxrduNqZZZht3pvvxIjDibTIbnjKtG0UMo4LRHKibxYziaNwxiaFIkHFxQ/132','','oNfT91NdyCSRGvm6qnxHqG7ydqZ0');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
