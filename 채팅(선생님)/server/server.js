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
        // /nick dsfajldfldasjkl
        if(data.message.startsWith('/')) {
            if(data.message.startsWith('/nick ')) {
                let splitted = data.message.split(' ');
                let oldNickname = clientInfos[client.id].nickname;
                clientInfos[client.id].nickname = splitted[1];

                server.emit('change nickname', {old:oldNickname, new:splitted[1]});
            } else if(data.message.startsWith('/w')) {
                // 귀속말
                let targetNicknameIndex = data.message.indexOf(' ') + 1;
                let chatBodyIndex = data.message.indexOf(' ', 3) + 1;
                
                let targetNickname = data.message.substr(targetNicknameIndex, chatBodyIndex - targetNicknameIndex - 1);
                data.message = data.message.substr(chatBodyIndex);
                
                let targetSocket = null;
                for(let id in clientInfos) {
                    let clientData = clientInfos[id];
                    if(clientData.nickname == targetNickname) {
                        targetSocket = clientData.socket;
                        break;
                    }
                }

                if(targetSocket !== null) {
                    targetSocket.emit('whisper', {nickname: clientInfos[client.id].nickname, message: data.message});
                } else {
                    client.emit('whisper fail', {message: `유저가 존재하지 않습니다: ${targetNickname}`});
                }
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