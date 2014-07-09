

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var sio = require('socket.io');
var less = require('less-middleware');

var app = express();

// Configuração do Express
app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'1234567890QWERTY'}));
app.use(express.methodOverride());
app.use(less(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'frontend')));

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//configuração para o servidor aceitar requisições 'cors'
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// carregar página inicial.
app.get('/', function(req, res){

	fs.readFile('./frontend/index.html', function(error, data){
		if(error){
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, { 'Content-type':'text/html'});
			res.end(data, 'utf-8');
		}
	});
});


// rotas divididas em camadas para facilitar desenvolvimento e manutenção.
require('./backend/rotas/RotasLogin')(app);
require('./backend/rotas/RotasUsuario')(app);
require('./backend/rotas/RotasProjeto')(app);
require('./backend/rotas/RotasRecado')(app);
require('./backend/rotas/RotasArquivos')(app);
require('./backend/rotas/RotasImagens')(app);

mongoose.connect('mongodb://localhost/SocieGroup');

//coonfigurando socket.io
var io = sio.listen(server);

io.set('log level', 1);

var mensagens = [];

listarNovoPrj = io.of('/novoProjeto');

listarNovoPrj.on('connection', function(socket){
       socket.on('room', function(room){
           socket.join(room);
    });

    socket.on('listarPrj', function(room, projeto){
        listarNovoPrj.in(room).emit('listarPrj', projeto);

    })
});


io.sockets.on('connection', function(socket){

        socket.on('send msg', function(username, room, message){

          socket.room = room;
            socket.join(room);

            socket.broadcast.to(room).emit('update chat', username, message);

        });

    socket.on('postar msg', function(data){
        mensagens.unshift(data);
        io.sockets.emit('feed', data);
    });

    io.sockets.emit('get feeds', mensagens);

    });


app.get('/mensagens', function(req, res){
    res.json(mensagens);
});

