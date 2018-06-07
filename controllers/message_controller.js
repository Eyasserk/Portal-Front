var request = require('request');
var config = require('../config');
var moment = require('moment');
moment.locale('es');
/**
exports.getMessages = function(userId,userTypeId,token,callback){
	request({
		url: config.silcam_back_url+'/mensajes/'+userTypeId+'/'+user_id,
		method: 'GET',
		headers: {
			'Accept' : 'application/json',
			'Authorization': token.bearer
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
//Datos de Prueba / Mock
exports.getMessages = function(userId,userTypeId,token,callback){
	var messages = {};
	var unread = 1;

	messages.unread = unread;
	callback(null, messages);
};

/**
* Obtiene un hilo de conversación
*/
exports.show = function(req,res,next){
	request({
		url: config.silcam_back_url+'/hilos/'+req.param.threadId,
		method: 'GET',
		headers: {
			'Accept' : 'application/json',
			'Authorization': req.session.token.bearer
			}
		}, function(err, res) {
		if(err){
			req.flash('error', 'Ha habido un error al cargar su mensaje');
			res.render('/');
		}else{
			var thread = JSON.parse(res.body);
			res.render('message/show',{thread: thread});
		}
	});
};

/**
* Añade un mensaje en un hilo de conversacion
*/
exports.add = function(req,res,next){

};

/**
* Crea un hilo de conversación 
*/
exports.create = function(req,res,next){

};