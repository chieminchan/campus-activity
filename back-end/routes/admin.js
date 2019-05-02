const express = require('express');
const moment = require('moment');
const querystring = require('querystring');
const formidable = require('formidable');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg, forbidden_msg } = require('../config/responseFormat');
const $sql = require('./adminSql');
const router = express.Router();

// 全部活动信息
router.get('/activities', async (req, res) => {
  try {
    const { currentPage, pageSize } = req.query;
    const total = await service.query($sql.activities().count);
    const rows = await service.query($sql.activities(currentPage, pageSize).detail);
    
    // 将活动信息中的addition转换成json格式    
    rows.map((item) => {
        const addition = item['activity_addition'];
        item['activity_addition'] = querystring.parse(addition, "*", ":");  
    });
    const results = { data: rows, total: total[0]['count(*)'] };
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

// 活动详情
router.get('/activity', (req, res) => {
  try {
    const { activityId } = req.query;
    service.query($sql.activity(activityId))
      .then((info) => {
        // 将活动信息中的addition转换成json格式
        const formatData = info[0];
        const addition = formatData['activity_addition'];
        formatData['activity_addition'] = querystring.parse(addition, "*", ":");
        res.send(correctRes(formatData));
      })
  } catch (error) {
    res.send(errorRes(error.message));
  }
});

// 删除活动
router.delete('/removeActivity', (req, res) => {
  try {
    const { activityId } = req.query;
    service.query($sql.removeActivity(activityId))
      .then(() => {
        res.send(correctRes_msg('delete activity successfully'));        
      });
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

// 发布活动
router.post('/addActivity', async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    await form.parse(req, (err, data) => {

        // 将活动信息中的addition字符串转成特定格式存入数据库
        if (data.activity_addition) {
            const addition = JSON.parse(data.activity_addition);
            data['activity_addition'] = querystring.stringify(addition, '*', ':');
        }
        service.query($sql.addActivity(data))
            .then(() => {
                res.send(correctRes_msg('add activity successfully'));
            })
            .catch((error) => {
                res.send(errorRes(error.message));
            })
    });
  } catch (error) {
    res.send(errorRes(error.message));        
  }
});

// 活动报名名单
router.get('/enrolled', async (req, res) => {
  try {
    const { activityId } = req.query;
    const activityInfo = await service.query($sql.activity(activityId));
    const rows = await service.query($sql.enrolledList(activityId));
    const results = {
      activity_name: activityInfo[0].activity_name,
      data: rows,
    }
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));        
  }
});

// 活动作品
router.get('/works', async (req, res) => {
  try {
    const { activityId } = req.query;
    const activityInfo = await service.query($sql.activity(activityId));
    const rows = await service.query($sql.worksList(activityId));
    const results = {
      activity_name: activityInfo[0].activity_name,
      data: rows,
    }
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));            
  }
});

// 待审批活动
router.get('/approvals', async (req, res) => {
  try {
    const { currentPage, pageSize } = req.query;
    const total = await service.query($sql.approvals().count);
    const rows = await service.query($sql.approvals(currentPage, pageSize).detail);
    const results = { data: rows, total: total[0]['count(*)'] };
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

// 待审批活动详情
router.get('/approval', async (req, res) =>{
  try {
    const { approvalId } = req.query;
    console.log(approvalId);
    service.query($sql.approval(approvalId))
      .then((info) => {
        // 将活动信息中的addition转换成json格式
        const formatData = info[0];
        const addition = formatData['activity_addition'];
        formatData['activity_addition'] = querystring.parse(addition, "*", ":");
        res.send(correctRes(formatData));
      })
  } catch (error) {
    res.send(errorRes(error.message));
  }
});

// 学生信息
router.get('/students', async (req, res) => {
  try {
    const { currentPage, pageSize } = req.query;
    const total = await service.query($sql.students().count);
    const rows = await service.query($sql.students(currentPage, pageSize).detail);
    const results = { data: rows, total: total[0]['count(*)'] };
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

// 活动管理员信息
router.get('/managers', async (req, res) => {
  try {
    const { userType, currentPage, pageSize } = req.query;

    if(userType === 'manager') {
      res.send(forbidden_msg());
    } else {
      const total = await service.query($sql.managers().count);
      const rows = await service.query($sql.managers(currentPage, pageSize).detail);
      const results = { data: rows, total: total[0]['count(*)'] };
      res.send(correctRes(results)); 
    }

  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

module.exports = router;
