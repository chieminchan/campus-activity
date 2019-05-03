const moment = require('moment');

const activity = {
    // 查:
    // 按条件查看全部活动
    all: (activityType, activityStatus, currentPage, pageSize) => {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        let sql = {};
        const previewNum = (currentPage - 1) * pageSize;
        if (activityType === 'all') {
            switch (activityStatus) {
                case 'all':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 `;
                    sql.detail = `select * from activities where activity_approval_status = 1 order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'over':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 and activity_end < '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_end < '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'processing':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 and activity_end > '${now}' and activity_start < '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_end > '${now}' and activity_start < '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'waitting':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 and activity_start > '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_start > '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;
            }
        } else {
            switch (activityStatus) {
                case 'all':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 and activity_type = '${activityType}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_type = '${activityType}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'over':
                    sql.count = `select count(*) from activities where activity_approval_status = 1 and activity_type = '${activityType}' and activity_end < '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_type = '${activityType}' and activity_end < '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'processing':
                    sql.count = `select count(*) from activities where activity_type = '${activityType}' and activity_end > '${now}' and activity_start < '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_type = '${activityType}' and activity_end > '${now}' and activity_start < '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;

                case 'waitting':
                    sql.count = `select count(*) from activities where activity_type = '${activityType}' and activity_start > '${now}'`;
                    sql.detail = `select * from activities where activity_approval_status = 1 and activity_type = '${activityType}' and activity_start > '${now}' order by activity_start desc limit ${previewNum}, ${pageSize}`;
                    break;
            }
        }
        return sql;
    },

    // 最新活动
    latest: 'select activity_id, activity_name, activity_poster_front from activities where activity_approval_status = 1 order by activity_start desc limit 4',

    // 首页活动列表
    typeLists: (type) => {
        return `select activity_id, activity_name, activity_brief, activity_enroll_deadline, activity_start, activity_end, activity_poster_front from activities where activity_approval_status = 1 and activity_type = '${type}' order by activity_end desc`;
    },

    // 活动信息
    info: (id) => {
        return `select * from activities where activity_id = ${id}`;
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
    comments: (activityId) => {
        return `select c.comment_id, comment_activity_id, c.comment_content, c.comment_user_id,
                c.comment_time, u.user_name as comment_user_name, u.user_sex as comment_user_sex from comments as c 
                inner join users as u on u.user_id = c.comment_user_id 
                where c.comment_activity_id = ${activityId}`;
    },

    // 活动回复
    replies: (commentId) => {
        return `select r.reply_id, r.reply_comment_id, r.reply_content, r.reply_time,r.reply_user_id, u1.user_name as reply_user_name, u1.user_sex as reply_user_sex, r.reply_target_id, u2.user_name as reply_target_name from replies as r
               inner join users as u1 on u1.user_id = r.reply_user_id
               inner join users as u2 on u2.user_id = r.reply_target_id
               where r.reply_comment_id = ${commentId}`;
    },

    // 活动报名名单
    enrolledList: (activityId) => {
        return `select u.user_account, u.user_name, u.user_sex, u.user_grade, u.user_department, u.user_profession, u.user_class, u.user_phone from enrolls as e inner join users as u on u.user_id = e.user_id where e.activity_id = ${activityId}`;
    },

    // 更新:
    // 更新活动得分
    updateScore: (activityId, newScore, count) => {
        return `update activities set activity_score_value = ${newScore}, activity_score_count = (${count}+1) where activity_id = ${activityId}`;
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

    // 活动作品上传
    addWork: (data) => {
        const {
            name,
            brief,
            content,
            backWork,
            frontWork,
            author,
            activityId
        } = data;
        return `insert into activity_works(work_name, work_brief, work_content, work_activity_id,
            work_author_id, work_front_img, work_back_img) values ('${name}', '${brief}', '${content}', '${activityId}', '${author}', '${frontWork}', '${backWork}')`;
    },

    // 发布活动评论
    addComment: (userId, activityId, commentContent, commentTime, commentStatus = 'unread') => {
        return `insert into comments ( comment_content, comment_activity_id, comment_user_id, comment_time, comment_status) values ( '${commentContent}', ${activityId}, ${userId}, '${commentTime}', '${commentStatus}' )`;
    },

    // 回复活动评论
    addReply: (userId, targetId, replyCommentId, replyContent, replyTime, replyStatus = 'unread') => {
        return `insert into replies(reply_content, reply_comment_id, reply_user_id, reply_time, reply_target_id, reply_status) values ('${replyContent}', ${replyCommentId}, ${userId}, '${replyTime}', ${targetId}, '${replyStatus}')`;
    },

    // 删:
    // 取消活动收藏
    removeCollection: (userId, activityId) => {
        return `delete from collections where user_id = ${userId} and activity_id = ${activityId}`;
    },
};

module.exports = activity;