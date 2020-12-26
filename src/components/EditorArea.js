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
    layers: state.editor.layers || [],
    selectOnHover: state.editor.hasOwnProperty("selectOnHover")
      ? state.editor.selectOnHover
      : true,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
