import React from "react";
import Row from "./row"
import DropperRow from "./dropper_row"
import StatusBar from "./status_bar"
import DebugZone from "./debug_zone"


export default React.createClass({

  getDefaultProps: function() {
    return {
      rows: [5,4,3,2,1,0],
      columns: [0,1,2,3,4,5,6],
    };
  },
  
  propTypes:{
    model: React.PropTypes.object,
    callbacks:  React.PropTypes.object
  },

  dropCallback: function(e){
    e.preventDefault();
    e.stopPropagation();
    if(this.props.model.isActive()){
      var column_index = parseInt(e.currentTarget.dataset.column);
      if(!isNaN(column_index)){
        this.props.callbacks.drop(column_index);
      }
    }
  },

  shared_props: function(){
    var wrapped = this.props;
    return wrapped;
  },


  render: function() {
    if (!this.props.model){
      return <div>loading...</div>
    }
    var shared_props = this.shared_props();

    var that = this;
    return (
      <div className="board">
        <StatusBar {...shared_props}/>
        <table className="grid">
          <DropperRow {...shared_props} dropCallback={that.dropCallback}/>

          {that.props.rows.map(function(row, i) {
            return (
              <Row key={"board-row-" + row} {...shared_props} row={row}  dropCallback={that.dropCallback}/>
            );
          })}

        </table>
        <DebugZone {...shared_props}/>
      </div>
    );
  },
});