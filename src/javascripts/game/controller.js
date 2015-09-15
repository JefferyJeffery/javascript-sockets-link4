export default class Link4App {
  constructor(socket, game, view) {
    this._socket = socket;
    this._game = game;
    this._view = view;

    if(this._socket){
      this.requestGame();
      this._socket.on('reconnect', this.requestGame.bind(this));
      this._socket.on(this._game.id(), this.handleGameMessage.bind(this));
    }
    
    this._game.reset();

    this._view.bind({
      drop: this.drop.bind(this),
      reset: this.reset.bind(this),
      undo: this.undo.bind(this)
    });
    
    this._view.render(this._game);
  }

  handleGameMessage(){
    var state = JSON.parse(arguments[arguments.length - 1]);
    console.log(state);
    if(state.connect){
      this.broadcaseGame();
    } else if(state.id){
      this.receiveGame(state);
    }
  }

  requestGame(){
    if(this._socket){
      this._socket.emit('connect link4', JSON.stringify({id: this._game.id(), connect: true}));
    }
  }

  broadcaseGame(){
    console.log("BROADCASTING GAME", this._game.id());
    if(this._socket){
      this._socket.emit('save link4', this._game.serialize());
      console.log(this._game.serialize());
    }
  }

  receiveGame(state){
    console.log("RECEIVING GAME", this._game.id());
    this.load(state);
  }

  save(){
    this.broadcaseGame();
  }

  load(saved_game){
    this._game.restore(saved_game);
    this._view.render(this._game);
  }

  drop(column){
    this._game.drop(column);
    this.save();
    this._view.render(this._game);
  }

  reset(){
    this._game.reset();
    this.save();
    this._view.render(this._game);
  }

  undo(){
    this._game.undoLastMove();
    this.save();
    this._view.render(this._game);
  }
}