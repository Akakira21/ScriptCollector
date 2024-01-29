const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scriptcollector",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

module.exports = connection;
