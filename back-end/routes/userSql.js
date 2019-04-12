const user = {
    // 登录
    login: (userId) => {
        return `select user_account, user_name, user_password from users where user_account = ${userId}`;
    },

    // 查询用户信息
    info: (userId) => {
        return `select user_id, user_account, user_name, user_sex, user_department, user_grade, user_profession, user_class, user_type from users where user_account = ${userId}`;
    },

    // 查询用户收藏过的活动
    collections: (userId) => {
      return `select * from collections 
      inner join activities as a on a.activity_id  = collections.activity_id 
      where user_id = ${userId}`;
    }


};

module.exports = user;