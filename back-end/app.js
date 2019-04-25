var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var userRouter = require('./routes/user');
var activityRouter = require('./routes/activity');
var approvalRouter = require('./routes/approval');
var adminRouter = require('./routes/admin');
var feedBackRouter = require('./routes/feedback');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 启用session中间件
app.use(session({
  // 相当于一个加密密钥
  secret: "my-secret",
  // 强制session保存到session store中
  resave: true,
  // 强制没有“初始化”的session保存到storage中
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));

app.use('/user', userRouter);
app.use('/activity', activityRouter);
app.use('/approval', approvalRouter);
app.use('/admin', adminRouter);
app.use('/feedback', feedBackRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log('err', err);
  res.send({
    status: '500',
    message: err
  });
});

module.exports = app;