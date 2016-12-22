let socket = io.connect("http://localhost:9999");

socket.on("connection",(socket) => {
    console.log("서버와 연결되었습니다");
});