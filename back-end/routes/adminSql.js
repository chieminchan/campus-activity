const activity = {
  // 查看全部活动
  activities: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from activities`;
    sql.detail = `select a.activity_id, a.activity_name, a.activity_brief, a.activity_end, a.activity_start, a.activity_enroll_deadline, a.activity_score_value, a.activity_type,
    a.activity_concat_name, a.activity_concat_phone, a.activity_addition, users.user_name as activity_creator, users.user_phone as activity_creator_phone from activities as a inner join users on users.user_id = a.activity_creator_id order by a.activity_id desc limit ${previewNum},${pageSize}`;
    return sql;
  },

  // 活动详情
  activity: (activityId) => {
    return `select * from activities where activity_id = ${activityId}`;
  },

  // 活动报名名单
  enrolledList: (activityId) => {
    return `select u.user_name, u.user_account, u.user_sex, u.user_grade, u.user_department, u.user_profession, u.user_class, u.user_phone from enrolls as e inner join users as u on u.user_id = e.user_id where e.activity_id = ${activityId}`;
  },

  // 活动作品
  worksList: (activityId) => {
    return `select w.work_name, w.work_brief, w.work_content, w.work_front_img, u.user_name, u.user_account, u.user_grade, u.user_department, u.user_profession, u.user_class, u.user_phone from activity_works as w inner join users as u on u.user_id = w.work_author_id where w.work_activity_id = ${activityId}`;
  },

  // 查看全部待审核活动
  approvals: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from activity_approvals where activity_approval_status = 0`;
    sql.detail = `select a.approval_id, a.activity_name, a.activity_brief, a.activity_end, a.activity_start, a.activity_enroll_deadline, a.activity_type, u.user_name as activity_creator, u.user_phone as activity_creator_phone from activity_approvals as a 
    inner join users as u on u.user_id  = a.activity_creator_id 
    where a.activity_approval_status = 0
    limit ${previewNum},${pageSize}`;
    return sql;
  },

  // 查看全部学生信息
  students: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from users where user_type = 'student'`;
    sql.detail = `select user_account, user_name, user_sex, user_grade, user_department, user_profession, user_phone, user_class from users where user_type = 'student' limit ${previewNum},${pageSize}`;
    return sql;
  },

  // 查看全部活动管理员信息
  managers: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from users where user_type = 'manager'`;
    sql.detail = `select user_account, user_name, user_sex, user_phone from users where user_type = 'manager' limit ${previewNum},${pageSize}`;
    return sql;
  },

  // 删除活动
  removeActivity: (activityId) => {
    return `delete from activities where activity_id = ${activityId}`;
  },

  // 增加活动
  addActivity: (params) => {
    const {
      userId,
      name,
      type,
      brief,
      address,
      enrollDeadline,
      start,
      end,
      concator,
      concatorPhone,
      frontPoster,
      backPoster,
      addition
    } = params;
    return `insert into activities (activity_name, activity_brief, activity_creator_id, activity_enroll_deadline, activity_start, activity_end, activity_address, activity_type, activity_poster_front, activity_poster_back, activity_concat_phone, activity_concat_name, activity_addition, activity_approval_id, activity_approval_status) values ('${name}', '${brief}', ${userId}, '${enrollDeadline}', '${start}', '${end}', '${address}', '${type}', '${frontPoster}', '${backPoster}', '${concatorPhone}', '${concator}', '${addition}', ${userId}, 1)`;
  },

};

module.exports = activity;