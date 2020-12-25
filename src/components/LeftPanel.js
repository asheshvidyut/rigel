import { Component } from "react";
import { connect } from "react-redux";
import "../css/leftpanel.scss";
import * as editorActionTypes from "../store/actions/editor";
import ListGroup from "react-bootstrap/ListGroup";

class LeftPanel extends Component {
  render() {
    return (
      <div className="LeftPanel">
        <ListGroup>
          {this.props.layers.map((shape) => {
            return (
              <ListGroup.Item
                key={shape.id}
                variant={shape.id === this.props.selectedId ? "dark" : ""}
                onClick={() => this.props.setSelectedShape(shape.id)}
              >
                {shape.type}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layers: state.editor.layers || [],
    selectedId: state.editor.selectedId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        selectedId: shapeId,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
