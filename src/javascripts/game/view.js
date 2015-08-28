export default class Link4View {
 
  constructor(document, boardSelector) {
    this._document = document;
    this.boardSelector = boardSelector;
  }

  render(model) {
    this._debugDiv().innerHTML = model.serialize();
  }

  boardDiv(){
    return this._document.getElementById(this.boardSelector);
  }
  _debugDiv(){
    return this.boardDiv().querySelector('.debug');
  }
}
