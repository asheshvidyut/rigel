import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/editorarea.scss";
import { Layer, Stage } from "react-konva";
import { SHAPES } from "../constants";
import Rectangle from "./shapes/Rectangle";
import * as editorActionTypes from "../store/actions/editor";
import RCircle from "./shapes/Circle";
import RLine from "./shapes/Line";
import RArrow from "./shapes/Arrow";
import RPolygon from "./shapes/Polygon";
import RStar from "./shapes/Star";

class EditorArea extends Component {
  render() {
    return (
      <Stage
        width={1000}
        height={1000}
        id="editor"
        onClick={(e) => {
          e.evt.stopPropagation();
          this.props.setSelectedShape(-1);
        }}
        className="EditorArea"
      >
        <Layer>
          {this.props.layers.map((shape, i) => {
            switch (shape.type) {
              case SHAPES.RECTANGLE:
                return (
                  <Rectangle
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              case SHAPES.ELLIPSE:
                return (
                  <RCircle
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              case SHAPES.LINE:
                return (
                  <RLine
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              case SHAPES.ARROW:
                return (
                  <RArrow
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              case SHAPES.POLYGON:
                return (
                  <RPolygon
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              case SHAPES.STAR:
                return (
                  <RStar
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === this.props.selectedId}
                    onSelect={() => {
                      this.props.setSelectedShape(shape.id);
                    }}
                    onChange={(newAttrs) =>
                      this.props.updateLayers(shape.id, newAttrs)
                    }
                    setSelectedShape={this.props.setSelectedShape}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedId: state.editor.selectedId,
    layers: state.editor.layers || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        selectedId: shapeId,
      }),
    updateLayers: (shapeId, newAttrs) =>
      dispatch({
        type: editorActionTypes.UPDATE_SHAPE,
        id: shapeId,
        newAttrs: newAttrs,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
