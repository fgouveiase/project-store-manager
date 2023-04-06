const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'root',
  user: process.env.MYSQL_user || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;