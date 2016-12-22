let io = require('socket.io')(9999);

io.on('connection', (client) => {
  console.log(`클라이언트 접속: ${client.id}`);

  //보내기                                 //출력할메세지
  //client.emit('welcome message', {message: });

  client.on("form_client", (data) => {
    console.log(data);
  });


  // client.on('disconnnect', () => {
  //   console.log(`클라이언트 접속 해제: ${client.id}`)
  // });

});



// setInterval(()=>{
//     io.emit('check alive',{message: "Helloooo"})
// }, 1000);

