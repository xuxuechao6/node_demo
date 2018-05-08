-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-03-26 07:41:39
-- 服务器版本： 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rtt_user_center`
--

-- --------------------------------------------------------

--
-- 表的结构 `oauth2_client`
--

CREATE TABLE `oauth2_client` (
  `client_id` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `client_secret` varchar(64) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL,
  `grant_types` varchar(128) DEFAULT NULL,
  `scope` varchar(32) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `oauth2_client`
--

INSERT INTO `oauth2_client` (`client_id`, `name`, `client_secret`, `redirect_uri`, `grant_types`, `scope`) VALUES
('101454832', 'QQ', '471cae00074fbfbf2b26cc073097db35', 'http://localhost:3000/oauth/qq/redirect', NULL, NULL),
('wx9a865aa77929c654', 'WX', '964a0c8aaacf9ad56016ed023d32208c', 'http://localhost:3000/oauth/wx/redirect', NULL, NULL),
('123456789', 'bbs', 'e10adc3949ba59abbe56e057f20f883e', 'http://localhost:3000/oauth/bbs/redirect', NULL, NULL),
('527345899', 'sina', '372f7194321e5da73661ee13060c8acc', 'http://localhost:3000/oauth/sina/redirect', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `qq_token`
--

CREATE TABLE `qq_token` (
  `access_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

-- --------------------------------------------------------

--
-- 表的结构 `uc_active_email`
--

CREATE TABLE `uc_active_email` (
  `email` varchar(64) NOT NULL,
  `token` varchar(32) NOT NULL,
  `expires` int(11) NOT NULL DEFAULT '86400',
  `reg_date` varchar(15) NOT NULL,
  `is_active` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `uc_oauth2_info`
--

CREATE TABLE `uc_oauth2_info` (
  `oauth2_id` int(11) NOT NULL,
  `oauth2_type` varchar(128) DEFAULT NULL,
  `oauth2_appid` varchar(64) DEFAULT NULL,
  `oauth2_appsecret` varchar(64) DEFAULT NULL,
  `oauth2_callback_url` varchar(256) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `uc_post_email`
--

CREATE TABLE `uc_post_email` (
  `email_id` int(16) NOT NULL,
  `type` varchar(32) DEFAULT NULL,
  `from_username` varchar(256) DEFAULT NULL,
  `from_email` varchar(256) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `text` text,
  `html` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `uc_post_email`
--

INSERT INTO `uc_post_email` (`email_id`, `type`, `from_username`, `from_email`, `subject`, `text`, `html`) VALUES
(1, 'register', 'RT-Thread用户中心', 'xuxuechao@rt-thread.com', '[RT-Thread] 帐户激活通知！', '        \r\n        感谢您注册RT-Thread，您只需要点击下面链接，激活您的帐户，您便可以享受RT-Thread各项业务。\r\n        \r\n        url\r\n        \r\n       (如果无法点击该URL链接地址，请将它复制并粘帖到浏览器的地址输入框，然后单击回车即可。该链接使用后将立即失效。\r\n        \r\n        注意:重复发送激活码，则历史激活码失效。请您在收到邮件24小时进行激活，否则该激活码将会失效。7天后您的帐户将会失效。', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `uc_users`
--

CREATE TABLE `uc_users` (
  `uid` int(10) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `companyName` varchar(128) DEFAULT NULL,
  `companyType` varchar(128) DEFAULT NULL,
  `regdate` int(11) DEFAULT NULL,
  `lastloginip` varchar(16) DEFAULT NULL,
  `lastlogintime` int(11) DEFAULT NULL,
  `salt` varchar(6) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `wx_token`
--

CREATE TABLE `wx_token` (
  `access_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '刷新参数',
  `openid` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户编号',
  `scope` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '作用域',
  `create_at` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '令牌建立时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';

-- --------------------------------------------------------

--
-- 表的结构 `wx_user_info`
--

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
  `unionid` varchar(32) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `oauth2_client`
--
ALTER TABLE `oauth2_client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `uc_oauth2_info`
--
ALTER TABLE `uc_oauth2_info`
  ADD PRIMARY KEY (`oauth2_id`);

--
-- Indexes for table `uc_post_email`
--
ALTER TABLE `uc_post_email`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `uc_users`
--
ALTER TABLE `uc_users`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `wx_user_info`
--
ALTER TABLE `wx_user_info`
  ADD PRIMARY KEY (`openid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `uc_oauth2_info`
--
ALTER TABLE `uc_oauth2_info`
  MODIFY `oauth2_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `uc_post_email`
--
ALTER TABLE `uc_post_email`
  MODIFY `email_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `uc_users`
--
ALTER TABLE `uc_users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
