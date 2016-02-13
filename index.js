var express = require('express'),
	helmet = require('helmet'),
	app = express();

app.use(express.static(__dirname + '/web'));

app.listen(80);