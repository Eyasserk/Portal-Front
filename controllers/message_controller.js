var request = require('request');
var config = require('../config');
var moment = require('moment');
moment.locale('es');
/**
exports.getNotifications = function(userId,userTypeId,token,callback){
	request({
		url: config.silcam_back_url+'/notificaciones/'+userTypeId+'/'+user_id,
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
exports.Messages = function(userId,userTypeId,token,callback){
	var messages = {};
	var unread = 1;

	//Notificaciones: Todas
	var n = [];

	var message1 = {};
	message1.state = 1;
	message1.idExpediente = 210201;
	message1.numeroExpediente = '201605-01-03-82392932923';
	message1.title = 'Nuevo Estado';
	message1.content = 'El estado de su expediente a cambiado a DENEGADO';
	message1.time = moment("2018-06-06 09:54:03", "YYYY-MM-DD HH:mm:ss").fromNow();

	var message2 = {};
	message1.state = 0;
	message1.idExpediente = 210201;
	message1.numeroExpediente = '201605-01-03-82392932923';
	message1.title = 'Nuevo Estado';
	message1.content = 'El estado de su expediente a cambiado a DENEGADO';
	message1.time = moment("2018-06-06 09:54:03", "YYYY-MM-DD HH:mm:ss").fromNow();

	n.push(notification1);
	n.push(notification2);

	notifications.notifications = n;
	notifications.unread = unread;

	callback(null, notifications);
};