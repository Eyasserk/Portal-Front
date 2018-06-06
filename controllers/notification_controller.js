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
exports.getNotifications = function(userId,userTypeId,token,callback){
	var notifications = {};
	var unread = 1;

	//Notificaciones: Todas
	var n = [];

	var notification1 = {};
	notification1.id = 1;
	notification1.state = 0;
	notification1.type = 'state_changed';
	notification1.idExpediente = 210201;
	notification1.numeroExpediente = '201605-01-03-82392932923';
	notification1.title = 'Nuevo Estado';
	notification1.description = 'El estado de su expediente a cambiado a DENEGADO';
	notification1.time = moment("2018-06-06 09:54:03", "YYYY-MM-DD HH:mm:ss").fromNow();

	var notification2 = {};
	notification2.id = 2;
	notification2.state = 1;
	notification2.type = 'fase_changed';
	notification2.idExpediente = 210201;
	notification2.numeroExpediente = '201605-01-03-82392932923';
	notification2.title = 'Nueva Fase';
	notification2.description = 'Su expediente ha entrado en la fase de PAGO';
	notification2.time = moment("2018-06-05 09:52:03", "YYYY-MM-DD HH:mm:ss").fromNow();

	n.push(notification1);
	n.push(notification2);

	notifications.notifications = n;
	notifications.unread = unread;

	callback(null, notifications);
};