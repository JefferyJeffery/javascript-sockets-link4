import React from "react";
import Cell from "./cell"

export default React.createClass({
  propTypes:{
    model: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
    row: React.PropTypes.number.isRequired,
    dropCallback: React.PropTypes.func.isRequired
  },

  render: function() {
    var that = this; // because of the use of map
    return(
      <tr className="board_row" data-row={this.props.row}>
        <td></td>
        {this.props.columns.map(function(col, i) {
          return (<Cell key={"board-cell-" + that.props.row + "-" + col} model={that.props.model} col={col} row={that.props.row} dropCallback={that.props.dropCallback}/>);
        })}
        <td></td>
      </tr>
    );
  }
});
