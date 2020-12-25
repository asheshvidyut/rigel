import { Component } from "react";
import { connect } from "react-redux";
import "../css/leftpanel.scss";

class LeftPanel extends Component {
  render() {
    return <div className="LeftPanel"></div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
