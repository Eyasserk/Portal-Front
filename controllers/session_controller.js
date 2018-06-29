
var request = require('request');
var user_controller = require('./user_controller');
var notification_controller = require('./notification_controller');
var message_controller = require('./message_controller');

exports.loginRequired = function (req, res, next) {
    if (req.session && req.session.user) {
      next();
    }else{
      req.flash('info','Primero tiene que entrar en Silcam');
      res.redirect('/login?redir=' + req.url);
    }
};

exports.new = function(req, res) {
    if(req.session && req.session.user){
      res.redirect('/');
    }else{
      res.render('session/new2', { id: req.query.id, idPersona: req.query.type, redir: req.query.redir || '/'});
    }
};


exports.create = function(req, res, next) {
    var redir = req.body.redir || '/';
    var val = req.body.identificacion;
    var key  = req.body.key;
    var id = req.body.id;
    var personType = req.body.idPersona;

    user_controller.authenticate(id,personType,val,key, function(authError,authData){
      if(authError){
        req.flash('error',authError);
        res.redirect('/login?id='+id+'&type='+personType+'&redir='+redir);
        return;
      }else{
        req.session.token = authData.token;
        user_controller.getUser(authData.userId, authData.userTypeId, authData.token, function(userError,user){
          if(userError){
            req.flash('error', 'Ha ocurrido un problema. Por favor, póngase en contacto con su administración');
            res.redirect('/');
            return;
          }else{
            req.session.user = user;
            //Cargar mensajes y notificaciones
            notification_controller.getNotifications(user.id,authData.token, function(notifError,notificaciones){
              if(notifError){
                req.flash('info','No se ha podido cargar sus mensajes y notificaciones.');
                req.session.messages = {unread:0,messages:[]};
                req.session.notifications = {unread:0,notifications:[]};
              }else{
                req.session.notifications = notificaciones;
                message_controller.getMessages(user.id, user.type,authData.token, function(MsgError,mensajes){
                  if(MsgError){
                    req.flash('info','No se ha podido cargar sus mensajes.');
                    req.session.messages = {unread:0,messages:[]};
                  }else{
                    req.session.messages = mensajes;
                  }
                  res.redirect(redir);
                });
              }
            });
          }
        });
      }
    });
};

exports.destroy = function(req, res, next) {
  if(req.session && req.session.user){
      delete req.session.user;
      delete req.session.notifications;
      req.flash('success', 'Sesión cerrada.');
      res.redirect("/"); 
    }else{
      req.flash('info','ya está desconectado.');
      res.redirect('/');
    }          
};