var request = require('request');
var config = require('../config');

exports.list = function(req,res,next){
	var grupoId = req.query.group;
	var mineralId = req.query.mineral;
	var provinciaId = req.query.province;
	var tipoExpedienteId = req.query.caseType;
	var tipoPersonaId = req.query.personType;
	var personId = req.query.person;
	var fechaInicio = req.query.startDate;
	var fechaFin = req.query.endDate;

	var query =[];
	if(grupoId && ! '' === grupoId){
		query.push('grupoId='+grupoId);
	}
	if(mineralId && ! '' === mineralId){
		query.push('mineralId='+mineralId);
	}
	if(provinciaId && ! '' === provinciaId){
		query.push('provinciaId='+provinciaId);
	}
	if(tipoExpedienteId && ! '' === tipoExpedienteId){
		query.push('tipoExpedienteId='+tipoExpedienteId);
	}
	if(tipoPersonaId && ! '' === tipoPersonaId){
		query.push('tipoPersonaId='+tipoPersonaId);
	}
	if(personId && ! '' === personId){
		query.push('personId='+personId);
	}
	if(fechaInicio && ! '' === fechaInicio){
		query.push('fechaInicio='+fechaInicio);
	}
	if(fechaFin && ! '' === fechaFin){
		query.push('fechaFin='+fechaFin);
	}

	var q = formatQuery(query);

	getExpedientes(q,function(error,expedientes){
		if(error){
			req.flash('error', 'Ha habido un error con la búsqueda.');
			res.redirect('/');
		}else{
			res.render('case/list', {expedientes: expedientes});
		}
	});
};

var formatQuery = function(query){
	if(query.length === 0){
		return undefined;
	}
	if(query.length === 1){
		return query[0];
	}
	var q = 'g=t';
	for(var i in query){
		q = q + '&';
		q = q + query[i];
	}
	return q;
};

var getExpedientes = function(query,callback){
	request({
		url: config.silcam_back_url+'/expedientes?q='+query,
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