const express = require('express');
const service = require('../config/mySqlConfig');
const router = express.Router();

router.get('/all', (req, res, next) => {
  let _sql = `select activity_name, activity_start, activity_end, activity_status, activity_poster_front, activity_poster_back from activities`;
  service.query(_sql).then((data) => {
    res.send({
      'status': 0,
      'results': data
    });
  });
});

router.get('/latest', (req, res, next) => {
  let _sql = 'select activity_name, activity_poster_front from activities order by activity_start desc limit 2';
  service.query(_sql).then((data) => {
    res.send({
      'status': 0,
      'results': data
    });
  });
});

router.get('/typeLists', (req, res, next) => {
  const { type } = req.query;
  let _sql = `select activity_name, activity_brief, activity_enroll_deadline, activity_start,
              activity_end, activity_status, activity_poster_front from activities 
              where activity_type = '${type}'
              order by activity_status desc`;
  service.query(_sql)
    .then((data) => {
      res.send({
        'status': 0,
        'results': data
      });
    })
    .catch((error) => {
      res.send({
        'status': 1,
        'message': error
      });
    });
});



module.exports = router;