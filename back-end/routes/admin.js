const express = require('express');
const moment = require('moment');
const querystring = require('querystring');
const formidable = require('formidable');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const $sql = require('./adminSql');
const router = express.Router();

router.get('/activities', async (req, res) => {
  try {
    const { currentPage, pageSize } = req.query;
    const total = await service.query($sql.all().count);
    const rows = await service.query($sql.all(currentPage, pageSize).detail);
    const results = { data: rows, total: total[0]['count(*)'] };
    res.send(correctRes(results));
  } catch (error) {
    res.send(errorRes(error.message));    
  }
});

module.exports = router;
