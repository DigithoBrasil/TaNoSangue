var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Doador = require('../models/Doador.js');

var doacoesSchema = Schema({
    quando: Date,
    quantidade: Number,
    onde: String,
    quem: {type: Schema.ObjectId, ref: 'Doador'},
});

doacoesSchema.statics.obterPorUsuario = function (id, cb) {
  this.find({ quem: id }, cb);
}

doacoesSchema.statics.calcularRank = function (id) {
  var rank;
  
  var rank = this.find({_id: id},function(erro, resultado){

    var resultadoParaOrdenar = [];

    for(var i =0; i < resultado.length; i++){
      resultadoParaOrdenar.push(resultado[i].quando);
    }

    bubbleSort(resultadoParaOrdenar);
    console.log(resultadoParaOrdenar);
  });
  
  return rank;
};

function bubbleSort(a){
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < a.length-1; i++) {
              if (a[i] > a[i+1]) {
                  var temp = a[i];
                  a[i] = a[i+1];
                  a[i+1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);
  }


doacoesSchema.statics.ultimaDoacao = function (id, cb) {
  var dataDeRetorno;
  
  var dataUltimaDoacao = this.find({quem: id}, function(erro, resultado){
    var resultadoParaOrdenar = [];
    console.log("RESULTADO: " + resultado);
    for(var i =0; i < resultado.length; i++){
      resultadoParaOrdenar.push(resultado[i].quando);
    }

    bubbleSort(resultadoParaOrdenar);
    dataDeRetorno = resultadoParaOrdenar[0];
    Doador.update({_id: id}, {$set: {ultimaDoacao: dataDeRetorno}}, function(err, doador){});
    cb(dataDeRetorno);
  });

  return dataDeRetorno;
};

doacoesSchema.statics.calcularQuantidadeDoada = function (id, cb) {

    var quantidadeDoada = 0;
    this.aggregate(
    	[
          { $group: { quem: id, quantidadeDoada: { $sum: '$quantidade' }}},
      	  { $project: { _id: 1, quantidadeDoada: 1 }},
      ], function (err, resultado) {
          if (err) {
              quantidadeDoada = 0;
              cb(quantidadeDoada);
          } else {    
              quantidadeDoada = resultado.length > 0 ? resultado[0].quantidadeDoada : 0;                
              Doador.update({_id: id}, {$set: {quantidadeDoada: quantidadeDoada}}, function(err, doador){});
              cb(quantidadeDoada);
          }
      });
};

var Doacao = mongoose.model("Doacao", doacoesSchema);
module.exports = Doacao;