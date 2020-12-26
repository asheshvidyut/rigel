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
  constructor(props) {
    super(props);
    this.stageRef = React.createRef();
    this.layerRef = React.createRef();
    this.stageHeight = 1000;
    this.stageWidth = 1000;
    this.scaleBy = 1.01;
  }
  handleMouseDown = (e) => {
    if (this.props.selectedPencil) {
      this.props.setIsDrawing(true);
      this.stageRef.current.scaleX(1);
      this.stageRef.current.scaleY(1);
      this.stageRef.current.position({ x: 0, y: 0 });
      this.stageRef.current.batchDraw();
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

  handleWheel = (e) => {
    // prevent parent scrolling
    e.evt.preventDefault();
    let oldScale = this.stageRef.current.scaleX();

    let pointer = this.stageRef.current.getPointerPosition();

    var mousePointTo = {
      x: (pointer.x - this.stageRef.current.x()) / oldScale,
      y: (pointer.y - this.stageRef.current.y()) / oldScale,
    };

    var newScale =
      e.evt.deltaY > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

    this.stageRef.current.scale({ x: newScale, y: newScale });

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    this.stageRef.current.position(newPos);
    this.stageRef.current.batchDraw();
  };

  render() {
    return (
      <Stage
        width={this.stageWidth}
        height={this.stageHeight}
        ref={this.stageRef}
        onClick={(e) => {
          e.evt.stopPropagation();
          this.props.setSelectedShape(-1);
        }}
        scaleX={this.props.stageScale}
        scaleY={this.props.stageScale}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseUp={(e) => this.props.setIsDrawing(false)}
        onMouseOut={() => this.props.setUri(this.stageRef.current.toDataURL())}
        onWheel={this.handleWheel}
        className="EditorArea"
      >
        <Layer ref={this.layerRef}>
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
    stageScale: state.editor.scale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedShape: (shapeId) =>
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        shapeId: shapeId,
      }),
    updateShape: (shapeId, newAttrs) =>
      dispatch({
        type: editorActionTypes.UPDATE_SHAPE,
        shapeId: shapeId,
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
    setEditorScale: (val) => {
      dispatch({
        type: editorActionTypes.SET_EDITOR_SCALE,
        val: val,
      });
    },
    setUri: (val) => {
      dispatch({
        type: editorActionTypes.SET_URI,
        val: val,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
