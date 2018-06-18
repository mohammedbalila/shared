let socket = io.connect();

let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})


socket.on('chat', function(data){
    console.log(data)
    feedback.innerHTML = '';
    output.innerHTML += `<p> ${data.message} + </p>`;
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing ...</em></p>';
});