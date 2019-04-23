const activity = {
  // 查看全部活动
  activities: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from activities`;
    sql.detail = `select a.activity_id, a.activity_name, a.activity_end, a.activity_start, a.activity_enroll_deadline, a.activity_score_value, a.activity_type, users.user_name as activity_creator, users.user_phone as activity_creator_phone from activities as a inner join users on users.user_id = a.activity_creator_id limit ${previewNum},${pageSize}`;
    return sql;
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
};

module.exports = activity;