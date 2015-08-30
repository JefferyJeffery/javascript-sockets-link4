export default class Link4App {
  constructor(socket, game, view) {
    this._socket = socket;
    this._game = game;
    this._view = view;

    this._game.reset();

    this._view.bind({
      drop: this.drop.bind(this),
      reset: this.reset.bind(this)
    });
    
    this._view.render(this._game);
  }

  drop(column){
    this._game.drop(column);
    this._view.render(this._game);
  }

  reset(){
    this._game.reset();
    this._view.render(this._game);
  }
}