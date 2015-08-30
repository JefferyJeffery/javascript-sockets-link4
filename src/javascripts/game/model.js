export default class Link4Game {
 
  constructor(force_first) {
    this.reset(force_first);
  }

  reset(force_first){
    this._id = this._generateUUID();
    this._columns = [];
    this._history = [];
    for (var i =0; i < this.COLUMN_COUNT; i++) {
        this._columns.push([]);
    }
    if(force_first == this.RED || force_first == this.BLACK){
      this._turn = force_first;
    } else {
      this._randomizeTurn();
    }
    this._start_turn = this.currentTurn();
  }

  drop(column_index){
    var column = this._column(column_index);
    if(column.length < this.ROW_COUNT && this.status() == this.STATUS_ACTIVE){
      column.push(this._turn);
      this._history.push(column_index);
      this._toggleTurn();
      return true;
    } else {
      return false;
    }
  }

  status(){
    var winner = this.winner();
    if(winner === this.RED){
      return this.RED;
    } else if(winner === this.BLACK){
      return this.BLACK;
    }else if(this.isTie()){
      return this.STATUS_TIE;
    }
    return this.STATUS_ACTIVE;
  }

  isActive(){
    return this.status() != this.STATUS_ACTIVE;
  }

  isTie(){
    for (var i =0; i < this.COLUMN_COUNT; i++) {
        if(this._columns[i].length < this.ROW_COUNT)
        {
          return false;
        }
    }
    return true;
  }

  winner(){
    return this._verticalWinner() || 
           this._horizontalWinner() || 
           this._slashWinner() || 
           this._backslashWinner();
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
      start_turn : this._start_turn,
      history : this._history,
      status : this.status(),
    }
    return JSON.stringify(source);
  }

  getStartingPlayer(){
    return this._start_turn;
  }

  getColumn(column_index){
    return this._column(column_index).slice(0);
  }

  getHistory(){
    return this._history.slice(0);
  }

  debug(){
    console.log(`Next -> ${this.currentTurn()}`);
    console.log(this._columns);
  }

  _verticalWinner(){
    for (var i =0; i < this.COLUMN_COUNT; i++) {
      var winner = this._findSequence(this._columns[i], this.LINK_REQUIRED);
      if(winner){
        return winner;
      }
    }
    return null;
  }
  _horizontalWinner(){
    for (var i =0; i < this.ROW_COUNT; i++) {
      var row = [];
      for (var col =0; col < this.COLUMN_COUNT; col++) {
        row.push(this.at(col,i));
      }
      var winner = this._findSequence(row, this.LINK_REQUIRED);
      if(winner){
        return winner;
      }
    }
    return null;
  }
  // \ down to the right
  _slashWinner(){
    var slanted_grid = this._diagonals2();
    for(var i = 0; i < slanted_grid.length; i++){
      var winner = this._findSequence(slanted_grid[i], this.LINK_REQUIRED);
      if(winner){
        return winner;
      }
    }

    return null;
  }

  // / up to the right
  _backslashWinner(){
    var slanted_grid = this._diagonals1();
    for(var i = 0; i < slanted_grid.length; i++){
      var winner = this._findSequence(slanted_grid[i], this.LINK_REQUIRED);
      if(winner){
        return winner;
      }
    }

    return null;
  }

  _diagonals1(){
    var m = this.ROW_COUNT;
    var n = this.COLUMN_COUNT;

    var out = [];
    for (var i = 1 - m; i < n; i++) {

      var group = [];

      for (var j = 0; j < m; j++) {
        var col = (i + j);
        if (col >= 0 && col < n) {
          group.push( this.at(col, j) );
        }
      }

      //if(group.length >= this.LINK_REQUIRED){
        out.push(group);
      //}
    }
    return out;
  }

  _diagonals2(){
    var m = this.ROW_COUNT;
    var n = this.COLUMN_COUNT;

    var out = [];
    for (var i = n + m - 2; i >= 0; i--) {

      var group = [];

      for (var j = 0; j < m; j++) {
        var col = (i - j);
        if (col >= 0 && col < n) {
          group.push( this.at(col, j) );
        }
      }

      //if(group.length >= this.LINK_REQUIRED){
        out.push(group);
      //}
    }
    return out;
  }

  _findSequence(array, minLen){
    if(array.length < minLen){
      return false;
    }
    var cursor = '';
    var count = 0;
    for(var i=0; i < array.length; i++){
      var remaining = array.length - i;
      if(array[i] == this.EMPTY){
        count = 0;
        cursor = array[i];
      }else if(cursor !== array[i]){
        count = 1;
        cursor = array[i];
      } else {
        count++;
      }
      if(count >= minLen){
        return cursor;
      } else if(minLen - count > remaining ) {
        return false 
      }
    }
    return false;
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
Link4Game.prototype.LINK_REQUIRED = 4;

