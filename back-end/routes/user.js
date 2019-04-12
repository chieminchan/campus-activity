const express = require('express');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg } = require('../config/responseFormat');
const $sql = require('./userSql');
const router = express.Router();

// 登录
router.post('/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const userData = await service.query($sql.login(userId, password));

        if (userData.length > 0 && userData[0].user_password === password) {
            // 将用户的信息和登录状态保存到session中
            req.session.isLogin = true;
            req.session.uid = userId;
            res.send(correctRes_msg('登录成功！'));
        } else {
            res.send({
                'status': 401,
                'message': '请检查账号和密码是否输入正确.'
            });
        }

    } catch (error) {
        res.send(errorRes(error.message));
    }

});

// 获取用户信息
router.get('/profile', async (req, res) => {
    try {
        const { uid, isLogin } = req.session;
        if (isLogin) {
            const userInfo = await service.query($sql.info(uid));
            res.send(correctRes(userInfo));
        } else {
            res.send({
                'status': 401,
                'message': '用户未登录或登录信息已过期，请重新登录.'
            });
        }
    } catch (error) {
        res.send(errorRes(error.message));
    }
})

// 登出
router.get('/logout', (req, res) => {
    // 清空session
    req.session.destroy(() => {
        res.send(correctRes_msg('登出成功！'));
    });
});

// 用户收藏的活动
router.get('/collections', async (req, res) => {
    try {
        const { userId } = req.query;
        const rows = await service.query($sql.collections(userId));
        res.send(correctRes(rows));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});
module.exports = router;