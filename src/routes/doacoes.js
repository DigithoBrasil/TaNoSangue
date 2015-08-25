var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Doacao = require('../models/Doacoes.js');

router.get('/', function(req, res) {
	res.render('doacoes.ejs');
});

router.post('/', function(req, res) {
	var doacao = new Doacao({
		quem:  req.session.idDoUsuarioLogado,
		onde:  req.param('onde'),
    	quando: new Date(),
		quantidade: parseInt(req.param('quantidade'))/1000
	});

	doacao.save(function(err, doacao){
		res.redirect('/Doador/Perfil');
	});
});

module.exports = router;
