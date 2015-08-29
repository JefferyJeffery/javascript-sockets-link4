export default class Link4View {
 
  constructor(document, boardSelector, callbacks) {
    this._document = document;
    this.boardSelector = boardSelector;
  }

  render(model) {
    this._debugDiv().innerHTML = model.serialize();

    for(var col = 0; col < model.COLUMN_COUNT; col ++){
      var column = this.boardDiv().querySelector('.board_column[data-column="' + col + '"]');
      for(var row = 0; row < model.ROW_COUNT; row ++){
         var state = model.at(col,row); 
         var cell = column.querySelector('.cell[data-row="' + row + '"]');
         cell.innerHTML = state;
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
