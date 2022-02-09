/*
 Navicat Premium Data Transfer

 Source Server         : campus-activity
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : campus

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 09/02/2022 22:12:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `activity_id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '活动ID',
  `activity_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '活动名称',
  `activity_brief` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '活动简介',
  `activity_creator_id` bigint(20) DEFAULT NULL COMMENT '活动创建者',
  `activity_enroll_deadline` datetime DEFAULT NULL COMMENT '活动报名截止时间',
  `activity_start` date DEFAULT NULL COMMENT '活动开始时间',
  `activity_end` date DEFAULT NULL COMMENT '活动截止时间',
  `activity_address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动地址',
  `activity_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动类型',
  `activity_result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动结果',
  `activity_poster_front` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动海报正面',
  `activity_poster_back` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动海报反面',
  `activity_concat_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动联系人号码',
  `activity_concat_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动联系人',
  `activity_addition` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '活动附加信息',
  `activity_score_value` decimal(2,1) unsigned zerofill DEFAULT NULL COMMENT '活动得分',
  `activity_score_count` int(255) DEFAULT NULL COMMENT '活动评分人数',
  `activity_approver_id` bigint(20) DEFAULT NULL COMMENT '活动审批人',
  `activity_approval_status` varchar(255) DEFAULT NULL COMMENT '活动审批状态',
  `activity_approval_advice` varchar(255) DEFAULT NULL COMMENT '活动审批意见',
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of activities
-- ----------------------------
BEGIN;
INSERT INTO `activities` VALUES (1, '2019年第六届校园简历设计大赛', '2019年第六届校园简历设计大赛', 3, '2019-04-20 00:00:00', '2019-04-21', '2019-05-20', '', 'online', NULL, 'https://i.loli.net/2019/04/28/5cc556c96f81b.jpg', NULL, '13202314824', '陈同学', '%E8%AF%84%E9%80%89%E6%9C%BA%E5%88%B6:1.%E6%B4%BB%E5%8A%A8%E8%AF%84%E9%80%89%E5%B0%86%E5%88%86%E4%B8%BA%E4%B8%93%E5%AE%B6%E8%AF%84%E5%AE%A1%E3%80%81%E5%A4%A7%E8%B5%9B%E7%BB%84%E5%A7%94%E4%BC%9A%E5%A4%8D%E8%AF%84%E4%BA%8C%E7%A7%8D%E8%AF%84%E9%80%89%E6%96%B9%E5%BC%8F%E3%80%822.%E4%B8%93%E5%AE%B6%E8%AF%84%E5%AE%A1%EF%BC%9A%E5%A4%A7%E8%B5%9B%E7%BB%84%E5%A7%94%E4%BC%9A%E5%B0%86%E9%82%80%E8%AF%B7%E8%AE%BE%E8%AE%A1%E5%AD%A6%E9%99%A2%E9%99%A2%E9%95%BF%E3%80%81%E5%9B%BE%E4%B9%A6%E9%A6%86%E9%A6%86%E9%95%BF%E3%80%81%E5%8F%82%E8%B5%9B%E9%AB%98%E6%A0%A1%E5%B0%B1%E4%B8%9A%E5%8A%9E%E6%8C%87%E5%AF%BC%E8%80%81%E5%B8%88%E5%8F%8A%E4%BC%81%E4%B8%9AHR%E8%BF%9B%E8%A1%8C%E5%88%9D%E8%AF%84%EF%BC%8C%E5%A4%A7%E8%B5%9B%E7%BB%84%E5%A7%94%E4%BC%9A%E5%A4%8D%E8%AF%84%E3%80%823.%E4%BD%9C%E5%93%81%E5%88%86%E4%BA%AB%EF%BC%9A%E5%A4%A7%E8%B5%9B%E5%AE%98%E7%BD%91%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E8%8E%B7%E5%BE%97%E7%82%B9%E8%B5%9E%E6%9C%80%E5%A4%9A%E8%80%85%EF%BC%8C%E5%8D%B3%E5%8F%AF%E8%8E%B7%E5%BE%97%E2%80%9C%E4%BA%BA%E6%B0%94%E4%BD%9C%E5%93%81%E5%A5%96%E2%80%9D%E5%8D%95%E9%A1%B9%E5%A5%96%E3%80%82(%E5%A4%A7%E8%B5%9B%E6%B4%BB%E5%8A%A8%E6%9C%9F%E5%86%85%EF%BC%8C%E6%89%80%E6%9C%89%E5%B1%95%E7%A4%BA%E5%8C%BA%E5%9F%9F%E7%9A%84%E4%BD%9C%E5%93%81%E5%8F%AF%E8%BF%9B%E8%A1%8C%E5%88%86%E4%BA%AB%E7%82%B9%E8%B5%9E)4.%E4%BC%98%E7%A7%80%E4%BD%9C%E5%93%81%E5%A5%96%EF%BC%9A%E6%B4%BB%E5%8A%A8%E7%BB%93%E6%9D%9F%E5%90%8E%EF%BC%8C%E6%89%80%E6%9C%89%E5%85%A5%E5%9B%B4%E5%88%B0%E8%AF%84%E5%A7%94%E8%AF%84%E5%AE%A1%E7%8E%AF%E8%8A%82%E7%9A%84%E4%BD%9C%E5%93%81%E5%B0%86%E8%8E%B7%E5%BE%97%E2%80%9C%E4%BC%98%E7%A7%80%E4%BD%9C%E5%93%81%E5%A5%96%E2%80%9D%E3%80%82', 4.4, 17, 4, '1', NULL);
INSERT INTO `activities` VALUES (2, '中国App UI设计大赛1', '一切准备就绪，U你来！', 1, '2019-05-02 00:00:00', '2019-05-16', '2019-06-09', '', 'online', NULL, 'https://i.loli.net/2019/03/19/5c90500e82b5b.png', NULL, '13202314824', '林同学', '', 3.3, 12, 4, '1', NULL);
INSERT INTO `activities` VALUES (3, '防震减灾公益大赛', '用光影讲述地震人和地震有关的故事！', 1, '2019-05-01 00:00:00', '2019-05-10', '2019-05-20', NULL, 'online', NULL, 'https://i.loli.net/2019/03/17/5c8db80696ca5.png', NULL, '13794535844', '林同学', NULL, 5.0, NULL, 6, '1', NULL);
INSERT INTO `activities` VALUES (4, '第十届科技文化艺术节第三届环保设计大赛', '本次环保设计大赛活动不仅可以为保护环境和绿化校园贡献一份属于我们自己的力量!', 2, '2019-02-24 18:00:05', '2019-02-25', '2019-03-08', NULL, 'online', '', 'https://i.loli.net/2019/03/19/5c904f1e55ccd.jpg', '', '13794535844', '林同学', NULL, 4.0, 7, 4, '1', NULL);
INSERT INTO `activities` VALUES (5, '创新工场联合招聘大赛', '这里孵化的不仅仅是项目，还有你！', 3, '2019-04-30 18:00:00', '2019-04-21', '2019-05-18', '惠州学院旭日广场', 'offline', '', 'https://i.loli.net/2019/03/19/5c90514b92b36.jpeg', '', '13201020134', '刘同学', NULL, 4.0, NULL, 6, '1', NULL);
INSERT INTO `activities` VALUES (6, '母亲节活动', '这大胆地向母亲说出你的爱吧！', 3, '2018-05-10 18:00:00', '2018-05-11', '2018-05-22', '', 'online', '', 'https://i.loli.net/2019/03/19/5c90534f3c0ef.jpg', '', '13201020134', '刘同学', NULL, 3.6, 9, 5, '1', NULL);
INSERT INTO `activities` VALUES (7, '粽香端午', '校园端午节活动', 3, '2018-06-14 20:00:00', '2018-06-15', '2018-06-18', '惠州学院少康楼门前', 'offline', '', 'https://i.loli.net/2019/03/19/5c9053516deb0.jpeg', '', '13202314824', '陈同学', NULL, 4.5, NULL, 5, '1', NULL);
INSERT INTO `activities` VALUES (8, '劳模月主题勋章授予活动', '同学们，动起来，带上速度与激情，五月勤奋并快乐着', 1, '2018-04-30 22:00:00', '2018-05-01', '2018-05-20', '惠州学院旭日大楼', 'offline', '', 'https://i.loli.net/2019/03/19/5c905351b6394.jpg', '', '13202314824', '赵同学', NULL, 4.5, NULL, 4, '1', NULL);
INSERT INTO `activities` VALUES (9, '地球一小时，环保齐出力', '全球关灯一小时，为节能减排做出贡献，提高民众的节能环保意识。', 2, '2019-03-25 22:00:00', '2019-03-27', '2019-03-27', '惠州学院大操场', 'offline', '', 'https://i.loli.net/2019/03/19/5c905a5da3b2d.jpg', '', '13202314824', '陈同学', NULL, NULL, NULL, 6, '1', NULL);
INSERT INTO `activities` VALUES (10, '外语文化节', '外语文化节，嗨皮造起来！', 3, '2019-04-19 00:00:00', '2019-04-20', '2019-04-29', '惠州学院旭日大楼5-501', 'offline', '', 'https://i.loli.net/2019/03/19/5c905351f1c6c.jpg', '', '13202314824', '赵同学', NULL, 5.0, NULL, 5, '1', NULL);
INSERT INTO `activities` VALUES (11, '就业考研系列讲座之就业访谈交流会', '就业考研系列讲座之就业访谈交流会', 5, '2019-03-20 17:00:00', '2019-03-22', '2019-03-29', '惠州学院图书馆报告厅', 'offline', NULL, 'https://i.loli.net/2019/03/19/5c905f4e59545.jpg', NULL, '13794535844', '林同学', NULL, 4.5, NULL, 5, '1', NULL);
INSERT INTO `activities` VALUES (12, '礼仪形象培训活动', '礼仪形象培训活动，让自己成为自己的女神！', 3, '2019-04-13 11:00:00', '2019-04-16', '2019-05-25', '惠州学院旭日大楼3-308', 'offline', NULL, 'https://i.loli.net/2019/03/19/5c906066d6790.jpg', NULL, '13202314824', '陈同学', NULL, 4.0, NULL, 6, '1', NULL);
INSERT INTO `activities` VALUES (13, '学习雷锋日', '学习雷锋好榜样', 4, '2019-03-05 00:00:00', '2019-03-05', '2019-03-05', '惠州学院旭日大楼1-112', 'offline', NULL, 'https://i.loli.net/2019/03/19/5c90621fdc945.jpg', NULL, '13201020134', '林老师', NULL, 5.0, NULL, 5, '1', NULL);
INSERT INTO `activities` VALUES (14, '三下乡活动', '三下乡活动', 4, '2019-01-07 00:00:00', '2019-01-14', '2019-01-21', '惠州学院少康楼', 'offline', NULL, 'https://i.loli.net/2019/03/19/5c906221b8204.jpg', NULL, '13201020134', '林老师', NULL, 4.5, NULL, 4, '1', NULL);
INSERT INTO `activities` VALUES (15, '第八届“心语杯”心理知识竞赛', '向同学们普及更多的心理知识，提高同学们的心理素养。', 3, '2019-04-20 18:00:00', '2019-04-20', '2019-05-29', '惠州学院少康楼下', 'offline', NULL, 'https://i.loli.net/2019/03/20/5c91fbbb26128.jpg', '', '13201020134', '刘同学', NULL, 3.5, NULL, 4, '1', NULL);
INSERT INTO `activities` VALUES (16, '惠州学院公益设计大赛', '为了体现设计与校园绿色生态的融合与互动，现面向全校学生发起绿色公益形象设计大赛。', 4, '2019-04-20 00:00:00', '2019-04-22', '2019-05-15', '惠州学院少康楼下', 'online', NULL, 'https://i.loli.net/2019/05/13/5cd8d51b1c46833446.png', NULL, '13201020134', '林老师', NULL, 3.5, NULL, 4, '1', NULL);
INSERT INTO `activities` VALUES (17, '惠州学院勋章设计征集活动', '脑洞大开，设计你想要的勋章图标！', 3, '2019-04-18 11:00:00', '2019-04-19', '2019-05-20', 'undefined', 'online', NULL, 'https://i.loli.net/2019/04/23/5cbe7cbe96ba4.png', NULL, '13201020134', '刘同学', '', NULL, NULL, 5, '1', NULL);
INSERT INTO `activities` VALUES (18, '第二届 “Double life”易起合照吧', '“Double life”，我们易起合照吧！', 1, '2019-04-30 00:00:00', '2019-05-01', '2019-05-08', '惠州学院', 'online', NULL, 'https://i.loli.net/2019/05/02/5ccacca5b5237.png', '', '13202314824', '陈同学', '%E6%B4%BB%E5%8A%A8%E4%BB%8B%E7%BB%8D:%EF%BC%88%E4%B8%80%EF%BC%89%E3%80%81%E4%B8%BB%E5%8A%9E%E5%8D%95%E4%BD%8D%EF%BC%9A%E5%A4%96%E5%9B%BD%E8%AF%AD%E6%98%93%E7%8F%AD%E5%B7%A5%E4%BD%9C%E7%AB%99%E6%8A%80%E6%9C%AF%E9%83%A8%20%20%EF%BC%88%E4%BA%8C%EF%BC%89%E3%80%81%E6%B4%BB%E5%8A%A8%E5%AF%B9%E8%B1%A1%EF%BC%9A%E5%A4%96%E5%9B%BD%E8%AF%AD%E5%AD%A6%E9%99%A2%E5%85%A8%E4%BD%93%E9%9D%9E%E6%AF%95%E4%B8%9A%E7%8F%AD%E5%AD%A6%E7%94%9F*%E6%B4%BB%E5%8A%A8%E5%86%85%E5%AE%B9:1%E3%80%81%E5%88%9D%E8%B5%9B%EF%BC%9A%E7%94%B1%E4%B8%BB%E5%8A%9E%E5%8D%95%E4%BD%8D%E6%A0%B9%E6%8D%AE%E6%A0%87%E5%87%86%E9%80%89%E5%87%BA%E4%BC%98%E7%A7%80%E5%8F%82%E8%B5%9B%E4%BD%9C%E5%93%8120%E5%B9%85%E8%BF%9B%E5%85%A5%E5%86%B3%E8%B5%9B%E3%80%82%20%202%E3%80%81%E5%86%B3%E8%B5%9B%EF%BC%9A%E5%88%86%E7%BA%BF%E4%B8%8A%E6%8A%95%E7%A5%A8%E5%92%8C%E7%BA%BF%E4%B8%8B%E6%8A%95%E7%A5%A8%E4%B8%A4%E9%83%A8%E5%88%86%EF%BC%9B%20%20%20%20%20%20%20%20%E7%BA%BF%E4%B8%8A%E6%8A%95%E7%A5%A8%EF%BC%88%E5%8D%A060%25%EF%BC%89%EF%BC%9A%E4%BA%8E14%E6%97%A5%E6%99%9A%E5%B0%86%E4%BC%98%E7%A7%80%E7%9A%84%E4%BD%9C%E5%93%81%E5%B0%86%E4%BC%9A%E4%BC%A0%E5%88%B0%E6%98%93%E7%8F%ADapp%E8%BF%9B%E8%A1%8C%E6%8A%95%E7%A5%A8%EF%BC%8C16%E3%80%8117%E4%B8%A4%E5%A4%A9%E8%BF%9B%E8%A1%8C%E7%BA%BF%E4%B8%8A%E6%8A%95%E7%A5%A8%EF%BC%9B%20%20%20%20%20%20%20%20%E7%BA%BF%E4%B8%8B%E6%8A%95%E7%A5%A8%EF%BC%88%E5%8D%A040%25%EF%BC%89%EF%BC%9A%E4%BA%8E19%E6%97%A5%EF%BC%88%E5%91%A8%E6%97%A5%EF%BC%89%E5%9C%A8%E6%A0%A1%E9%81%93%E6%91%86%E6%91%8A%EF%BC%8C%E9%80%9A%E8%BF%87%E5%88%9D%E8%B5%9B%E7%9A%84%E5%8F%82%E8%B5%9B%E9%80%89%E6%89%8B%E5%8F%AF%E5%9C%A8%E6%91%8A%E4%BD%8D%E6%88%96%E8%80%85%E5%8F%AC%E5%94%A4%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B0%8F%E4%BC%99%E4%BC%B4%E6%9D%A5%E4%B8%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E4%BD%9C%E5%93%81%E6%8B%89%E7%A5%A8%E3%80%82%20%203%E3%80%81%E8%8E%B7%E5%A5%96%E5%90%8D%E5%8D%95%E7%9F%AD%E4%BF%A1%E9%80%9A%E7%9F%A5%EF%BC%8C%E5%8F%A6%E5%A4%96%E8%BF%9B%E5%85%A5%E5%86%B3%E8%B5%9B%E8%80%85%E5%8F%AF%E5%85%8D%E8%B4%B9%E8%8E%B7%E5%BE%97%E8%87%AA%E5%B7%B1%E7%9A%84%E4%BD%9C%E5%93%81%E7%9A%84%E5%86%B2%E6%B4%97%E7%89%88%E3%80%82*%E6%8A%A5%E5%90%8D%E8%A6%81%E6%B1%82:%E9%80%89%E6%89%8B%E9%80%9A%E8%BF%87%E9%9D%92%E5%B9%B4%E4%B9%8B%E5%A3%B0%E6%8A%A5%E5%90%8D%E4%B8%94%E5%A1%AB%E5%86%99%E5%A5%BD%E7%8F%AD%E9%95%BF%E5%8F%91%E7%9A%84%E6%8A%A5%E5%90%8D%E8%A1%A8%EF%BC%8C5%E6%9C%887%E5%8F%B7%E4%B8%AD%E5%8D%8812%E7%82%B9%E5%89%8D%E7%94%B1%E7%8F%AD%E9%95%BF%E7%BB%9F%E4%B8%80%E5%B0%86%E7%94%B5%E5%AD%90%E6%8A%A5%E5%90%8D%E8%A1%A8%E5%8F%91%E5%88%B0%E2%80%9C%E5%A4%96%E5%9B%BD%E8%AF%AD%E6%98%93%E7%8F%AD%E7%8F%AD%E9%95%BF%E7%BE%A4%E2%80%9D%E3%80%82', NULL, NULL, 4, '2', '活动的作品主题应规定在一定的范围，凸显活动的意义！');
INSERT INTO `activities` VALUES (21, '“青春无畏，逐梦扬威”寻宝撕名牌活动', '青春汗水，团队合作，担当敢拼！', 3, '2019-05-16 00:00:00', '2019-05-16', '2019-05-16', '惠州学院大操场', 'offline', NULL, 'https://i.loli.net/2019/04/20/5cbab203360c2.jpg', NULL, '13202314824', '陈同学', '%E6%B4%BB%E5%8A%A8%E8%B5%9B%E7%A8%8B:%E6%B4%BB%E5%8A%A8%E6%AF%94%E8%B5%9B%E5%88%86%E4%B8%89%E8%BD%AE%EF%BC%8C%E5%86%B3%E8%B5%9B%E6%97%B6%E9%97%B4%E9%9C%80%E6%A0%B9%E6%8D%AE%E6%83%85%E5%86%B5%E8%BF%9B%E4%B8%80%E6%AD%A5%E5%AE%89%E6%8E%92*%E6%B4%BB%E5%8A%A8%E5%BD%93%E5%A4%A9%E5%85%B7%E4%BD%93%E6%B5%81%E7%A8%8B:%EF%BC%881%EF%BC%89%E6%B4%BB%E5%8A%A8%E5%89%8D%E4%B8%80%E4%B8%A4%E4%B8%AA%E5%B0%8F%E6%97%B6%EF%BC%8C%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%91%98%E5%B0%86%E7%9B%B8%E5%85%B3%E7%89%A9%E8%B5%84%E6%90%AC%E8%BF%90%E5%88%B0%E6%B4%BB%E5%8A%A8%E5%9C%BA%E5%9C%B0%E5%B9%B6%E8%BF%9B%E8%A1%8C%E8%A3%85%E9%A5%B0%E3%80%82%20%EF%BC%882%EF%BC%89%E6%B4%BB%E5%8A%A8%E5%89%8D%E5%8D%8A%E5%B0%8F%E6%97%B6%E5%8F%82%E4%B8%8E%E4%BA%BA%E5%91%98%E5%9C%A8%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%91%98%E5%BC%95%E5%AF%BC%E4%B8%8B%E5%85%A5%E5%9C%BA%E5%B9%B6%E9%A2%86%E5%8F%96%E5%90%8D%E7%89%8C%E3%80%82%20%EF%BC%883%EF%BC%89%E6%B4%BB%E5%8A%A8%E5%BC%80%E5%A7%8B%E6%97%B6%E4%B8%BB%E6%8C%81%E4%BA%BA%E8%87%B4%E8%BE%9E%E3%80%81%E4%BB%8B%E7%BB%8D%E6%B4%BB%E5%8A%A8%E8%A7%84%E5%88%99%E5%B9%B6%E4%B8%BA%E5%8F%82%E4%B8%8E%E8%80%85%E8%A7%A3%E7%AD%94%E7%96%91%E6%83%91%E3%80%82%20%EF%BC%884%EF%BC%89%E8%BF%9B%E8%A1%8C%E5%AF%BB%E5%AE%9D%E6%B4%BB%E5%8A%A8%EF%BC%8C%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%91%98%E7%BB%9F%E8%AE%A1%E5%90%84%E9%98%9F%E4%BC%8D%E5%BE%97%E5%88%86%E6%83%85%E5%86%B5%E3%80%82%20%EF%BC%885%EF%BC%89%E8%BF%9B%E8%A1%8C%E6%92%95%E5%90%8D%E7%89%8C%E6%B4%BB%E5%8A%A8%EF%BC%8C%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%91%98%E4%BD%9C%E5%A5%BD%E7%9D%A3%E6%9F%A5%E4%BB%A5%E5%8F%8A%E5%AE%89%E5%85%A8%E4%BF%9D%E9%9A%9C%E3%80%82%20%EF%BC%886%EF%BC%89%E5%AF%B9%E8%A1%A8%E7%8E%B0%E4%BC%98%E5%BC%82%E7%9A%84%E9%98%9F%E4%BC%8D%E8%BF%9B%E8%A1%8C%E9%A2%81%E5%A5%96%E3%80%82%20%EF%BC%887%EF%BC%89%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%91%98%E6%95%B4%E7%90%86%E7%8E%B0%E5%9C%BA%EF%BC%8C%E6%89%93%E6%89%AB%E5%8D%AB%E7%94%9F%EF%BC%8C%E6%B8%85%E6%B4%81%E5%AE%8C%E6%AF%95%E5%90%8E%E7%A6%BB%E5%BC%80%E3%80%82', NULL, NULL, NULL, '0', NULL);
INSERT INTO `activities` VALUES (22, '听阅读大咖讲“我们为什么要读书”', '我们为什么要读书——全民阅读：为了不同目的阅读', 1, '2019-05-05 00:00:00', '2019-05-16', '2019-05-20', '图书馆报告厅', 'offline', NULL, 'https://i.loli.net/2019/05/13/5cd920648ee6175003.jpg', 'https://i.loli.net/2019/05/13/5cd91ee85eb7693471.jpg', '2777888', '李老师', '%E4%BD%9C%E8%80%85%E4%BB%8B%E7%BB%8D:%E5%85%A8%E6%B0%91%E9%98%85%E8%AF%BB%E2%80%9D%E8%BF%99%E4%B8%AA%E8%AF%9D%E9%A2%98%E7%9A%84%E5%87%BA%E7%8E%B0%EF%BC%8C%E4%B8%8E%E8%81%82%E9%9C%87%E5%AE%81%E6%9C%89%E7%9D%80%E6%9E%81%E5%A4%A7%E7%9A%84%E5%85%B3%E7%B3%BB%E3%80%82%E4%BB%96%E6%98%AF%E4%BD%9C%E5%AE%B6%EF%BC%8C%E5%85%B6%E4%B8%93%E8%91%97%E3%80%8A%E9%98%85%E8%AF%BB%E5%8A%9B%E3%80%8B%E5%85%A5%E9%80%892017%E5%B9%B4%E2%80%9C%E5%8F%97%E5%A4%A7%E4%BC%97%E5%96%9C%E7%88%B1%E7%9A%8450%E6%9C%AC%E5%A5%BD%E4%B9%A6%E2%80%9D%EF%BC%8C%E5%B0%8F%E8%AF%B4%E3%80%8A%E9%95%BF%E4%B9%90%E3%80%8B%E5%8F%97%E5%88%B0%E8%91%97%E5%90%8D%E4%BD%9C%E5%AE%B6%E7%8E%8B%E8%92%99%E7%9B%9B%E8%B5%9E%EF%BC%9B%E4%BB%96%E6%98%AF%E5%87%BA%E7%89%88%E7%95%8C%E5%BD%93%E4%B9%8B%E6%97%A0%E6%84%A7%E7%9A%84%E5%A4%A7%E5%92%96%EF%BC%8C%E5%8F%88%E6%98%AF%E5%85%A8%E6%B0%91%E9%98%85%E8%AF%BB%E7%9A%84%E2%80%9C%E9%A2%86%E8%AF%BB%E8%80%85%E2%80%9D%EF%BC%8C%E8%BF%98%E6%98%AF%E4%B8%AD%E5%9B%BD%E5%87%BA%E7%89%88%E5%8D%8F%E4%BC%9A%E5%89%AF%E7%90%86%E4%BA%8B%E9%95%BF%EF%BC%8C%E5%85%BC%E4%BB%BB%E4%B8%AD%E5%9B%BD%E4%BC%A0%E5%AA%92%E5%A4%A7%E5%AD%A6%E5%8D%9A%E5%A3%AB%E7%A0%94%E7%A9%B6%E7%94%9F%E5%AF%BC%E5%B8%88%E3%80%81%E5%8D%97%E4%BA%AC%E5%A4%A7%E5%AD%A6%E5%87%BA%E7%89%88%E7%A0%94%E7%A9%B6%E9%99%A2%E9%99%A2%E9%95%BF%E3%80%82', NULL, NULL, 6, '1', '');
INSERT INTO `activities` VALUES (23, '第七届大学生原创心理漫画大赛', '进一步丰富、创新高校大学生心理健康教育的形式和方法，调动大学生参与心理健康的积极性和主动性！', 9, '2019-05-06 00:00:00', '2019-05-08', '2019-05-11', NULL, 'online', NULL, 'https://i.loli.net/2019/04/20/5cbad2561bc56.jpg', NULL, '2223333', '陈同学', '%E6%B4%BB%E5%8A%A8%E5%BC%80%E5%B1%95%E6%B5%81%E7%A8%8B:%E4%BD%9C%E5%93%81%E5%88%86%E4%B8%BA%E6%BC%AB%E7%94%BB%E4%BD%9C%E5%93%81%E3%80%81%E7%BB%98%E7%94%BB%E4%BD%9C%E5%93%81%E7%AD%892%E7%A7%8D%E7%B1%BB%E5%9E%8B%EF%BC%8C%E4%BD%9C%E5%93%81%E8%A6%81%E5%8F%8D%E6%98%A0%E5%A4%A7%E5%AD%A6%E7%94%9F%E8%87%AA%E5%B0%8A%E3%80%81%E8%87%AA%E4%BF%A1%E3%80%81%E8%87%AA%E5%BC%BA%E3%80%81%E8%87%AA%E7%88%B1%E7%9A%84%E8%87%AA%E6%88%91%E6%84%8F%E8%AF%86%EF%BC%8C%E5%8B%87%E4%BA%8E%E5%85%8B%E6%9C%8D%E5%9B%B0%E9%9A%BE%E7%9A%84%E5%9D%9A%E5%BC%BA%E6%84%8F%E5%BF%97%EF%BC%8C%E5%A4%A7%E8%83%86%E5%88%9B%E6%96%B0%E5%88%9B%E4%B8%9A%E6%95%A2%E4%B8%BA%E4%BA%BA%E5%85%88%E7%9A%84%E7%B2%BE%E7%A5%9E%EF%BC%8C%E8%84%9A%E8%B8%8F%E5%AE%9E%E5%9C%B0%E8%BF%BD%E6%B1%82%E5%B9%B8%E7%A6%8F%E4%BA%BA%E7%94%9F%E6%A2%A6%E6%83%B3%E7%9A%84%E7%B2%BE%E7%A5%9E%E9%A3%8E%E8%B2%8C%EF%BC%9B%E6%80%9D%E6%83%B3%E7%A7%AF%E6%9E%81%E5%81%A5%E5%BA%B7%EF%BC%8C%E4%B8%BB%E9%A2%98%E9%B2%9C%E6%98%8E%EF%BC%8C%E5%85%B7%E6%9C%89%E8%BE%83%E9%AB%98%E7%9A%84%E5%AE%A1%E7%BE%8E%E6%80%A7%E5%92%8C%E5%BF%83%E7%90%86%E5%81%A5%E5%BA%B7%E6%95%99%E8%82%B2%E7%9A%84%E6%84%8F%E8%AF%86*%E4%BD%9C%E5%93%81%E8%A6%81%E6%B1%82:%E2%91%A0%E4%BD%9C%E5%93%81%E5%BF%85%E9%A1%BB%E6%98%AF%E5%9C%A8%E6%A0%A1%E5%A4%A7%E5%AD%A6%E7%94%9F%E8%87%AA%E5%B7%B1%E5%8E%9F%E5%88%9B%E7%9A%84%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%98%AF%E4%B8%AA%E4%BA%BA%E6%88%96%E8%80%85%E6%98%AF%E9%9B%86%E4%BD%93%E5%88%9B%E4%BD%9C%EF%BC%9B%E2%91%A1%E4%BD%9C%E5%93%81%E5%8F%AF%E4%BB%A5%E6%98%AF%E5%8D%95%E5%B9%85%E7%9A%84%EF%BC%8C%E4%B9%9F%E5%8F%AF%E4%BB%A5%E6%98%AF%E8%BF%9E%E7%8E%AF%E7%94%BB%EF%BC%88%E4%BD%9C%E5%93%81%E9%9C%80%E5%9C%A8%E5%90%8C%E4%B8%80%E7%BA%B8%E5%BC%A0%E4%B8%8A%EF%BC%89%EF%BC%8C%E8%A6%81%E6%B1%82%E6%A0%87%E6%98%8E%E9%A1%B5%E6%95%B0%EF%BC%9B%E4%BD%9C%E5%93%81%E5%8F%AF%E4%BB%A5%E6%98%AF%E5%BD%A9%E8%89%B2%E7%9A%84%EF%BC%8C%E4%B9%9F%E5%8F%AF%E4%BB%A5%E6%98%AF%E5%8D%95%E8%89%B2%E7%9A%84%EF%BC%8C%E8%A6%81%E6%B1%82%E7%94%BB%E9%9D%A2%E6%B8%85%E6%99%B0%EF%BC%8C%E6%95%B4%E6%B4%81%E5%B9%B2%E5%87%80%E3%80%81%E6%B2%A1%E6%9C%89%E7%A0%B4%E6%8D%9F%EF%BC%9B%20%E2%91%A2%E4%BD%9C%E5%93%81%E5%BF%85%E9%A1%BB%E4%B8%BA%E7%BA%B8%E8%B4%A8%E6%89%8B%E7%BB%98%EF%BC%8C%E8%A6%81%E4%BD%BF%E7%94%A8%E6%A0%87%E5%87%86%E7%BB%98%E5%9B%BE%E7%BA%B8%E5%BC%A0%E6%88%96%E6%BC%AB%E7%94%BB%E5%8E%9F%E7%A8%BF%E7%BA%B8%2C%20%E4%BD%9C%E5%93%81%E5%B0%BA%E5%AF%B8%E6%9C%80%E5%B0%8F%E4%B8%BA40cm%20%C3%9740cm%EF%BC%8C%E6%9C%80%E5%A4%A7%E4%B8%8D%E8%B6%85%E8%BF%8770cm%C3%9744cm%EF%BC%8C%E7%94%BB%E7%A8%BF%E5%9B%9B%E5%91%A8%E8%AF%B7%E4%BF%9D%E7%95%99%E5%90%842cm%E7%A9%BA%E7%99%BD%E3%80%82', NULL, NULL, NULL, '0', NULL);
INSERT INTO `activities` VALUES (48, '活动1111', '111', 1, '2019-05-16 00:00:00', '2019-05-29', '2019-05-31', '', 'online', NULL, 'https://i.loli.net/2019/05/15/5cdb6fb2c91f420253.jpg', '', '1123444', '陈', '', NULL, NULL, 6, '2', '完善');
COMMIT;

-- ----------------------------
-- Table structure for activity_works
-- ----------------------------
DROP TABLE IF EXISTS `activity_works`;
CREATE TABLE `activity_works` (
  `work_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `work_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `work_brief` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `work_content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `work_activity_id` bigint(20) DEFAULT NULL,
  `work_author_id` int(11) DEFAULT NULL,
  `work_front_img` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `work_back_img` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of activity_works
-- ----------------------------
BEGIN;
INSERT INTO `activity_works` VALUES (2, '我的简历', '我的简历', '', 1, 1, 'https://i.loli.net/2019/04/20/5cbafd5d1ea81.jpg', 'undefined');
INSERT INTO `activity_works` VALUES (3, '我的简历', '我的简历', 'eeeeeeee', 17, 1, 'https://i.loli.net/2019/04/28/5cc5563770a00.jpg', 'undefined');
INSERT INTO `activity_works` VALUES (4, '汶川-重生', '愿生者生生不息前行', '', 3, 1, 'https://i.loli.net/2019/05/13/5cd8e852ac87927014.png', NULL);
INSERT INTO `activity_works` VALUES (5, '迎光而行', '迎光而前行，背后是援助的爱心', '', 3, 2, 'https://i.loli.net/2019/05/13/5cd8e89928bd820540.jpg', NULL);
INSERT INTO `activity_works` VALUES (6, '不会倒下', '再大的困难，我们都不会倒下！', NULL, 3, 3, 'https://i.loli.net/2019/05/13/5cd8e89c9d59128637.jpg', NULL);
INSERT INTO `activity_works` VALUES (7, '韧性城市', '韧性城市，减灾有我', NULL, 3, 7, 'https://i.loli.net/2019/05/13/5cd8e8b060b1051341.jpg', NULL);
INSERT INTO `activity_works` VALUES (8, '众志成城', '这里需要我，所以我来了！', NULL, 3, 8, 'https://i.loli.net/2019/05/13/5cd8e87b64a4362120.jpg', NULL);
INSERT INTO `activity_works` VALUES (9, '梦想', '虽然我失去了腿，但我还有梦想。', NULL, 3, 9, 'https://i.loli.net/2019/05/13/5cd8e8c6e063872594.jpg', NULL);
INSERT INTO `activity_works` VALUES (10, '点亮生命中的光', '是你们，保卫了我们的安全。', NULL, 3, 10, 'https://i.loli.net/2019/05/13/5cd8e8b9173ac91004.jpg', NULL);
INSERT INTO `activity_works` VALUES (11, '互助抗震', '一方有难，八方支援', NULL, 3, 12, 'https://i.loli.net/2019/05/13/5cd8e87b64a4362120.jpg', NULL);
COMMIT;

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `collection_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `activity_id` bigint(20) NOT NULL,
  PRIMARY KEY (`collection_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of collections
-- ----------------------------
BEGIN;
INSERT INTO `collections` VALUES (2, 1, 2);
INSERT INTO `collections` VALUES (4, 1, 8);
INSERT INTO `collections` VALUES (6, 2, 8);
INSERT INTO `collections` VALUES (8, 1, 7);
INSERT INTO `collections` VALUES (9, 1, 16);
INSERT INTO `collections` VALUES (10, 1, 1);
INSERT INTO `collections` VALUES (22, 1, 3);
INSERT INTO `collections` VALUES (23, 1, 22);
COMMIT;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `comment_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '评论内容',
  `comment_activity_id` bigint(20) DEFAULT NULL COMMENT '评论对应的帖子id',
  `comment_user_id` bigint(20) DEFAULT NULL COMMENT '评论人id',
  `comment_time` datetime DEFAULT NULL COMMENT '评论时间',
  `comment_status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '评论状态（已读、未读）',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES (1, '这个简历设计比赛真的不错！', 1, 2, '2019-03-12 14:58:54', NULL);
INSERT INTO `comments` VALUES (2, '期待这个比赛哦！！', 1, 3, '2019-03-14 14:59:34', NULL);
INSERT INTO `comments` VALUES (3, '哇哇哇～', 1, 8, '2019-04-01 23:36:16', NULL);
INSERT INTO `comments` VALUES (11, '我来报名啦！！！！', 2, 1, '2019-04-08 20:38:38', 'unread');
INSERT INTO `comments` VALUES (12, '请问要提交怎么样的电子作品呢？？', 6, 1, '2019-04-08 20:39:46', 'unread');
INSERT INTO `comments` VALUES (13, '期待鸭～～～', 9, 1, '2019-04-08 20:40:29', 'unread');
INSERT INTO `comments` VALUES (14, '哈哈哈', 9, 1, '2019-04-08 22:08:12', 'unread');
INSERT INTO `comments` VALUES (20, 'wow！！期待鸭！', 12, 7, '2019-04-09 15:11:46', 'unread');
INSERT INTO `comments` VALUES (21, '哇，感觉好有意义哦！', 8, 1, '2019-04-14 15:51:17', 'unread');
INSERT INTO `comments` VALUES (22, '哎哟，不错哦～', 8, 2, '2019-04-14 15:53:10', 'unread');
INSERT INTO `comments` VALUES (26, '好期待哦！是直接报名就可以了吗！？', 22, 1, '2019-05-19 23:12:03', 'unread');
COMMIT;

-- ----------------------------
-- Table structure for enrolls
-- ----------------------------
DROP TABLE IF EXISTS `enrolls`;
CREATE TABLE `enrolls` (
  `enroll_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `activity_id` bigint(20) NOT NULL,
  PRIMARY KEY (`enroll_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of enrolls
-- ----------------------------
BEGIN;
INSERT INTO `enrolls` VALUES (1, 1, 1);
INSERT INTO `enrolls` VALUES (2, 1, 2);
INSERT INTO `enrolls` VALUES (4, 1, 4);
INSERT INTO `enrolls` VALUES (7, 1, 12);
INSERT INTO `enrolls` VALUES (8, 1, 17);
INSERT INTO `enrolls` VALUES (9, 2, 3);
INSERT INTO `enrolls` VALUES (10, 3, 1);
INSERT INTO `enrolls` VALUES (11, 3, 2);
INSERT INTO `enrolls` VALUES (12, 3, 3);
INSERT INTO `enrolls` VALUES (13, 7, 1);
INSERT INTO `enrolls` VALUES (14, 7, 2);
INSERT INTO `enrolls` VALUES (15, 7, 3);
INSERT INTO `enrolls` VALUES (16, 8, 1);
INSERT INTO `enrolls` VALUES (17, 8, 2);
INSERT INTO `enrolls` VALUES (18, 8, 3);
INSERT INTO `enrolls` VALUES (19, 9, 1);
INSERT INTO `enrolls` VALUES (20, 9, 2);
INSERT INTO `enrolls` VALUES (21, 9, 3);
INSERT INTO `enrolls` VALUES (22, 10, 2);
INSERT INTO `enrolls` VALUES (23, 10, 3);
INSERT INTO `enrolls` VALUES (24, 11, 1);
INSERT INTO `enrolls` VALUES (25, 11, 2);
INSERT INTO `enrolls` VALUES (26, 11, 3);
INSERT INTO `enrolls` VALUES (27, 12, 3);
INSERT INTO `enrolls` VALUES (28, 13, 1);
INSERT INTO `enrolls` VALUES (29, 13, 2);
INSERT INTO `enrolls` VALUES (30, 13, 3);
INSERT INTO `enrolls` VALUES (31, 17, 1);
INSERT INTO `enrolls` VALUES (32, 17, 2);
INSERT INTO `enrolls` VALUES (33, 17, 3);
INSERT INTO `enrolls` VALUES (34, 18, 1);
INSERT INTO `enrolls` VALUES (35, 18, 2);
INSERT INTO `enrolls` VALUES (36, 18, 3);
INSERT INTO `enrolls` VALUES (37, 1, 16);
INSERT INTO `enrolls` VALUES (38, 1, 3);
COMMIT;

-- ----------------------------
-- Table structure for feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feedback_creator` bigint(20) DEFAULT NULL,
  `feedback_content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `feedback_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `feedback_time` datetime DEFAULT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of feedbacks
-- ----------------------------
BEGIN;
INSERT INTO `feedbacks` VALUES (1, 4, '22222', 'others', '2019-04-23 17:00:30');
INSERT INTO `feedbacks` VALUES (2, 4, 'TETTTT', 'ui', '2019-04-23 17:01:00');
INSERT INTO `feedbacks` VALUES (3, 4, '33333', 'ui', '2019-04-23 17:06:43');
INSERT INTO `feedbacks` VALUES (4, 1, '页面动态效果。。', 'ui', '2019-05-13 14:46:25');
INSERT INTO `feedbacks` VALUES (5, 1, '呜呜呜呜', 'ui', '2019-05-14 16:47:34');
INSERT INTO `feedbacks` VALUES (6, 1, '111', 'feature', '2019-05-15 02:06:17');
INSERT INTO `feedbacks` VALUES (7, 1, 'xxxxx', 'feature', '2019-05-15 09:13:19');
INSERT INTO `feedbacks` VALUES (8, 1, 'xxxx', 'feature', '2019-05-15 09:48:58');
COMMIT;

-- ----------------------------
-- Table structure for replies
-- ----------------------------
DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `reply_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '回复id',
  `reply_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '回复内容',
  `reply_comment_id` bigint(20) DEFAULT NULL COMMENT '回复所对应的评论id',
  `reply_user_id` bigint(20) DEFAULT NULL COMMENT '回复人id',
  `reply_time` datetime DEFAULT NULL COMMENT '回复时间',
  `reply_target_id` bigint(20) DEFAULT NULL COMMENT '回复的目标',
  `reply_status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '回复状态（已读、未读））',
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of replies
-- ----------------------------
BEGIN;
INSERT INTO `replies` VALUES (1, ' 我也觉得棒棒哒！', 1, 1, '2019-02-14 15:58:56', 2, 'read');
INSERT INTO `replies` VALUES (8, '哈哈哈哈', 3, 1, '2019-04-08 23:24:57', 8, 'unread');
INSERT INTO `replies` VALUES (11, '好像是文件类型的吧？', 12, 7, '2019-04-09 14:15:45', 1, 'unread');
INSERT INTO `replies` VALUES (19, '哈哈哈，我们一起报名吧！！', 20, 1, '2019-04-09 15:12:29', 7, 'unread');
INSERT INTO `replies` VALUES (20, '我也觉得！！我们一起参加吧～～', 21, 3, '2019-04-14 15:51:48', 1, 'unread');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_sex` varchar(2) DEFAULT NULL,
  `user_grade` int(10) DEFAULT NULL,
  `user_department` varchar(50) DEFAULT NULL,
  `user_profession` varchar(50) DEFAULT NULL,
  `user_class` int(5) DEFAULT NULL,
  `user_password` varchar(50) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `user_id` (`user_account`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, '1505120102101', '陈洁敏', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13202314824', 'student');
INSERT INTO `users` VALUES (2, '1505120102119', '林大祥', '男', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13794535844', 'student');
INSERT INTO `users` VALUES (3, '1505120102123', '刘小珍', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13223400000', 'student');
INSERT INTO `users` VALUES (4, '101011', '张明明', '女', NULL, NULL, NULL, NULL, '123321', '13713670000', 'manager');
INSERT INTO `users` VALUES (5, '101012', '林婷婷', '女', NULL, NULL, NULL, NULL, '123321', '13710223400', 'manager');
INSERT INTO `users` VALUES (6, '202011', '超级管理员', '男', NULL, NULL, NULL, NULL, '123321', '13710223400', 'root');
INSERT INTO `users` VALUES (7, '1505120102102', '陈婷婷', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13228877542', 'student');
INSERT INTO `users` VALUES (8, '1505120102139', '郑大如', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13228877542', 'student');
INSERT INTO `users` VALUES (9, '1505120102103', '不拿拿', '男', 2016, '数学与大数据学院', '应用统计学', 1, '123321', '13228877542', 'student');
INSERT INTO `users` VALUES (10, '1505120102103', '黄静静', '女', 2016, '数学与大数据学院', '应用统计学', 2, '123321', '13228877542', 'student');
INSERT INTO `users` VALUES (11, '1505120302121', '刘小强', '男', 2016, '数学与大数据学院', '应用数学', 1, '123321', '13121214124', 'student');
INSERT INTO `users` VALUES (12, '1505120602119', '彭黑黑', '男', 2015, '数学与大数据学院', '应用数学', 2, '123321', '13794214534', 'student');
INSERT INTO `users` VALUES (13, '1505120102123', '刘哈哈', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13223400002', 'student');
INSERT INTO `users` VALUES (14, '101013', '刘一明', '男', NULL, NULL, NULL, NULL, '123321', '13710002234', 'manager');
INSERT INTO `users` VALUES (15, '101014', '黄小玲', '女', NULL, NULL, NULL, NULL, '123321', '13510223010', 'manager');
INSERT INTO `users` VALUES (16, '202011', '超级管理员', '男', NULL, NULL, NULL, NULL, '123321', '13710022234', 'root');
INSERT INTO `users` VALUES (17, '1505120102102', '黄婷婷', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13228877542', 'student');
INSERT INTO `users` VALUES (18, '1505120102139', '邓如', '女', 2015, '数学与大数据学院', '信息管理与信息系统', 1, '123321', '13228877542', 'student');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
