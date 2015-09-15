import React from "react";

export default React.createClass({
  propTypes:{
    model: React.PropTypes.object.isRequired,
    dropCallback: React.PropTypes.func.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  dropperStyle: function(col){
    if(!this.props.model.isActive()){
      return '';
    }

    switch(this.props.model.currentTurn()){
      case this.props.model.RED:
        return 'next_R';
      case this.props.model.BLACK:
        return 'next_B';
    }
  },

  render: function() {
    var that = this; // because of the use of map
    return(
      <tr>
        <td className="spacer"></td>
        {this.props.columns.map(function(col, i) {
          return (
            <td key={"dropper-" + col} className="board_column cell_holder">
              <div className={that.dropperStyle(col) + " dropper cell"} data-column={col} onClick={ that.props.dropCallback }>
                <div className="cell_content"></div>
              </div>
            </td>
          );
        })}
        <td className="spacer"></td>
      </tr>
    );
  }

});