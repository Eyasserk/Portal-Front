var request = require('request');
var config = require('../config');
var ejs = require('ejs');

exports.show = function(req,res,next){
	getParcela(req.param.expedienteId, function(error,expediente){
		if(error){
			req.flash('error','Ha ocurrido un error al buscar las parcelas');
			var geo = {parcela:{},mineral:{}};
			ejs.renderFile(__dirname + '/../geoviews/index.ejs', {geo: geo, apiKey: config.apiKey}, function(error, html) {
				res.status(200).send(html);
			});
		}else{
			ejs.renderFile(__dirname + '/../geoviews/index.ejs', {geo: expediente, apiKey: config.apiKey}, function(error, html) {
				res.status(200).send(html);
			});
		}
	});
};

/**
var getParcela = function(expedienteId, callback){
	request({
		url: config.silcam_back_url+'/expedientes/'+expedienteId,
		method: 'GET',
		headers: {
			'Accept' : 'application/json'
		}
	}, function(err, res) {
		if(err){
			callback(err, null);
		}else{
			var data = JSON.parse(res.body);
			callback(null, data);
		}
	});
};
*/
var getParcela = function(expedienteId, callback){
	var expediente = {};
	expediente.id = 1;
	expediente.numeroExpediente = '20180605-01-03-727127';
	expediente.mineral = {nombre:'Cobre'};

	var parcela = {area:23.32,provincia:{nombre:'Madrid'},coordenadas:[{latitud:40.431086,longitud:-3.713710},{latitud:40.426141,longitud:-3.709193},
					{latitud:40.422874,longitud:-3.695503},
					{latitud:40.433589,longitud:-3.667823},{latitud:40.446000,longitud:-3.669111},
					{latitud:40.458279,longitud:-3.678423}]};

	expediente.parcela = parcela;
	callback(null,expediente);
};