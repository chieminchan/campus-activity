const express = require('express');
const service = require('../config/mySqlConfig');
const querystring = require('querystring');
const formidable = require('formidable');
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const $sql = require('./approvalSql');
const router = express.Router();

router.post('/addApproval', async (req, res) => {

    try {
        const form = new formidable.IncomingForm();
        await form.parse(req, (err, data) => {

            // 将活动信息中的addition字符串转成特定格式存入数据库
            if (data.addition) {
                const addition = JSON.parse(data.addition);
                data['addition'] = querystring.stringify(addition, '*', ':');
            }
            service.query($sql.addApproval(data))
                .then(() => {
                    res.send(correctRes_msg('post approval successfully'));
                })
                .catch((error) => {
                    res.send(errorRes(error.message));
                })
        });

    } catch (error) {
        res.send(errorRes(error.message));
    }
});
module.exports = router;