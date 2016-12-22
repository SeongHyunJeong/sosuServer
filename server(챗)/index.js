let io = require('socket.io')(9999);

io.on('connection', (client) => {
  console.log("클라이언트가 열결되었습니다.");
});

