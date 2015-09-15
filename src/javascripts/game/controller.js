export default class Link4App {
  constructor(socket, game, view) {
    this._socket = socket;
    this._game = game;
    this._view = view;

    if(this._socket){
       this._socket.on(this._game.id(), function(){
         var state = arguments[arguments.length - 1];
         console.log(state);
         this.load(JSON.parse(state))
       }.bind(this));
    }
    
    this._game.reset();

    this._view.bind({
      drop: this.drop.bind(this),
      reset: this.reset.bind(this),
      undo: this.undo.bind(this)
    });
    
    this._view.render(this._game);
  }

  save(){
    if(this._socket){
      this._socket.emit('save link4', this._game.serialize());
      console.log(this._game.serialize());
    }
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