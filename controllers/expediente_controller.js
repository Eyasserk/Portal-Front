var request = require('request');
var config = require('../config');



exports.myCases = function(req, res, next){
	var page = req.query.page || 0;
	var size = req.query.size || 10;
	var query = [];
	query.push('personId='+req.session.user.id);
	query.push('tipoPersonaId='+req.session.user.type);
	var q = formatQuery(query);
	getExpedientes(q, page, size, function(error,expedientes){
		if(error){
			req.flash('error', 'Ha habido un error.');
			res.redirect('/');
		}else{
			res.render('case/list', {expedientes: expedientes, query:q, page: parseInt(page), size: parseInt(size)});
		}
	});
}

exports.list = function(req,res,next){
	var grupoId = req.query.group;
	var mineralId = req.query.mineral;
	var provinciaId = req.query.province;
	var tipoExpedienteId = req.query.caseType;
	var faseExpedienteId = req.query.casePhaseId;
	var estadoSolicitudId = req.query.requestStateId;
	var tipoSolicitudId = req.query.requestTypeId;
	var tipoPersonaId = req.query.personType;
	var personId = req.query.person;
	var fechaInicio = req.query.startDate;
	var fechaFin = req.query.endDate;
	var fechaInicioActividadStart = req.query.activityStartDateFrom;
	var fechaInicioActividadEnd = req.query.activityStartDateTo;
	var fechaFinActividadStart = req.query.activityEndDateFrom;
	var fechaFinActividadEnd = req.query.activityEndDateTo;
	var page = req.query.page;
	var size = req.query.size;

	var query =[];
	if(!page || '' === page){
		page = 0;
	}
	if(!size || '' === size){
		size = 10;
	}
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
	if(faseExpedienteId && ! '' === faseExpedienteId){
		query.push('faseExpedienteId='+faseExpedienteId);
	}
	if(estadoSolicitudId && ! '' === estadoSolicitudId){
		query.push('estadoSolicitudId='+estadoSolicitudId);
	}
	if(tipoSolicitudId && ! '' === tipoSolicitudId){
		query.push('tipoSolicitudId='+tipoSolicitudId);
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
	if(fechaInicioActividadStart && ! '' === fechaInicioActividadStart){
		query.push('fechaInicioActividadStart='+fechaInicioActividadStart);
	}
	if(fechaInicioActividadEnd && ! '' === fechaInicioActividadEnd){
		query.push('fechaInicioActividadEnd='+fechaInicioActividadEnd);
	}
	if(fechaFinActividadStart && ! '' === fechaFinActividadStart){
		query.push('fechaFinActividadStart='+fechaFinActividadStart);
	}
	if(fechaFinActividadEnd && ! '' === fechaFinActividadEnd){
		query.push('fechaFinActividadEnd='+fechaFinActividadEnd);
	}

	var q = formatQuery(query);

	getExpedientes(q, page, size, function(error,expedientes){
		if(error){
			req.flash('error', 'Ha habido un error con la búsqueda.');
			res.redirect('/');
		}else{
			res.render('case/list', {expedientes: expedientes, query:q, page: parseInt(page), size: parseInt(size)});
		}
	});
};

var formatQuery = function(query){
	if(query.length === 0){
		return '';
	}
	if(query.length === 1){
		return query[0];
	}
	var q = '';
	for(var i in query){
		q = q + query[i];
		q = q + '&';
	}
	return q.slice(0,-1);
};

var getExpedientes = function(query, page, size, callback){
	request({
		url: config.silcam_back_url+'/expedientes?page='+page+'&size='+size+'&'+query,
		method: 'GET',
		headers: {
			'Accept' : 'application/json'
		}
	}, function(err, res) {
		if(err || res.statusCode != 200){
			callback(err || 'Error', null);
		}else{
			var data = JSON.parse(res.body);
			callback(null, data);
		}
	});
};