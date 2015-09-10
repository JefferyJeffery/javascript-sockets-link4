import React from "react";

export default React.createClass({

  propTypes:{
    model: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="debug">{this.props.model.serialize()}</div>
    );
  }
});
