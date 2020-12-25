import { Component } from "react";
import { connect } from "react-redux";

class EditorArea extends Component {
  render() {
    return <div>Editor Area</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
