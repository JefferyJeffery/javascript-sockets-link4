export default class Link4View {
 
  constructor(document, boardSelector, callbacks) {
    this._document = document;
    this.boardSelector = boardSelector;
  }

  render(model) {
    this._debugDiv().innerHTML = model.serialize();

    var board = this.boardDiv();

    var current_player = board.querySelector('.current_player');

    current_player.innerHTML = model.currentTurn();

    for(var col = 0; col < model.COLUMN_COUNT; col ++){
      var column = board.querySelector('.board_column[data-column="' + col + '"]');
      for(var row = 0; row < model.ROW_COUNT; row ++){
        var state = model.at(col,row); 
        var cell = column.querySelector('.cell[data-row="' + row + '"]');

        switch(state) {
          case model.RED:
            this._addClass('player_R', cell);
            this._removeClass('player_B', cell);
            break;
          case model.BLACK:
            this._addClass('player_B', cell);
            this._removeClass('player_R', cell);
            break;
          default:
            this._removeClass('player_R', cell);
            this._removeClass('player_B', cell);
        }

        cell.innerHTML = this._stateToCellContents(state);
      }
    }
  }

  boardDiv(){
    return this._document.getElementById(this.boardSelector);
  }

  bind(callbacks){
    var dropCallback =  this._dropCallback.bind(this, callbacks.drop);
    var grid = this.boardDiv().querySelector('.grid');
    grid.addEventListener('click', dropCallback);

    var reset = this.boardDiv().querySelector('.reset');
    debugger;
    reset.addEventListener('click', function(e){ callbacks.reset(); });
  }

  _stateToCellContents(state){
     if (state === '_') { return '&nbsp;' }
     return state;
  }
  
  _addClass( classname, element ) {
    var cn = element.className;
    //test for existance
    if( cn.indexOf( classname ) != -1 ) {
      return;
    }
    //add a space if the element already has class
    if( cn != '' ) {
      classname = ' '+classname;
    }
    element.className = cn+classname;
  }

  _removeClass( classname, element ) {
      var cn = element.className;
      var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
      cn = cn.replace( rxp, '' );
      element.className = cn;
  }

  _dropCallback(cb, e){
    var container = this._findAncestor(e.target,'board_column');
    if(container){
      var column_index = parseInt(container.dataset.column);
      if(!isNaN(column_index)){
        cb(column_index);
      }
    }
  }

  _debugDiv(){
    return this.boardDiv().querySelector('.debug');
  }

  _findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }  
}
