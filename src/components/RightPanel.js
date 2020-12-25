import { Component } from "react";
import { connect } from "react-redux";
import "../css/rightpanel.scss";

class RightPanel extends Component {
  render() {
    return <div className="RightPanel"></div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
