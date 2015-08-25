var express = require('express');
var router = express.Router();
var Doador = require('../models/Doador.js');


router.get('/', function(req, res) {
  res.render('index.ejs', {deslogado:'true'});
});

router.post('/', function(req, res) {
	var email = req.param('email');
	var senha = req.param('senha');

	Doador.logar(email, senha, function(sucesso, usuario) {
		if (sucesso) {
			req.session.logado = true;
			req.session.idDoUsuarioLogado = usuario._id;
			res.redirect('/Doador/Perfil/');
		}
		else
		{
			res.status(402);
		}
	});

	res.status(402);
});

module.exports = router;
