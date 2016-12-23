let server = require('socket.io')(9999);
if(server) {
    console.log('채팅 서버 대기중');
}

let clientInfos = {};

server.on('connection', client => {
    console.log(`[클라이언트 접속] ${client.id}`);

    let defaultNickname = `User${client.id.substr(0, 5)}`;
    clientInfos[client.id] = {socket:client, nickname: defaultNickname};

    client.emit('welcome', {nickname: defaultNickname});

    client.on('chat', data => {
        console.log(`[채팅] ${clientInfos[client.id].nickname}: ${data.message}`);

        // 명령어 처리
        if(data.message.startsWith('/')) {
            if(data.message.startsWith('/nick ')) {
                let splitted = data.message.split(' ');
                let oldNickname = clientInfos[client.id].nickname;
                clientInfos[client.id].nickname = splitted[1];

                server.emit('change nickname', {old:oldNickname, new:splitted[1]});
            } else if(data.message.startsWith('/w')) {
                // 귓속말 구현
            }
        } else {
            data.nickname = clientInfos[client.id].nickname;
            server.emit('chat', data);
        }
    });

    client.on('disconnect', () => {
        console.log(`[클라이언트 접속 종료] ${client.id}`);

        server.emit('user disconnected', {nickname: clientInfos[client.id].nickname});
        delete clientInfos[client.id];
    });
})