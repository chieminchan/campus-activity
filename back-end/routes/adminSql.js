const activity = {
  // 按条件查看全部活动
  all: (currentPage, pageSize) => {
    const previewNum = (currentPage - 1) * pageSize;

    let sql = {};
    sql.count = `select count(*) from activities`;
    sql.detail = `select * from activities 
                            inner join 
                            limit ${previewNum},${pageSize}`;
    return sql;
  },
};

module.exports = activity;