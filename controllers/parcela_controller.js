var request = require('request');
var config = require('../config');
var ejs = require('ejs');

exports.show = function(req,res,next){
	getParcela(req.params.expedienteId, function(error,expediente){
		console.log(JSON.stringify(expediente));
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