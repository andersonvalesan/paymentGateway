var app = require('./config/custom-express')();

app.listen(3000, function(){
	console.log('Server up on port 3000');
});