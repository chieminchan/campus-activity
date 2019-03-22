const express = require('express');
const service = require('../config/mySqlConfig');
const router = express.Router();

// 登录
router.post('/login', (req, res, next) => {
  const {
    userId,
    password
  } = req.body;
  let _sql = `select user_account, user_name, user_password from users
                 where user_account = ${userId}`;

  service.query(_sql)
    .then((data) => {
      if (data.length > 0 && data[0].user_password === password) {
        // 将用户的信息和登录状态保存到session中
        req.session.isLogin = true;
        req.session.uid = userId;

        res.send({
          'status': 0,
          'message': '登录成功'
        });

      } else {
        res.send({
          'status': 401,
          'message': '请检查账号和密码是否输入正确.'
        });
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

// 获取用户信息
router.get('/profile', (req, res, next) => {
  const {
    uid,
    isLogin
  } = req.session;
  let _sql = `select user_id, user_account, user_name, user_sex, user_department, user_grade, 
              user_profession, user_class, user_type from users
                where user_account = ${uid}`;
  if (isLogin) {
    service.query(_sql)
      .then((data) => {
        //如果成功，发送code200,加上data
        res.send({
          'status': 0,
          'results': data
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send({
      'status': 401,
      'message': '用户未登录或登录信息已过期，请重新登录.'
    });
  }
})

// 登出
router.get('/logout', (req, res, next) => {
  // 清空session
  req.session.destroy(() => {
    let data = {
      'status': 0,
      'message': 'logout successfully'
    };
    res.send(data);
  });
});

module.exports = router;