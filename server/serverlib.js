const socketIO = require('socket.io');
const safeSocket = require('./programs/safeSocket/safeSocket.js');
const register = require('./programs/register/register.js');

var io;


exports.listen = function(server){
    io = socketIO.listen(server);
    io.sockets.on('connection', function(socket){
        SafeSocket(socket);
    });
}

function SafeSocket(socket){
    socket.on('safeSocket', function(data){
        safeSocket.decodeSafeSocket(data, function(out){
            if(out.method != undefined){
                switch(out.method) {
                    case "register":
                        return register.handleRegister(out, socket);

                    case "verify":
                        return register.handleVerify(out, socket);

                    case "finalize account":
                        return register.handleFinalizeAccount(out, socket);
                }
            }
        });
    });
}  

exports.sendSocket = function(recipient, container){
    safeSocket.encodeSafeSocket(recipient, container, function(out){
        return socket.emit("safeSocket", out);
    });
}

