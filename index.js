var express = require('express'),
	helmet = require('helmet'),
	app = express(),
	path = require('path');
	util = require('util');

var port = 8080;

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

app.get('/cursos/:curso', function(req, res){
	var curso = req.params.curso;
	if(curso && typeof curso == "string" && curso.indexOf('.') == -1){
		curso = curso.toLowerCase();
		var path = util.format("cursos/%s", curso);
		//todo: security check
		return res.render(path);
	}
	return res.redirect('/');
});

app.get('/cursos/:curso/:modulo', function(req, res){
	var curso = req.params.curso,
		modulo = req.params.modulo;

	if(curso && typeof curso == "string" && curso.indexOf('.') == -1 &&
		modulo && typeof modulo == "string" && modulo.indexOf('.') == -1){
		var path = util.format("cursos/modulos/%s/%s", curso, modulo);
		curso = curso.toLowerCase();
		modulo = modulo.toLowerCase();
		//todo: security check
		return res.render(path);
	}	

	return res.redirect('/');
})

app.use(function(req, res){
	res.render('404');
});

app.listen(port);