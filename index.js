var express = require('express'),
	helmet = require('helmet'),
	app = express(),
	path = require('path');


app.use(helmet());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

var ms_hour = 1000 * 60 * 60;
app.use(express.static(path.join(__dirname, '/public'), {maxAge: ms_hour * 12}));

app.get('/', function(req, res){
	res.render('home');
});

app.get('/nosotros', function(req, res){
	res.render('about');
});



app.use(function(req, res){
	res.render('404');
});

app.listen(80);