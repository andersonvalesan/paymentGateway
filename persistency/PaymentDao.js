function PaymentDao(connection) {
    this._connection = connection;
}

PaymentDao.prototype.salva = function(payment,callback) {
    this._connection.query('INSERT INTO payments SET ?', payment, callback);
}

PaymentDao.prototype.lista = function(callback) {
    this._connection.query('select * from payments',callback);
}

PaymentDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from payments where id = ?",[id],callback);
}

module.exports = function(){
    return PaymentDao;
};