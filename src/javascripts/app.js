// Link4 App JavaScript
import Link4Controller from './game/controller'
import Link4Game from './game/model'
import Link4View from './game/view'


(function(){
  var hostname = location.protocol + "//" + location.hostname;
  var port = window.location.port ? ':3000' : '';
  var socket_host  = hostname + port;
  var max_socket_reconnects = 10;

  var socket = window.io ? window.io(socket_host, {
      'max reconnection attempts' : max_socket_reconnects
  }) : null;

  if(socket){
    socket.on("reconnecting", function(delay, attempt) {
      if (attempt === max_socket_reconnects) {
        setTimeout(function(){ socket.socket.reconnect(); }, 5000);
        return console.log("Failed to reconnect. Lets try that again in 5 seconds.");
      }
    });
  }

  var gameId = document.getElementById('board').dataset['gameId'];

  var app = new Link4Controller(
    socket, 
    new Link4Game({id: gameId}),
    new Link4View(document, 'board')
  );
})();