const express = require('express');
const service = require('../config/mySqlConfig');
const router = express.Router();

router.get('/all',(req, res, next) => {
  let _sql = `select activity_name, activity_start, activity_end, activity_status, activity_poster_front, activity_poster_back from activities`;
  service.query(_sql).then((data) => {
    res.send({
      'status': 0,
      'results': data
    });
  });
});

module.exports = router;