// Link4 App JavaScript

(function(){

  function Link4App(socket){

  }

  var hostname = location.protocol + "//" + location.hostname;
  var port = window.location.port ? ':3000' : '';
  var socket_host  = hostname + port;

  new Link4App(io(socket_host));

  console.log('Looking for sockets at ' + socket_host);
})();