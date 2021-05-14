document.addEventListener('DOMContentLoaded',()=>{

const socket = io();
console.log(socket);
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

//send new message and emits message to all clients with user name before message
form.addEventListener('submit', function(e) {
e.preventDefault();
if (input.value) {
  let user = document.querySelector("ul").dataset.userid;
      console.log(user);
  socket.emit('chat message', input.value);
  input.value = '';
}
});

socket.on('chat message', function(msg) {
var item = document.createElement('li');
let user = document.querySelector("ul").dataset.userid;
      console.log(user);
item.textContent = user + ":" + " " +msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});


let user = document.querySelector("ul").dataset.userid;

socket.on('userSet', function(data) {
  console.log(data, "data");
  user = data.username;
  console.log(user, "user")
  document.body.innerHTML = '<input type = "text" id = "message">\
  <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
  <div id = "message-container"></div>';
});

function sendMessage() {
  var msg = document.getElementById('message').value;
  if(msg) {
     socket.emit('msg', {message: msg, user: user});
  }
}
socket.on('newmsg', function(data) {
  if(user) {
     document.getElementById('message-container').innerHTML += '<div><b>' + 
        data.user + ":" + '</b>: ' + data.message + '</div>'
  }
}) 


})
