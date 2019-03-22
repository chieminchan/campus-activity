const express = require('express');
const service = require('../config/mySqlConfig');
const querystring = require('querystring')
const {
  errorRes,
  correctRes,
  correctRes_msg
} = require('../config/responseFormat');
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
  let _sql = 'select activity_id, activity_name, activity_poster_front from activities order by activity_start desc limit 2';
  service.query(_sql)
    .then((data) => {
      res.send(correctRes(data));
    })
    .catch((error) => res.send(errorRes(error)));
});

// 首页活动列表
router.get('/typeLists', (req, res) => {
  const {
    type
  } = req.query;
  let _sql = `select activity_id, activity_name, activity_brief, activity_enroll_deadline, 
                  activity_start, activity_end, activity_status, activity_poster_front 
                from activities 
                where activity_type = '${type}'
                order by activity_status desc`;

  service.query(_sql)
    .then((data) => {
      res.send(correctRes(data));
    })
    .catch((error) => res.send(errorRes(error)));
});

// 活动详情
router.get('/detail', (req, res) => {

  // 查询活动详情
  const {
    userId,
    activityId
  } = req.query;
  let _sql = `select * 
                from activities 
                where activity_id = '${activityId}'`;

  service.query(_sql)
    .then((data) => {

      // 将活动详情中的addition转换成json格式
      const formatData = data[0];
      const addition = formatData['activity_addition'];
      formatData['activity_addition'] = querystring.parse(addition, "*", ":");

      const formatResult = Object.assign({}, formatData);
      // 判断是否收藏该帖子
      const collectionStatus = { hasCollection: false };
      _sql = `select * 
                from collections 
                where user_id = ${userId} and activity_id = ${activityId}`;

      service.query(_sql)
        .then((data) => {
          if (data.length !== 0) {
            collectionStatus.hasCollection = true;
          }
          Object.assign(formatResult, collectionStatus)


          // 判断是否已经报名
          const enrollStatus = { hasEnroll: false };
          _sql = `select * 
                    from enrolls 
                    where user_id = ${userId} and activity_id = ${activityId}`;
          service.query(_sql)
            .then((data) => {
              if (data.length !== 0) {
                enrollStatus.hasEnroll = true;
              }
              Object.assign(formatResult, enrollStatus)

              // 发送结果
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
  const {
    id,
    score
  } = req.body.params;
  let _sql = `select activity_score_value, activity_score_count 
                from activities 
                where activity_id = '${id}'`;

  service.query(_sql)
    .then((data) => {

      // 计算并更新活动评分
      const oldScore = data[0]['activity_score_value'];
      let count = data[0]['activity_score_count'];
      const newScore = (count * oldScore + score) / (count + 1);

      _sql = `update activities 
                set activity_score_value = ${newScore}, activity_score_count = (${count}+1) 
                where activity_id = ${id}`;

      service.query(_sql).catch((error) => errorRes(error));
      res.send(correctRes_msg('update score successfully'));

    })
    .catch((error) => res.send(errorRes(error)));

});

// 活动收藏
router.post('/addCollection', (req, res) => {

  const {
    userId,
    activityId
  } = req.body.params;
  let _sql = `insert into collections(user_id, activity_id) values (${userId}, ${activityId})`;

  service.query(_sql)
    .then(() => {
      res.send(correctRes_msg('add collection successfully'));
    })
    .catch((error) => res.send(errorRes(error)));
});


// 取消活动收藏
router.delete('/removeCollection', (req, res) => {

  const {
    userId,
    activityId
  } = req.query;
  let _sql = `delete from collections
                where user_id = ${userId} and activity_id = ${activityId}`;

  service.query(_sql)
    .then(() => {
      res.send(correctRes_msg('remove collection successfully'));
    })
    .catch((error) => res.send(errorRes(error)));

});


// 活动报名
router.post('/updateEnroll', (req, res) => {
  const {
    userId,
    activityId
  } = req.body.params;

  let _sql = `insert into enrolls(user_id, activity_id) values (${userId}, ${activityId})`;
  service.query(_sql)
    .then(() => {
      res.send(correctRes_msg('update enroll successfully'));
    })
    .catch((error) => res.send(errorRes(error)));

});

// 取消活动报名
router.delete('/removeEnroll', (req, res) => {
  const {
    userId,
    activityId
  } = req.query;

  let _sql = `delete from enrolls 
                where user_id = ${userId} and activity_id = ${activityId}`;

  service.query(_sql)
    .then(() => {
      res.send(correctRes_msg('delete enroll successfully'));
    })
    .catch((error) => res.send(errorRes(error)));

});

module.exports = router;