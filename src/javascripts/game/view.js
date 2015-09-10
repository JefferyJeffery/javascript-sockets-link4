import React from "react";
import Board from "./react_components/board"

export default class Link4View {
 
  constructor(document, boardSelector) {
    this._document = document;
    this.boardSelector = boardSelector;
  }

  render(model) {
    this._ensureComponent().setProps({model: model})
  }

  bind(callbacks){
    this._ensureComponent().setProps({callbacks: callbacks})
  }

  _ensureComponent(){
    if(!this._component){
      this._component = React.render(
        React.createElement(Board),
        this._boardDiv()
      );
    }
    return this._component;
  }

  _boardDiv(){
    return this._document.getElementById(this.boardSelector);
  }

}

