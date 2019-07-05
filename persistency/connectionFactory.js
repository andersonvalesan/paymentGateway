var mysql  = require('mysql');

function createDBConnection(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'novousuario',
    password: 'password',
    database: 'payment_gateway'
  });
}

module.exports = function() {
  return createDBConnection;
}