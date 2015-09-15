import React from "react";
import CurrentPlayerStatus from "./current_player_status"

export default React.createClass({
  propTypes:{
    model: React.PropTypes.object.isRequired,
    callbacks: React.PropTypes.object.isRequired
  },
  render: function(){
    return (
      <table className="status_container">
        <tr>
          <td className="status_field current_player"><CurrentPlayerStatus model={this.props.model}/></td>
          <td className="status_field button_container">
            <button className="btn undo" onClick={this.props.callbacks.undo}>UNDO</button>
            <button className="btn reset" onClick={this.props.callbacks.reset}>RESET</button>
          </td>
        </tr>
      </table>
    );
  }
});