const activity = {

    // 查:
    // 最新活动
    latest: 'select activity_id, activity_name, activity_poster_front from activities order by activity_start desc limit 2',

    // 首页活动列表
    typeLists: (type) => {
        return `select activity_id, activity_name, activity_brief, activity_enroll_deadline, 
                activity_start, activity_end, activity_status, activity_poster_front from activities 
                  where activity_type = '${type}'
                  order by activity_status desc`;
    },

    // 活动信息
    info: (id) => {
      return `select * from activities where activity_id = ${id}`
    },

    // 是否收藏帖子
    isCollection: (userId, activityId) => {
      return `select *  from collections 
                where user_id = ${userId} and activity_id = ${activityId}`;
    },

    // 是否已经报名
    isEnroll: (userId, activityId) => {
      return `select * from enrolls 
                where user_id = ${userId} and activity_id = ${activityId}`;
    },

    // 活动当前评分
    nowScore: (id) => {
      return `select activity_score_value, activity_score_count from activities 
                where activity_id = ${id}`;
    },

    // 活动评论
    comments: (id) => {
      return `select * from comments
                inner join users on users.user_id = comments.comment_user_id
                where comments.comment_activity_id = ${id}`;
    },

   // 活动回复
   replies: (commentId) => {
     return `select * from replies 
               inner join users on users.users_id = replies.reply_user_id
               where replies.reply_comment_id = ${commentId}`
   },

    // 更新:
    // 更新活动得分
    updateScore: (id, newScore, count) => {
      return `update activities set activity_score_value = ${newScore}, activity_score_count = (${count}+1) 
                where activity_id = ${id}`;
    },

    // 增:
    // 活动收藏
    addCollection: (userId, activityId) => {
      return `insert into collections(user_id, activity_id) values (${userId}, ${activityId})`;
    },

    // 活动报名
    addEnroll: (userId, activityId) => {
      return `insert into enrolls(user_id, activity_id) values (${userId}, ${activityId})`;
    },


    // 删:
    // 取消活动收藏
    removeCollection: (userId, activityId) => {
      return `delete from collections
                where user_id = ${userId} and activity_id = ${activityId}`;
    },

    








};

module.exports = activity;