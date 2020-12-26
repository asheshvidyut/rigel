import { Component } from "react";
import { connect } from "react-redux";
import "../css/leftpanel.scss";
import * as editorActionTypes from "../store/actions/editor";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  RiDeleteBin6Line,
} from "react-icons/all";

class LeftPanel extends Component {
  render() {
    return (
      <div className="LeftPanel">
        <Badge pill variant="info">
          Layers
        </Badge>
        <ListGroup variant="flush">
          {this.props.layers.map((shape) => {
            return (
              <ListGroup.Item
                key={shape.id}
                variant={shape.id === this.props.selectedId ? "dark" : ""}
                onClick={() => this.props.setSelectedShape(shape.id)}
              >
                <div className="LayerInfo">
                  <span>{shape.type}</span>
                  <div className="LayerActions">
                    <span>
                      {shape.display && (
                        <AiOutlineEyeInvisible
                          onClick={() =>
                            this.props.updateShape(shape.id, {
                              ...shape,
                              display: false,
                            })
                          }
                        />
                      )}
                      {!shape.display && (
                        <AiOutlineEye
                          onClick={() =>
                            this.props.updateShape(shape.id, {
                              ...shape,
                              display: true,
                            })
                          }
                        />
                      )}
                    </span>
                    <span>
                      <RiDeleteBin6Line
                        onClick={() => this.props.deleteShape(shape.id)}
                      />
                    </span>
                  </div>
                </div>
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
    deleteShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.DELETE_SHAPE,
        shapeId: shapeId,
      }),
    updateShape: (shapeId, newAttrs) =>
      dispatch({
        type: editorActionTypes.UPDATE_SHAPE,
        id: shapeId,
        newAttrs: newAttrs,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
