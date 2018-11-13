
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://127.0.0.1/chat', function (err, db) {
    if (err)
        throw err;
    client.on('connection', function (socket) {
        console.log('db-> connected');

        var col = db.collection('messages');

        var sendStatus = function (s) {
            //socket.emit only emits to the user, not broadcast
            socket.emit('status', s);
        };

        /*
         * Emit all messages
         * -sort by id, from last to first
         */

        col.find().limit(100).sort({_id: 1}).toArray(function (err, res) {
            if (err) {
                console.log('output to textarea-> erro');
                throw err;
            }
            socket.emit('output', res);
        })

        //wait for input
        socket.on('input', function (data) {
            console.log(data);
            var name = data.name;
            var message = data.message;
            var whitespacePattern = /^\s*$/;

            if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
                console.log('invalid name and/or message!');
                sendStatus('Name and message are required.');

            } else {
                col.insert({name: name, message: message}, function () {

                    // Emit latest messages to all users
                    client.emit('output', [data]);

                    sendStatus({
                        message: "Message sent",
                        clear: true
                    });
                });
                console.log('db-> data inserted');
            }
        });
    });
});

