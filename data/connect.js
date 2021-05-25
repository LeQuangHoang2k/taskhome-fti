// const mysql = require("mysql2/promise");
const mysql2 = require("mysql2");

exports.conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "taskhome",
});
