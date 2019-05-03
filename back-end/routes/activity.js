const express = require('express');
const moment = require('moment');
const querystring = require('querystring');
const formidable = require('formidable');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const $sql = require('./activitySql');
const router = express.Router();

// 活动筛选， 返回适合条件的全部活动
router.get('/all', async (req, res) => {
    try {
        const { activityType, activityStatus, currentPage, pageSize } = req.query;
        const count = await service.query($sql.all(activityType, activityStatus, currentPage, pageSize).count);
        const rows = await service.query($sql.all(activityType, activityStatus, currentPage, pageSize).detail);
        const results = { data: rows, total: count[0]['count(*)'] };
        res.send(correctRes(results));
    } catch (error) {
        res.send(errorRes(error.message));
    }
})

// 最新活动
router.get('/latest', async (req, res) => {
    try {
        const rows = await service.query($sql.latest);
        res.send(correctRes(rows));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 首页活动列表
router.get('/typeLists', async (req, res) => {
    try {
        const { type } = req.query;
        const rows = await service.query($sql.typeLists(type));
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        rows.map((item) => {
            const endTime = item.activity_end;
            const startTime = item.activity_start;
            if (endTime < now) {
                item.current_status = 'over';
            } else if (endTime > now && startTime < now) {
                item.current_status = 'processing';
            } else {
                item.current_status = 'waitting';
            }
        });
        res.send(correctRes(rows));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动详情
router.get('/detail', async (req, res) => {
    try {
        // 查询活动信息
        const { userId, activityId } = req.query;
        const activityInfo = await service.query($sql.info(activityId));

        // 将活动信息中的addition转换成json格式
        const formatData = activityInfo[0];
        const addition = formatData['activity_addition'];
        formatData['activity_addition'] = querystring.parse(addition, "*", ":");

        // 活动状态
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const endTime = formatData.activity_end;
        const startTime = formatData.activity_start;
        if (endTime < now) {
            formatData.current_status = 'over';
        } else if (endTime > now && startTime < now) {
            formatData.current_status = 'processing';
        } else {
            formatData.current_status = 'waitting';
        }

        // 判断是否收藏该帖子
        const collectionStatus = { hasCollection: false };
        const hasCollections = await service.query($sql.isCollection(userId, activityId));
        if (hasCollections.length !== 0) {
            collectionStatus.hasCollection = true;
        }
        Object.assign(formatData, collectionStatus);

        // 判断是否已经报名
        const enrollStatus = { hasEnroll: false };
        const isEnroll = await service.query($sql.isEnroll(userId, activityId));
        if (isEnroll.length !== 0) {
            enrollStatus.hasEnroll = true;
        }
        Object.assign(formatData, enrollStatus);

        // 发送最终结果
        res.send(correctRes(formatData));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动评论和回复
router.get('/comments', async (req, res) => {
    try {
        //活动评论信息
        const { activityId } = req.query;
        const commentData = await service.query($sql.comments(activityId));

        //查询每条评论对应的回复信息
        const length = commentData.length;
        for (let i = 0; i < length; i++) {
            const commentId = commentData[i].comment_id;
            const replyData = await service.query($sql.replies(commentId));
            commentData[i]['replyInfo'] = replyData;
        }
        res.send(correctRes(commentData));

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 发表活动评论
router.post('/comment/new', async (req, res) => {
    try {
        const { activityId, userId, commentContent, commentTime } = req.body.params;
        await service.query($sql.addComment(userId, activityId, commentContent, commentTime));
        res.send(correctRes_msg('update comment successfully'));

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 回复活动评论
router.post('/reply/new', async (req, res) => {
    try {
        const { replyCommentId, userId, targetId, replyContent, replyTime } = req.body.params;
        await service.query($sql.addReply(userId, targetId, replyCommentId, replyContent, replyTime));
        res.send(correctRes_msg('update reply successfully'));

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动评分
router.put('/score', async (req, res) => {
    try {
        //查询活动当前评分信息
        const { activityId, score } = req.body.params;
        const scoreInfo = await service.query($sql.nowScore(activityId));

        // 获取旧的评分人数和分数，计算并更新活动评分
        const oldScore = scoreInfo[0]['activity_score_value'];
        let count = scoreInfo[0]['activity_score_count'];
        const newScore = (count * oldScore + score) / (count + 1);
        await service.query($sql.updateScore(activityId, newScore, count));
        res.send(correctRes_msg('update score successfully'));

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动收藏
router.post('/addCollection', async (req, res) => {
    try {
        const { userId, activityId } = req.body.params;
        await service.query($sql.addCollection(userId, activityId));
        res.send(correctRes_msg('add collection successfully'));

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 取消活动收藏
router.delete('/removeCollection', async (req, res) => {
    try {
        const { userId, activityId } = req.query;
        await service.query($sql.removeCollection(userId, activityId));
        res.send(correctRes_msg('remove collection successfully'));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动报名
router.post('/updateEnroll', async (req, res) => {
    try {
        const { userId, activityId } = req.body.params;
        await service.query($sql.addEnroll(userId, activityId));
        res.send(correctRes_msg('update enroll successfully'));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动作品上传
router.post('/postWork', async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        await form.parse(req, (err, data) => {
            service.query($sql.addWork(data))
                .then(() => {
                    res.send(correctRes_msg('add activity work successfully'));
                })
                .catch((error) => {
                    res.send(errorRes(error.message));
                })
        });

    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 活动报名名单导出
router.get('/downloadEnrolls', async(req, res) => {
    const { activityId } = req.query;
    const rows = await service.query($sql.enrolledList(activityId));
    
});

module.exports = router;