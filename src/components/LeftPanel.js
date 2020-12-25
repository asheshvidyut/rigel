import { Component } from "react";
import { connect } from "react-redux";

class LeftPanel extends Component {
  render() {
    return <div>LeftPanel</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
