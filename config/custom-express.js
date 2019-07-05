var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');

module.exports = function(){
	var app = express();

	app.use(bodyParser.json());

	consign()
	.include('apiRoutes')
	.then('persistency')
	.into(app);

	return app;
}