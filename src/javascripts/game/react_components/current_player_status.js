import React from "react";

export default React.createClass({

  getDefaultProps: function() {
    return {
      playerNames: {'R': 'Stu', 'B': 'Dana'}
    };
  },

  getPlayerName: function(code){
    var name = this.props.playerNames[code];
    return name ? name : code;
  },

  propTypes:{
    model: React.PropTypes.object.isRequired,
    playerNames: React.PropTypes.object.isRequired
  },

  render: function(){
    if(this.props.model.isActive()){
      return(
        <div>
          Next:&nbsp;
          <span className="player-name">{ this.getPlayerName(this.props.model.currentTurn()) }</span>
        </div>
      );
    } else if (this.props.model.isTie()){
      return(
        <div>It&quot;s a Draw!</div>
      );
    } else {
      return(
        <div>
          <span className="player-name">{ this.getPlayerName(this.props.model.winner()) }</span>
          &nbsp;wins!
        </div>
      );
    }
  }
});