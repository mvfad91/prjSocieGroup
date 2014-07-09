var servidor = "http://localhost:3001";

redeSocialApp.service('serviceSocketIo', function(){
    var socket = io.connect(servidor);
    return socket;
});