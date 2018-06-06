var request = require('request');
var config = require('../config');


/**
exports.authenticate = function(numExpediente, key, callback){
	request({
		url: config.silcam_back_url+'/authenticate',
		method: 'POST',
		headers: {
			'Accept' : 'application/json'
		},
		form: {
			'numero_expediente': numExpediente,
			'clave': key
		}
	}, function(err, res) {
		if(err){
			callback(err, null);
		}else{
			var authData = JSON.parse(res.body);
			callback(null, authData);
		}
	});
}


exports.getUser = function(userId,userTypeId,token,callback){
	console.log("Request getting user "+userId+" with type "+userTypeId+". Token: "+JSON.stringify(token));
	request({
		url: config.silcam_back_url+'/personas/'+userTypeId+'/'+user_id,
		method: 'GET',
		headers: {
			'Accept' : 'application/json',
			'Authorization': token.bearer
			}
		}, function(err, res) {
		if(err){

			callback(err, null);

		}else{

			var json = JSON.parse(res.body);
			var user = {};

			//Common data
			user.id = json.id;
			user.type = userTypeId;
			user.idType = json.tipoIdentificacion;
			user.idNumber = json.numeroIdentificacion;
			if(userTypeId === 1){
				user.name = json.nombre;
				user.lastName1 = json.apellido1;
				user.lastName2 = json.apellido2;
				
				user.birthDate = json.fechaNacimiento;
				user.address = json.direccionResidencia;
				user.province = json.provinciaResidencia;
				user.country = json.paisResidencia;
				user.nationality = json.nacionalidad;
			}else{
				user.businessName = json.razonSocial;
				user.representative = json.representante;
				user.fiscalAddress = json.direccionFiscal;
				user.fiscalCountry = json.paisFiscal;
				user.nationality = json.paisNacionalidad;
			}

			callback(null, user);
		}
	});
};
*/

// Datos de Prueba/ Mock
exports.authenticate = function(numExpediente, key, callback){
	var authData = {};
	authData.token = {bearer:'abcedddegege'};
	authData.userId = 1;
	authData.userTypeId = 1;
	callback(null,authData);
}

//Datos de Prueba/ Mock
exports.getUser = function(userId,userTypeId,token,callback){

	console.log("Request getting user "+userId+" with type "+userTypeId+". Token: "+JSON.stringify(token));

	var user = {};

	user.id = 1;
	user.type = 1;
	user.idType = 'NIE';
	user.idNumber = 'X8751526A';
	user.name = 'Yasser';
	user.lastName1 = 'Kantour';
	user.lastName2 = '';
	
	user.birthDate = '28/03/1990';
	user.address = 'Avenida Castilla-La Mancha,82 San Sebastián de los Reeyes, 28702';
	user.province = 'Madrid';
	user.country = 'España';
	user.nationality = 'Argelia';

	callback(null, user);
};