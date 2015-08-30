export default class Link4View {
 
  constructor(document, boardSelector, callbacks) {
    this._document = document;
    this.boardSelector = boardSelector;
  }

  render(model) {
    this._debugDiv().innerHTML = model.serialize();

    var board = this.boardDiv();

    var current_player_div = board.querySelector('.current_player');

    var status = model.status();

    if(status == model.STATUS_ACTIVE){
      current_player_div.innerHTML = `Next: ${this._currentPlayerName(model.currentTurn())}`;
    } else if(model.winner()) {
      current_player_div.innerHTML = '' + this._currentPlayerName(model.winner()) + ' wins!';
    } else {
      current_player_div.innerHTML = 'Tie';
    }

    this._forEachElement('.dropper', (dropper) => {
      this._dropperView(dropper, model);
    } );

    for(var row = 0; row < model.ROW_COUNT; row ++){
      for(var col = 0; col < model.COLUMN_COUNT; col ++){
        var board_row = board.querySelector('.board_row[data-row="' + row + '"]');
        var state = model.at(col,row); 
        var cell = board_row.querySelector('.cell[data-column="' + col + '"]');
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
      }
    }
  }

  boardDiv(){
    return this._document.getElementById(this.boardSelector);
  }

  bind(callbacks){
    var dropCallback =  this._dropCallback.bind(this, callbacks.drop);

    this._forEachElement('.dropper', (dropper) => {
      dropper.addEventListener('click', dropCallback);
    } );

    this._forEachElement('.cell', (cell) => {
      cell.addEventListener('click', dropCallback);
    } );

    var reset = this.boardDiv().querySelector('.reset');
    reset.addEventListener('click', function(e){ callbacks.reset(); });
  }

  _dropperView(dropper, model){
    this._removeClass('next_R', dropper);          
    this._removeClass('next_B', dropper);          
    if(model.status() != model.STATUS_ACTIVE ){
      dropper.disabled = true;
    } else {
      dropper.disabled = false;
      switch(model.currentTurn()){
        case model.RED:
          this._addClass('next_R', dropper);
        break;
        case model.BLACK:
          this._addClass('next_B', dropper);
        break;
      }

    }
  }

  _currentPlayerName(status){
    switch(status){
      case 'R':
        return 'Stu';
      case 'B':
        return 'Dana';
    }
    return '-';
  }

  _forEachElement(selector, cb){
    var elements = this.boardDiv().querySelectorAll(selector);
    for(var i = 0; i < elements.length ; i++){
      cb.apply(this,[elements[i]]);
    }
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
    e.preventDefault();
    e.stopPropagation();
    var column_index = parseInt(e.target.dataset.column);
    if(!isNaN(column_index)){
      cb(column_index);
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
