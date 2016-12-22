let socket = io.connect("http://localhost:9999");

function button1_click() {
	var val3 = $('#texta').val();
    console.log(val3);
    socket.emit("form_client",val3);
}

socket.on('welcome message',(data) => {
    console.log(data.message);
                    

    //socket.disconnect();
});

// socket.on('check alive', (data) => {
//     document.write(data.message + '<br>');
// });


