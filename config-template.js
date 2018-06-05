var config = {};


config.app = {
    host: 'localhost', //default value
    port: 3000, //default value
    url: 'http://localhost:3000'//default value
};

// Set this var to undefined if you don't want the server to listen on HTTPS
config.https = {
    enabled: false, //default value
    cert_file: '/home/cert/server.crt', //default value
    key_file: '/home/cert/server.key' //default value
};


config.admin_credentials = {
    user: '', //default
    pass: ''  //default
};

config.silcam_back_url = 'http://localhost:8090'; //default value
config.bpm_portal_url = 'http://localhost:8080'; //default value


//HTTP Allowed methods
config.allowedMethods = ['GET','POST','HEAD']; //default value

// minutes
config.session_expiration_time = 30; //default value

module.exports = config;
