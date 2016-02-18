var express = require('express'),
	helmet = require('helmet'),
	app = express(),
	path = require('path'),			
	bodyParser = require('body-parser'),
	port = process.env.TEMPLOTEC_PORT || 80;

//middleware
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
var ms_hour = 1000 * 60 * 60;
app.use(express.static(path.join(__dirname, '/public'), {maxAge: ms_hour * 12}));

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');


app.use('/', require('./routes/index.js'));

//error middleware
app.use(function(err, req, res, next){
	//res.render('404');
	console.log(err);
	res.redirect('/');
});

app.listen(port);