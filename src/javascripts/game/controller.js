export default class Link4App {
  constructor(socket, game, view) {
    this._socket = socket;
    this._game = game;
    this._view = view;

    this._view.bind({
      drop: this.drop.bind(this)
    });
    
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


  }

  drop(column){
    this._game.drop(column);
    this._view.render(this._game);
  }
}