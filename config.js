var config = {};


config.app = {
    host: 'localhost',
    port: 3000,
    url: 'http://localhost:3000'
};

// Set this var to undefined if you don't want the server to listen on HTTPS
config.https = {
    enabled: false,
    cert_file: '/home/yasser/silcam/cert/server.crt',
    key_file: '/home/yasser/silcam/cert/server.key'
};


config.admin_credentials = {
    id: 'admin',
    key: 'silcam'  
};

// Licode -> Nuve host
config.silcam_back_url = 'http://localhost:8090';
config.bpm_portal_url = 'http://localhost:8080';


//HTTP Allowed methods
config.allowedMethods = ['GET','POST','HEAD'];

// minutes
config.session_expiration_time = 30;

module.exports = config;
