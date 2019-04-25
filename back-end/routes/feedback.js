const express = require('express');
const moment = require('moment');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { userId, type, content} = req.body.params;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    const sql = `insert into feedbacks(feedback_creator, feedback_type, feedback_content, feedback_time) values (${userId}, '${type}', '${content}', '${now}')`;  
    service.query(sql).then(() => {
      res.send(correctRes_msg('add feedback successfully!'));
    });

  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

module.exports = router;