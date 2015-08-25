var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var doadorSchema = Schema({
    nome:  String,
    idade: Number,
    sexo: String,
    tipoSanguineo: String,
    email: String,
    senha: String,
    promiscuo: Boolean,
    quantidadeDoada: { type: Number, default: 0},
    ultimaDoacao: {type: Date, default: Date.now},
});

doadorSchema.statics.logar = function (email, senha, callback) {
	this.findOne({email: email, senha: senha}, function(err, doador) {
		if (err) {
			console.log(err);
			callback(false, doador);
		}
		callback(true, doador);
	});
};

var Doador = mongoose.model("Doador", doadorSchema);

module.exports = Doador;