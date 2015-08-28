export default class Link4App {
  constructor(socket, game, view, document) {
    this._socket = socket;
    this._document = document;
    this._game = game;
    this._view = view;
    
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
    
    this._view.render(this._game);
    this.bind();
  }

  bind(){
    var buttons = this._view.boardDiv().querySelectorAll('.dropper');
    var callback = this._dropperCallback.bind(this);
    
    for (var i = 0; i < buttons.length; ++i) {
      buttons[i].addEventListener('click', callback);
    }

  }

  drop(column){
    this._game.drop(column);
    this._view.render(this._game);
  }

  _dropperCallback(e){
    var column = parseInt(e.target.dataset.column);
    if(!isNaN(column)){
      this.drop(column);
    }
  }

}