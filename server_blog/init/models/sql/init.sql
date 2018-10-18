/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 80011
 Source Host           : localhost
 Source Database       : HoTao_blog

 Target Server Version : 80011
 File Encoding         : utf-8

 Date: 10/18/2018 11:30:43 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `aid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章自增id',
  `id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章标题',
  `category_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类id',
  `create_time` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建时间',
  `delete_time` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '删除时间',
  `update_time` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '修改时间',
  `publish_time` int(13) DEFAULT NULL COMMENT '发布时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态（0：已删除，1：草稿，2：已发布）',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章内容',
  `html_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章内容（html）',
  `cover` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章封面',
  `dec` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章简介',
  `pageview` int(11) DEFAULT '0' COMMENT '浏览量',
  `isSecret` int(1) DEFAULT NULL COMMENT '是否加密',
  PRIMARY KEY (`aid`,`id`) USING BTREE,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `article_tag_mapper`
-- ----------------------------
DROP TABLE IF EXISTS `article_tag_mapper`;
CREATE TABLE `article_tag_mapper` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '增值ID',
  `article_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '文章ID',
  `tag_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '分类ID',
  `create_time` varchar(13) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '分类ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '分类名称',
  `create_time` varchar(13) NOT NULL COMMENT '创建时间',
  `update_time` varchar(13) DEFAULT NULL COMMENT '修改时间',
  `status` int(1) DEFAULT NULL COMMENT '状态（0：已删除，1：正常）',
  `article_count` int(11) DEFAULT '0' COMMENT '当前分类的文章数量',
  `can_del` int(1) DEFAULT NULL COMMENT '能否删除当前分类',
  PRIMARY KEY (`cid`,`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `article_id` varchar(128) NOT NULL COMMENT '文章ID',
  `parent_id` int(10) NOT NULL DEFAULT '0' COMMENT '评论父ID',
  `reply_id` int(10) DEFAULT NULL COMMENT '回复ID',
  `name` varchar(255) NOT NULL COMMENT '评论者的名字',
  `email` varchar(128) DEFAULT NULL COMMENT '评论者的邮箱',
  `content` text NOT NULL COMMENT '评论内容（处理后）',
  `source_content` text COMMENT '评论内容å®¹ï¼',
  `create_time` varchar(13) NOT NULL COMMENT '创建时间',
  `delete_time` varchar(13) DEFAULT NULL COMMENT '删除时间',
  `status` int(1) DEFAULT '0' COMMENT '状态（0：已删除，1：正常）',
  `is_author` int(1) DEFAULT NULL COMMENT '是否是作者（0：否，1：是）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `friends`
-- ----------------------------
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `aid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `friend_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '友链ID',
  `name` varchar(255) NOT NULL COMMENT '友链名字',
  `url` text NOT NULL COMMENT '友链地址',
  `create_time` int(13) NOT NULL COMMENT '创建时间',
  `update_time` int(13) DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(13) DEFAULT NULL COMMENT '删除时间',
  `status` bit(1) NOT NULL DEFAULT b'0' COMMENT '状态（0：已删除，1：正常）',
  `type_id` int(11) NOT NULL DEFAULT '0' COMMENT '分类ID',
  PRIMARY KEY (`aid`,`friend_id`) USING BTREE,
  UNIQUE KEY `friend_id` (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `friends_type`
-- ----------------------------
DROP TABLE IF EXISTS `friends_type`;
CREATE TABLE `friends_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '友链分类名字',
  `count` int(11) DEFAULT '0' COMMENT '当前分类数量',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `pages`
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `type` varchar(128) NOT NULL COMMENT 'page类型',
  `md` text COMMENT 'markdown内容',
  `html` text COMMENT 'html内容（md转html）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sys_log`
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `time` varchar(13) NOT NULL COMMENT '创建时间',
  `content` text COMMENT '系统消息内容',
  `ip` varchar(30) DEFAULT NULL COMMENT 'IP',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `tid` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '标签ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '标签名称',
  `create_time` varchar(13) NOT NULL COMMENT '创建时间',
  `update_time` varchar(13) DEFAULT NULL COMMENT '修改时间',
  `status` int(1) DEFAULT NULL COMMENT '状态（0：已删除，1：正常）',
  `article_count` int(11) DEFAULT '0' COMMENT '当前标签的文章数量',
  PRIMARY KEY (`tid`,`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `aid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `create_time` varchar(13) NOT NULL COMMENT '创建时间',
  `status` varchar(1) NOT NULL COMMENT '账号状态',
  `last_login_time` varchar(13) DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`aid`,`user_id`) USING BTREE,
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `web_config`
-- ----------------------------
DROP TABLE IF EXISTS `web_config`;
CREATE TABLE `web_config` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `blog_name` varchar(255) DEFAULT NULL COMMENT '博客名称',
  `avatar` text COMMENT '博客头像',
  `sign` text COMMENT '博客简介',
  `wxpay_qrcode` text COMMENT '微信二维码',
  `alipay_qrcode` text COMMENT '支付宝二维码',
  `github` text COMMENT 'github地址',
  `view_password` varchar(255) DEFAULT NULL COMMENT '文章加密密码',
  `salt` varchar(255) DEFAULT NULL COMMENT '秘钥（多余的，后面看情况删掉）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
