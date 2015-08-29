export default class Link4Game {
 
  constructor() {
    this.reset();
  }

  reset(){
    this._id = this._generateUUID();
    this._columns = [];
    this._history = [];
    for (var i =0; i < this.COLUMN_COUNT; i++) {
        this._columns.push([]);
    }
    this._randomizeTurn();
    this._start_turn = this.currentTurn();
  }

  drop(column_index){
    var column = this._column(column_index);
    if(column.length < this.ROW_COUNT){
      column.push(this._turn);
      this._history.push(column_index);
      this._toggleTurn();
      return true;
    } else {
      return false;
    }
  }

  result(){
    var winner = this.winner();
    if(winner === this.RED){
      return this.RED;
    } else if(winner === this.BLACK){
      return this.BLACK;
    }else if(isTie()){
      return this.STATUS_TIE;
    }
    return this.STATUS_ACTIVE;
  }

  isActive(){
    return this.result() != this.STATUS_ACTIVE;
  }

  isTie(){
    for (var i =0; i < this.COLUMN_COUNT; i++) {
        if(this._columns.length < this.ROW_COUNT)
        {
          return false;
        }
    }
    return true;
  }

  winner(){
    return null;
  }

  currentTurn(){
    return this._turn;
  }

  at(column_index, row_index){
    var column = this._column(column_index);
    if(row_index < column.length){
      return column[row_index];
    }
    return this.EMPTY;
  }

  serialize(){
    var source = {
      id : this._id,
      turn : this.currentTurn(),
      columns : this._columns,
      start_turn : this._start_turn,
      history : this._history
    }
    return JSON.stringify(source);
  }

  getColumn(column_index){
    return this._column(column_index).slice(0);
  }

  debug(){
    console.log(`Next -> ${this.currentTurn()}`);
    console.log(this._columns);
  }

  _randomizeTurn(){
    this._turn = (Math.random() > 0.5) ? this.BLACK : this.RED;
  }

  _toggleTurn(){
    this._turn = this._turn == this.RED ? this.BLACK : this.RED;
  }

  _column(column_index){
    return this._columns[column_index];
  }

  _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

}

Link4Game.prototype.COLUMN_COUNT = 7;
Link4Game.prototype.ROW_COUNT = 6;

Link4Game.prototype.RED = 'R';
Link4Game.prototype.BLACK = 'B';
Link4Game.prototype.EMPTY = '_';
Link4Game.prototype.STATUS_TIE = 'T';
Link4Game.prototype.STATUS_ACTIVE = 'A';

