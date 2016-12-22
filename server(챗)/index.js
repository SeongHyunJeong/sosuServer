let io = require('socket.io')(9999);

io.on('connection', (client) => {
  console.log("클라이언트가 열결되었습니다.");

  //보내기                                 //출력할메세지
  client.emit('welcome message', {message: "Welcome"});

  client.on('disconnnect', () => {
    console.log(`클라이언트 접속 해제: ${client.id}`)
  });

});



setInterval(()=>{
    io.emit('check alive',{message: "Helloooo"})
}, 1000);
