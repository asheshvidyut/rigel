import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/editorarea.scss";

class EditorArea extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }
  render() {
    return (
      <div className="EditorArea">
        <canvas id="editor" ref={this.editorRef} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
