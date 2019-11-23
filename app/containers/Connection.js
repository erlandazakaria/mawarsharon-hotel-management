import mysql from 'mysql';

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'root',
  database: "mawarsharon"
});

connection.connect(function (err){
  if(err) throw err;
});

module.exports = connection;
