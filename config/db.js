'use strict';

const mysql = require('mysql');

module.exports = (database) => mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password : 'adminpassword',
  database : database,
  multipleStatements: true,
  connectTimeout: 20000
});
