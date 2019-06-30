var express = require('express');
var consign = require('consign');

module.exports = function(){
	var app = express();

	consign()
	.include('apiRoutes')
	.into(app);

	return app;
}