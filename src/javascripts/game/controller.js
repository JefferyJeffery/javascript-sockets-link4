export default class Link4App {
  constructor(socket, game) {
    this._game = game;
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
    this.drop(1);
    this._game.debug();
  }

  drop(column){
    this._game.drop(column);
  }

}