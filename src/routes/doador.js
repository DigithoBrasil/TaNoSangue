var express = require('express');
var router = express.Router();
var Doador = require('../models/Doador.js');
var Doacao = require('../models/Doacoes.js');

router.get('/', function(req, res) {
	res.render('doador.ejs', {title: 'Doador', deslogado:'true'});
});

router.post('/', function(req, res) {

	var doador = new Doador({
		nome:  req.param('nome'),
	    idade: req.param('idade'),
		sexo: req.param('sexo'),
	    tipoSanguineo: req.param('tipoSanguineo'),
	    email: req.param('email'),
	    senha: req.param('senha'),
	    promiscuo: req.param('promiscuo')});

	doador.save(function(err, doador){
		res.redirect('/');
	});
});

router.get('/perfil/', function(req, res){
	var idDoDoador = req.session.idDoUsuarioLogado;
	var litrosDoados = Doacao.calcularQuantidadeDoada(idDoDoador, function (quantidadeDoada) {
		Doador.findById(idDoDoador, function(err, doador) {
			Doacao.ultimaDoacao(idDoDoador, function(ultimaDoacao) {
				dataFormatada = "Nunca doou";
				if(ultimaDoacao)
				{
					var dataFormatada = ultimaDoacao.getDate() + "/" + (ultimaDoacao.getMonth() + 1) + "/" + ultimaDoacao.getFullYear();
					
				}
				res.render('doador-perfil.ejs', {doador: doador, litrosDoados: quantidadeDoada, ultimaDoacao: dataFormatada, posicaoNoRanking: 3});
			});
		});
	});
});

module.exports = router;
