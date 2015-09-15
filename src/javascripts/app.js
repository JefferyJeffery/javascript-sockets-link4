// Link4 App JavaScript
import Link4Controller from './game/controller'
import Link4Game from './game/model'
import Link4View from './game/view'


(function(){
  var hostname = location.protocol + "//" + location.hostname;
  var port = window.location.port ? ':3000' : '';
  var socket_host  = hostname + port;

  var socket = window.io ? window.io(socket_host) : null;

  var gameId = document.getElementById('board').dataset['gameId'];

  var app = new Link4Controller(
    socket, 
    new Link4Game({id: gameId}),
    new Link4View(document, 'board')
  );
})();