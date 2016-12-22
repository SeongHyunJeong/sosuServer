let socket = io.connect("http://localhost:9999");

socket.on('welcome message',(data) => {
    document.write(data.message + '<br>');
                    //받아옴

    socket.disconnect();
});

socket.on('check alive', (data) => {
    document.write(data.message + '<br>');
})
