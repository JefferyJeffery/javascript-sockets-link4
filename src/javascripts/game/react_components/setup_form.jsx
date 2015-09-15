import React from "react";

export default React.createClass({

  getDefaultProps: function() {
    return {
      playerNames: ['Stu', 'Dana']
    };
  },
  
  propTypes:{
    playerNames: React.PropTypes.array
  },

  getInitialState: function(){
    return {
      namePlayerR: this.props.playerNames[0],
      namePlayerB: this.props.playerNames[1]
    }
  },

  handleInputChange: function(field, e){
    var state = {};
    state[field] = e.target.value;
    this.setState(state);
    console.log(this.state);
  },

  startCallback: function(e){
    e.preventDefault();
    console.log(e);
    console.log(this.state);
  },

  render: function() {
    var that = this;
    return (
      <div className="setup_form">
        <form>
          <input type="text" id="namePlayerR" value={this.state.namePlayerR} placeholder="Red Player" onChange={this.handleInputChange.bind(this, 'namePlayerR')}/>
          <input type="text" id="namePlayerB" value={this.state.namePlayerB} placeholder="Black Player" onChange={this.handleInputChange.bind(this, 'namePlayerB')}/>
          <input type="submit" onClick={this.startCallback} value="Start New Game"/>
        </form>
      </div>
    );
  },
});