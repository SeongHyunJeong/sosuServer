let socket = io.connect("http://localhost:9999");
var nickname = prompt("닉네임 입력","");

function button1_click() {
	var val3 = $('#texta').val();
    document.write(val3);
    socket.emit("form_client", nickname+":"+val3);
}

function button2_click() {
	nickname=prompt("변경할 닉네임 입력","");
}


socket.on('welcome message',(data) => {
    document.write(data.message);
                    

    //socket.disconnect();
});

// socket.on('check alive', (data) => {
//     document.write(data.message + '<br>');
// });


