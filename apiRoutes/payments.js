module.exports = function(app){
	app.get('/payments', function(req, res){
		res.send('OK');
	});	

	app.post('/payments/payment', function(req, res){
		var payment = req.body;
		console.log('Creating payment...');

		payment.status = 'CREATED';
		payment.date = new Date;

		res.send(payment);
	});	
}