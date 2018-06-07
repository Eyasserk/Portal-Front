
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
      res.render('session/new', { redir: req.query.redir || '/'});
    }
};


exports.create = function(req, res, next) {
    var redir = req.body.redir || '/'
    var numExpediente = req.body.numExpediente;
    var key  = req.body.key;

    user_controller.authenticate(numExpediente,key, function(error,authData){
      if(error){
        req.flash('error', 'Número de expediente o password incorrectos. Por favor, compruebe los datos introducidos');
        res.redirect('/login?redir='+redir);
      }else{
        req.session.token = authData.token;
        user_controller.getUser(authData.userId, authData.userTypeId, authData.token, function(error,user){
          if(error){
            req.flash('error', 'Ha ocurrido un problema. Por favor, póngase en contacto con su administración');
            res.redirect('/');
          }else{
            req.session.user = user;
            //Cargar mensajes y notificaciones
            notification_controller.getNotifications(user.id,user.type,authData.token,function(error,notificaciones){
              if(error){
                req.flash('info','No se ha podido cargar sus mensajes y notificaciones.');
                req.session.messages = {unread:0,messages:[]};
                req.session.notifications = {unread:0,notifications:[]};
              }else{
                req.session.notifications = notificaciones;
                message_controller.getMessages(user.id, user.type,authData.token, function(error,mensajes){
                  if(error){
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