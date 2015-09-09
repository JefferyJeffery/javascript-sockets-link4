import React from "react";

var Board = React.createClass({

  getDefaultProps: function() {
    return {
      rows: [5,4,3,2,1,0],
      columns: [0,1,2,3,4,5,6],
    };
  },
  
  propTypes:{
    model: React.PropTypes.object,
    callbacks:  React.PropTypes.object.isRequired
  },

  currentPlayerDisplay: function(){
    var status = this.props.model.status();

    if(status == this.props.model.STATUS_ACTIVE){
      return `Next: ${this.props.model.currentTurn()}`;
    } else if(this.props.model.winner()) {
      return this.props.model.winner() + ' wins!';
    } else {
      return 'Tie';
    }
  },

  cellStyle: function(col,row){
    switch(this.props.model.at(col,row)) {
      case this.props.model.RED:
        return 'player_R';
      case this.props.model.BLACK:
        return 'player_B';
      default:
        return 'empty';
    }
  },

  dropperDisabled: function(col){
    if(this.props.model.status() != this.props.model.STATUS_ACTIVE ){
      return true;
    } else {
      return false;
    }
  },

  dropperStyle: function(col){
    if(this.dropperDisabled()){
      return '';
    }
    switch(this.props.model.currentTurn()){
      case this.props.model.RED:
        return 'next_R';
      case this.props.model.BLACK:
        return 'next_B';
    }
  },


  dropCallback: function(e){
    e.preventDefault();
    e.stopPropagation();
    if(!this.dropperDisabled()){
      var column_index = parseInt(e.target.dataset.column);
      if(!isNaN(column_index)){
        this.props.callbacks.drop(column_index);
      }
    }
  },

  render: function() {
    console.log(this.props);
    if (!this.props.model){
      return <div>loading...</div>
    }
    var that = this;
    return (
      <div id="board" className="board">
        <table className="status_container">
          <tr>
            <td className="status_field current_player">{ this.currentPlayerDisplay() }</td>
            <td className="status_field reset_container"><button className="btn reset" onClick={that.props.callbacks.reset}>RESET</button></td>
          </tr>
        </table>
        <div className="grid_board_spacer"></div>
        <table className="grid">
          <tr>
            <td className="spacer"></td>
            {that.props.columns.map(function(col, i) {
              return (
                <td className="board_column">
                  <div className='dropper square-box' data-column={col} onClick={ that.dropCallback }>
                    <div className="square-content"><div className={that.dropperStyle(col)}><span></span></div></div>
                  </div>
                </td>
              );
            })}
            <td className="spacer"></td>
          </tr>

          {that.props.rows.map(function(row, i) {
            return (
              <tr className="board_row" data-row={row}>
                <td></td>
                {that.props.columns.map(function(col, i) {
                  return (
                    <td className="cell_holder">
                      <div className={that.cellStyle(col, row) + " cell"} data-column={col}>
                        <div className="cell_content"></div>
                      </div>
                    </td>
                  );
                })}
                <td></td>
              </tr> 
            );
          })}

        </table>
        <div className="debug">{this.props.model.serialize()}</div>
      </div>
    );
  },
});

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
        React.createElement(Board, {view: this}),
        this._boardDiv()
      );
    }
    return this._component;
  }

  _boardDiv(){
    return this._document.getElementById(this.boardSelector);
  }

}

