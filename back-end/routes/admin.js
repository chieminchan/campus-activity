const express = require('express');
const moment = require('moment');
const querystring = require('querystring');
const formidable = require('formidable');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg, forbidden_msg } = require('../config/responseFormat');
const $sql = require('./adminSql');
const router = express.Router();

router.get('/activities', async (req, res) => {
  try {
    const { currentPage, pageSize } = req.query;
    const total = await service.query($sql.activities().count);
    const rows = await service.query($sql.activities(currentPage, pageSize).detail);
    const results = { data: rows, total: total[0]['count(*)'] };
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

router.get('/activity', async (req, res) => {
  const { activityId } = req.query;
  const activityInfo = await service.query($sql.activity(activityId));

  // 将活动信息中的addition转换成json格式
  const formatData = activityInfo[0];
  const addition = formatData['activity_addition'];
  formatData['activity_addition'] = querystring.parse(addition, "*", ":");
  
  res.send(correctRes(formatData));
});

router.get('/enrolled', async (req, res) => {
  const { activityId } = req.query;
  const activityInfo = await service.query($sql.activity(activityId));
  const rows = await service.query($sql.enrolledList(activityId));
  const results = {
    activity_name: activityInfo[0].activity_name,
    data: rows,
  }
  res.send(correctRes(results));
});



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
