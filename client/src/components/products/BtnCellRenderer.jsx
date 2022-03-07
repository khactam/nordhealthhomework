import React, { Component } from 'react';
class BtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.deleteBtnClickedHandler = this.deleteBtnClickedHandler.bind(this);
      this.modifyBtnClickedHandler = this.modifyBtnClickedHandler.bind(this);
    }
    deleteBtnClickedHandler() {
        this.props.clicked({data:this.props.data, action:'delete'});
    }
    modifyBtnClickedHandler() {
        this.props.clicked({data:this.props.data, action:'modify'});
    }
    render() {
      return (
          <div>
            <button refs="modify" onClick={this.modifyBtnClickedHandler}>Modify</button>
            <button refs="delete" onClick={this.deleteBtnClickedHandler}>Delete</button>
          </div>
      )
    }
}
export default BtnCellRenderer;