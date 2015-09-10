import React from "react";

export default React.createClass({
  propTypes:{
    model: React.PropTypes.object.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    dropCallback: React.PropTypes.func.isRequired
  },

  cellStyle: function(){
    switch(this.props.model.at(this.props.col,this.props.row)) {
      case this.props.model.RED:
        return 'player_R';
      case this.props.model.BLACK:
        return 'player_B';
      default:
        return 'empty';
    }
  },

  render: function() {
    return(
    <td className="cell_holder">
      <div className={this.cellStyle() + " round cell"} data-column={this.props.col} onClick={ this.props.dropCallback }>
        <div className="cell_content"></div>
      </div>
    </td>
    );
  }

});