const user = {
    // 登录
    login: (userId) => {
        return `select user_account, user_name, user_password from users where user_account = ${userId}`;
    },

    // 查询用户信息
    info: (userId) => {
        return `select user_id, user_account, user_name, user_sex, user_department, user_grade, user_profession, user_class, user_phone, user_type from users where user_account = ${userId}`;
    },

    // 查询用户收藏过的活动
    collections: (userId) => {
        return `select * from collections 
      inner join activities as a on a.activity_id  = collections.activity_id 
      where user_id = ${userId}`;
    },

    // 查询用户参加过的活动
    enrolled: (userId) => {
        return `select * from enrolls 
        inner join activities as a on a.activity_id  = enrolls.activity_id 
        where user_id = ${userId}`;
    },

    // 查询用户密码
    userPwd: (userId) => {
        return `select user_password from users where user_id = ${userId}`;
    },

    // 查询用户手机号码
    userInfo: (userId) => {
        return `select user_phone from users where user_id = ${userId}`;
    },

    // 修改用户个人密码
    updatePwd: (userId, newPwd) => {
        console.log(userId, newPwd);
        return `update users set user_password = ${newPwd } where user_id = ${userId}`;
    },

    // 修改用户个人信息
    updateInfo: (userId, newPhone) => {
        return `update users set user_phone = ${ newPhone } where user_id = ${userId}`;
    },

};

module.exports = user;