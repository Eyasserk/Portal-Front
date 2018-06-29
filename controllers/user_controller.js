var request = require('request');
var config = require('../config');


exports.authenticate = function(id, personType, val, key, callback){
	request({
		url: config.silcam_back_url+'/authenticate',
		method: 'POST',
		headers: {
			'content-type' : 'application/json',
			'Accept' : 'application/json'
		},
		body: JSON.stringify({
			'id': id,
			'personType': personType,
			'number': val,
			'clave': key
		})
	}, function(error, response, body) {
		if(error){
			callback('Ha ocurrido un problema. Por favor, inténtelo más tarde', null);
		}else if(response.statusCode !== 200){
			var body = JSON.parse(body);
			callback(body.message, null);
		}else{
			var authData = JSON.parse(body);
			callback(null, authData);
		}
	});
}


exports.getUser = function(userId,userTypeId,token,callback){
	var url = config.silcam_back_url;
	if(userTypeId === 1){
		url += '/personasFisicas/'+userId;
	}else if(userTypeId === 2){
		url += '/personasJuridicas/'+userId;
	}else{
		callback('User Type ID does not exist',null);
		return;
	}
	request({
		url: url,
		method: 'GET',
		headers: {
			'Accept' : 'application/json',
			'Authorization': token
			}
		}, function(err, res, body) {
		if(err){
			callback(err, null);
		}else if(res.statusCode !== 200){
			var body = JSON.parse(res.body);
			callback(body.message, null);
		}else{
			var json = JSON.parse(res.body);
			var user = {};

			//Common data
			user.id = json.id;
			user.type = userTypeId;
			user.idType = json.tipoIdentificacion;
			user.idNumber = json.numeroIdentificacion;
			user.email = json.email;
			user.phone = json.telefono;
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
				user.constitutionDate = json.fechaConstitucion;
				user.businessName = json.razonSocial;
				user.representative = json.representante;
				user.fiscalAddress = json.direccionFiscal;
				user.fiscalProvince = json.provinciaFiscal;
				user.nationality = json.paisNacionalidad;
			}

			callback(null, user);
		}
	});
};