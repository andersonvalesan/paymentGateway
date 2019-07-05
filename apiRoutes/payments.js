module.exports = function(app){
	app.get('/payments', function(req, res){
		res.send('OK');
	});	

	app.post('/payments/payment', function(req, res){
		var payment = req.body;
		console.log('Creating payment...');

		var connection = app.persistency.connectionFactory();
	    var paymentDao = new app.persistency.PaymentDao(connection);

		payment.status = 'CREATED';
		payment.date = new Date;

	    paymentDao.salva(payment, function(exception, result){
	      console.log('payment created: ' + result + exception);
	      res.json(payment);
	    });
	});	
}