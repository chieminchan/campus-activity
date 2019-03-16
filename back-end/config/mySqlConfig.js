let mysql = require('mysql');
let config = require('./defaultConfig');

// 创建线程池
let pool = mysql.createPool({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    // 最大连接数
    connectionLimit: 50,
    // 是否允许执行多条sql语句
    multipleStatements: true,
    // 东八区时区，必须加这一句，否则时间不对劲
    timezone: "08:00"
});

// 统一连接数据库的方法
let allServices = {
    query: (sql, ...params) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err,connection) => {
                if (err) {
                    reject(err);
                }else {
                    connection.query(sql, params, (err, res) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    })
                }
            });
        });
    }
}

module.exports =  allServices;
