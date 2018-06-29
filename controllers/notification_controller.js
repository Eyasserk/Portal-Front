var request = require('request');
var config = require('../config');
var moment = require('moment');
moment.locale('es');

exports.getNotifications = function(userId,token,callback){
	request({
		url: config.silcam_back_url+'/notificaciones/personas/'+userId,
		method: 'GET',
		headers: {
			'Accept' : 'application/json',
			'Authorization': token
			}
		}, function(err, res, body) {
		if(err){
			callback(err, null);
		}else if(res.statusCode !== 200){
			var data = JSON.parse(res.body);
			callback(data.message, null);
		}else{
			var data = JSON.parse(res.body);
			//Calcular el numero de notificaciones no leidas
			var unread = 0;
			for(var i in data){
				if(data[i].state === 0){
					unread++;
				}
			}
			var notificaciones = {};
			notificaciones.unread = unread;
			notificaciones.notifications = data;
			callback(null, notificaciones);
		}
	});
};

exports.update = function(req, res, next){
	console.log("Request update notification "+req.params.notificationId);
	request({
		url: config.silcam_back_url+'/notificaciones/'+req.params.notificationId,
		method: 'PUT',
		headers: {
			'Accept' : 'application/json',
			'content-type': 'application/json',
			'Authorization': req.session.token
			},
		body: '{}'
		}, function(err, response, body) {
		if(err){
			callback(err, null);
		}else if(response.statusCode !== 204){
			var data = JSON.parse(response.body);
			callback(data.message, null);
		}else{
			res.status(200).send();
		}
	});
}