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
import RImage from "./shapes/Image";
import RText from "./shapes/Text";
import RRing from "./shapes/Ring";
import RArc from "./shapes/Arc";

class EditorArea extends Component {
  handleMouseDown = (e) => {
    if (this.props.selectedPencil) {
      this.props.setIsDrawing(true);
      const pos = e.target.getStage().getPointerPosition();
      this.props.addLine({ x: 0, y: 0, points: [pos.x, pos.y] });
    }
  };

  handleMouseMove = (e) => {
    if (this.props.selectedPencil) {
      if (!this.props.isDrawing) return;
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
      if (this.props.layers.length) {
        const lastLine = this.props.layers[this.props.layers.length - 1];
        const newPoints = [...lastLine.points, pos.x, pos.y];
        this.props.deleteShape(this.props.layers.length - 1);
        this.props.addLine({ x: 0, y: 0, points: newPoints });
      } else {
        this.props.addLine({ x: 0, y: 0, points: [pos.x, pos.y] });
      }
    }
  };

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
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseUp={(e) => this.props.setIsDrawing(false)}
        className="EditorArea"
      >
        <Layer>
          {this.props.layers
            .filter((shape) => shape.display)
            .map((shape, i) => {
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
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
                    />
                  );
                case SHAPES.CIRCLE:
                  return (
                    <RCircle
                      key={shape.id}
                      shapeProps={shape}
                      isSelected={shape.id === this.props.selectedId}
                      onSelect={() => {
                        this.props.setSelectedShape(shape.id);
                      }}
                      onChange={(newAttrs) =>
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
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
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
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
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
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
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
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
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
                    />
                  );
                case SHAPES.IMAGE:
                  return (
                    <RImage
                      imageSrc={shape.options.src}
                      key={shape.id}
                      shapeProps={shape}
                      isSelected={shape.id === this.props.selectedId}
                      onSelect={() => {
                        this.props.setSelectedShape(shape.id);
                      }}
                      onChange={(newAttrs) =>
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
                    />
                  );
                case SHAPES.TEXT:
                  return (
                    <RText
                      key={shape.id}
                      shapeProps={shape}
                      isSelected={shape.id === this.props.selectedId}
                      onSelect={() => {
                        this.props.setSelectedShape(shape.id);
                      }}
                      onChange={(newAttrs) =>
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
                    />
                  );
                case SHAPES.RING:
                  return (
                    <RRing
                      key={shape.id}
                      shapeProps={shape}
                      isSelected={shape.id === this.props.selectedId}
                      onSelect={() => {
                        this.props.setSelectedShape(shape.id);
                      }}
                      onChange={(newAttrs) =>
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
                    />
                  );
                case SHAPES.ARC:
                  return (
                    <RArc
                      key={shape.id}
                      shapeProps={shape}
                      isSelected={shape.id === this.props.selectedId}
                      onSelect={() => {
                        this.props.setSelectedShape(shape.id);
                      }}
                      onChange={(newAttrs) =>
                        this.props.updateShape(shape.id, newAttrs)
                      }
                      setSelectedShape={this.props.setSelectedShape}
                      toggleHover={this.props.toggleHover}
                      selectOnHover={this.props.selectOnHover}
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
    isDrawing: state.editor.isDrawing,
    layers: state.editor.layers || [],
    selectOnHover: state.editor.hasOwnProperty("selectOnHover")
      ? state.editor.selectOnHover
      : true,
    selectedPencil: state.editor.selectedPencil,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        selectedId: shapeId,
      }),
    updateShape: (shapeId, newAttrs) =>
      dispatch({
        type: editorActionTypes.UPDATE_SHAPE,
        id: shapeId,
        newAttrs: newAttrs,
      }),
    toggleHover: (val) => {
      dispatch({
        type: editorActionTypes.DISABLE_HOVER,
        val: val,
      });
    },
    addLine: (options) => {
      dispatch({
        type: editorActionTypes.ADD_SHAPE,
        shape: SHAPES.LINE,
        config: options,
      });
    },
    deleteShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.DELETE_SHAPE,
        shapeId: shapeId,
      }),
    setIsDrawing: (val) => {
      dispatch({
        type: editorActionTypes.SET_IS_DRAWING,
        val: val,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
