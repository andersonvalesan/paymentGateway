module.exports = function(app){
	app.get('/payments', function(req, res){
		res.send('OK');
	});	

	app.delete('/payments/payment/:id', function(req, res){
		console.log('Refunding payment...');

		var connection = app.persistency.connectionFactory();
	    var paymentDao = new app.persistency.PaymentDao(connection);

	    var payment = {};

		payment.status = 'REFUNDED';
		payment.id = req.params.id;

	    paymentDao.update(payment, function(exception, result){
	    	if(exception){
	    		return res.status(500).send(exception);
	    	}

	    	console.log('payment refunded: ' + result);
	    	return res.status(201).json(payment);
	    });
	});

	app.put('/payments/payment/:id', function(req, res){
		console.log('Charging payment...');

		var connection = app.persistency.connectionFactory();
	    var paymentDao = new app.persistency.PaymentDao(connection);

	    var payment = {};

		payment.status = 'CHARGED';
		payment.id = req.params.id;

	    paymentDao.update(payment, function(exception, result){
	    	if(exception){
	    		return res.status(500).send(exception);
	    	}

	    	console.log('payment charged: ' + result);
	    	return res.status(204).json(payment);
	    });
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
		console.log('Reserving payment...');

		var connection = app.persistency.connectionFactory();
	    var paymentDao = new app.persistency.PaymentDao(connection);

		payment.status = 'RESERVED';
		payment.date = new Date;

	    paymentDao.save(payment, function(exception, result){
	    	if(exception){
	    		return res.status(500).send(exception);
	    	}

	    	payment.id = result.insertId;

	    	console.log('payment reserved: ' + result);
	    	res.location('payments/payment/' + payment.id);

	    	var response = {
	    		payment_data : payment,
	    		links : [
	    			{
	    				href:"http://localhost:3000/payments/payment" + payment.id,
	    				rel:"charge",
	    				method:"PUT"
	    			},
	    			{
	    				href:"http://localhost:3000/payments/payment" + payment.id,
	    				rel:"refund",
	    				method:"DELETE"
	    			}
	    		]
	    	}

	    	return res.status(201).json(response);
	    });
	});	
}