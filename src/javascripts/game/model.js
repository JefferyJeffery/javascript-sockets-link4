export default class Link4Game {
 
  constructor() {
    this._columns = [];
    for (var i =0; i < this.COLUMN_COUNT; i++) {
        this._columns.push([]);
    }
    this._randomizeTurn();
  }

  drop(column_index){
    var column = this._column(column_index);
    if(column.length < this.ROW_COUNT){
      column.push(this._turn);
      this._toggleTurn();
      return true;
    } else {
      return false;
    }
  }

  currentTurn(){
    return this._turn;
  }

  serialize(){
    var source = {
      turn : this.currentTurn(),
      columns : this._columns
    }
    return JSON.stringify(source);
  }

  getColumn(column_index){
    return this._column(column_index).slice(0);
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

  debug(){
    console.log(`Next -> ${this.next_turn}`);
    console.log(this.columns);
  }
}

Link4Game.prototype.COLUMN_COUNT = 7;
Link4Game.prototype.ROW_COUNT = 6;

Link4Game.prototype.RED = 'R';
Link4Game.prototype.BLACK = 'B';
