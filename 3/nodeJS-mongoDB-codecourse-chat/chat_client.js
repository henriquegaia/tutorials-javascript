(function () {
    // May not work in all browsers
    var getNode = function (s) {
        return document.querySelector(s);
    };

    // Get required nodes
    var status = document.getElementById('label_chat-status');
    var textarea = getNode('.chat textArea');
    var chatName = getNode('.chat-name');
    var statusDefault = status.textContent;

    var setStatus = function (s) {
        status.textContent = s;

        if (s !== statusDefault) {
            var delay = setTimeout(function () {
                setStatus(statusDefault);
                clearInterval(delay);
            }, 3000);
        }
    };

    console.log('status-> ' + statusDefault);
    try {
        var socket = io.connect('http://127.0.0.1:8080');
    } catch (e) {
        // Set status to warn user
    }

    if (socket !== undefined) {
        console.log('socket-> ok');

        // Listen for output
        socket.on('output', function (data) {
            //console.log(data);
            if (data.length) {
                var all_messages = getNode('.chat-messages');
                var n = data.length;
                var message, name, message_line;
                for (var x = 0; x < n; x = x + 1) {
                    // name
                    name = document.createElement('label');
                    name.setAttribute('class', 'chat-message-name');
                    name.textContent = data[x].name;

                    // message
                    message = document.createElement('label');
                    message.setAttribute('class', 'chat-message-message');
                    message.textContent = ': ' + data[x].message;

                    // name and message
                    message_line = document.createElement('div');
                    message_line.setAttribute('class', 'chat-message');
                    message_line.appendChild(name);
                    message_line.appendChild(message);

                    // append to all
                    all_messages.appendChild(message_line);
                    //all_messages.insertBefore(message, message.first());
                }
            }
        });

        // Listen for status
        socket.on('status', function (data) {
            setStatus((typeof data === 'object') ? data.message : data);

            if (data.clear === true) {
                textarea.value = '';
            }
        });

        // Listen for keydown
        textarea.addEventListener('keydown', function (event) {
            var self = this;
            var name = chatName.value;
            var message = self.value;

            // When pressing enter ...
            if (event.which === 13 && event.shiftKey === false) {
                console.log('event-> enter');
                socket.emit('input', {
                    name: name,
                    message: message
                });
            }
        });

    }
})();