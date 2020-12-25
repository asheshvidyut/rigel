import { Component } from "react";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    return <div>NavBar</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
