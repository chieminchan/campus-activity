const express = require('express');
const service = require('../config/mySqlConfig');
const querystring = require('querystring')
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const $sql = require('./activitySql');
const router = express.Router();


// 活动筛选， 返回适合条件的全部活动
router.get('/all', (req, res) => {
    let _sql = `select activity_name, activity_start, activity_end, activity_status, activity_poster_front, activity_poster_back 
                from activities`;
    service.query(_sql)
        .then((data) => {
            res.send(correctRes(data));
        })
        .catch((error) => errorRes(error));
});

// 最新活动
router.get('/latest', (req, res) => {
    service.query($sql.latest)
        .then((data) => {
            res.send(correctRes(data));
        })
        .catch((error) => res.send(errorRes(error)));
});

// 首页活动列表
router.get('/typeLists', (req, res) => {
    const { type } = req.query;
    service.query($sql.typeLists(type))
        .then((data) => {
            res.send(correctRes(data));
        })
        .catch((error) => res.send(errorRes(error)));
});

// 活动详情
router.get('/detail', (req, res) => {

    // 查询活动信息
    const { userId, activityId } = req.query;
    service.query($sql.info(activityId))
        .then((data) => {

            // 将活动信息中的addition转换成json格式
            const formatData = data[0];
            const addition = formatData['activity_addition'];
            formatData['activity_addition'] = querystring.parse(addition, "*", ":");

            // 需合并至最终结果
            const formatResult = Object.assign({}, formatData);

            // 判断是否收藏该帖子
            const collectionStatus = { hasCollection: false };
            service.query($sql.isCollection(userId, activityId))
                .then((data) => {
                    if (data.length !== 0) {
                        collectionStatus.hasCollection = true;
                    }
                    Object.assign(formatResult, collectionStatus)

                    // 判断是否已经报名
                    const enrollStatus = { hasEnroll: false };
                    service.query($sql.isEnroll(userId, activityId))
                        .then((data) => {
                            if (data.length !== 0) {
                                enrollStatus.hasEnroll = true;
                            }
                            Object.assign(formatResult, enrollStatus)

                            // 发送最终结果
                            res.json(correctRes(formatResult));
                        })
                        .catch((error) => res.send(errorRes(error)));
                })
                .catch((error) => res.send(errorRes(error)));
        })
        .catch((error) => res.send(errorRes(error)));
});

// 活动评分 
router.put('/score', (req, res) => {

    //查询活动当前评分
    const { id, score } = req.body.params;
    service.query($sql.nowScore(id))
        .then((data) => {

            // 计算并更新活动评分
            const oldScore = data[0]['activity_score_value'];
            let count = data[0]['activity_score_count'];
            const newScore = (count * oldScore + score) / (count + 1);
            service.query($sql.updateScore(id, newScore, count))
                .catch((error) => errorRes(error));

            res.send(correctRes_msg('update score successfully'));

        })
        .catch((error) => res.send(errorRes(error)));
});

// 活动收藏
router.post('/addCollection', (req, res) => {

    const { userId, activityId } = req.body.params;
    service.query($sql.addCollection(userId, activityId))
        .then(() => {
            res.send(correctRes_msg('add collection successfully'));
        })
        .catch((error) => res.send(errorRes(error)));
});


// 取消活动收藏
router.delete('/removeCollection', (req, res) => {
    const { userId, activityId } = req.query;
    service.query($sql.removeCollection(userId, activityId))
        .then(() => {
            res.send(correctRes_msg('remove collection successfully'));
        })
        .catch((error) => res.send(errorRes(error)));
});


// 活动报名
router.post('/updateEnroll', (req, res) => {
    const { userId, activityId } = req.body.params;
    service.query($sql.addEnroll(userId, activityId))
        .then(() => {
            res.send(correctRes_msg('update enroll successfully'));
        })
        .catch((error) => res.send(errorRes(error)));
});


module.exports = router;