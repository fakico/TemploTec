var express = require('express');
var router = express.Router();
var util = require('util');
var Joi = require('joi');
var emailHelper = require('../libs/emailHelper');

router.get('/', function(req, res){
	res.render('home');
});

router.get('/nosotros', function(req, res){
	res.render('about');
});

router.get('/cursos/:curso', function(req, res){
	var curso = req.params.curso;
	if(curso && typeof curso == "string" && curso.indexOf('.') == -1){
		curso = curso.toLowerCase();
		var path = util.format("cursos/%s", curso);
		//todo: security check
		return res.render(path);
	}
	return res.redirect('/');
});

router.get('/cursos/:curso/:modulo', function(req, res){
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
});

//todo: validate and send message
router.post('/message/send', function(req, res){
	var schema = Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		message: Joi.string().required()	
	});	
	Joi.validate(req.body, schema, function(err, value){
		if(!err){ //valide
			emailHelper.sendInfo(req.body.name, req.body.email, req.body.message).then(
				function(result){
					res.redirect('/');
				},
				function(err){
					res.redirect('/');
				}
			);			
		}else{
			res.redirect('/');
		}
	})
});

module.exports = router;