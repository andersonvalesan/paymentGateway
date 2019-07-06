module.exports = function(app){
	app.get('/payments', function(req, res){
		res.send('OK');
	});	

	app.post('/payments/payment', function(req, res){
		var payment = req.body;

		req.assert("payment_type", "Forma de pagamento é obrigatória.")
		.notEmpty();

		req.assert("amount", "Valor é obrigatório e deve ser um decimal.")
		.notEmpty()
		.isFloat();

		req.assert("currency", "Moeda é obrigatória e deve ter 3 caracteres")
		.notEmpty()
		.len(3,3);

		var errors = req.validationErrors();

		if (errors){
		    console.log("Validation errors found");
		    res.status(400).send(errors);
		    return;
		}
		console.log('Creating payment...');

		var connection = app.persistency.connectionFactory();
	    var paymentDao = new app.persistency.PaymentDao(connection);

		payment.status = 'CREATED';
		payment.date = new Date;

	    paymentDao.salva(payment, function(exception, result){
	    	if(exception){
	    		return res.status(400).send(exception);
	    	}

	    	console.log('payment created: ' + result);
	    	return res.json(payment);
	    });
	});	
}