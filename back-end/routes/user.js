const express = require('express');
const service = require('../config/mySqlConfig');
const { errorRes, correctRes, correctRes_msg, warningRes } = require('../config/responseFormat');
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
});

// 登出
router.get('/logout', (req, res) => {
    // 清空session
    req.session.destroy(() => {
        res.send(correctRes_msg('登出成功！'));
    });
});

// 修改用户个人密码
router.post('/update/pwd', async (req, res) => {
    try {
        const { userId, oldPwd, newPwd } = req.body.params;
        const oldUserPwd = await service.query($sql.userPwd(userId));
        if (oldPwd && oldUserPwd[0].user_password === oldPwd) {
            await service.query($sql.updatePwd(userId, newPwd));
            res.send(correctRes_msg('个人密码修改成功'));
        } else {
            res.send(errorRes('原始密码输入不正确！'));
        }
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

// 修改用户个人信息
router.post('/update/info', async (req, res) => {
    try {
        const { userId, oldPhone, newPhone } = req.body.params;
        const oldInfo = await service.query($sql.userInfo(userId));
        if (oldPhone && oldInfo[0].user_phone === oldPhone) {
            await service.query($sql.updateInfo(userId, newPhone));
            res.send(correctRes_msg('个人信息修改成功'));
        } else {
            res.send(errorRes('旧手机号码输入不正确！'));
        }
    } catch (error) {
        res.send(errorRes(error.message));
    }
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

// 用户参加过的活动
router.get('/enrolled', async (req, res) => {
    try {
        const { userId } = req.query;
        const rows = await service.query($sql.enrolled(userId));
        res.send(correctRes(rows));
    } catch (error) {
        res.send(errorRes(error.message));
    }
});

module.exports = router;