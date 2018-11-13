<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
        <link rel="stylesheet" href="css/chat.css">
    </head>
    <body>
        <div class="chat">
            <input type="text" class="chat-name" placeholder="enter your name">
            <div class="chat-messages">
                <div class="chat-message"></div>
            </div>
            <textarea class="chat-typed" placeholder="type your message"></textarea>
            <div class="chat-status">Status: <label id="label_chat-status">Idle</label></div>
        </div>
        <script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
        <script src="chat_client.js"></script>
    </body>
</html>

