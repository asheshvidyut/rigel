import React, { Component, Fragment } from "react";
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
import { Col, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

class EditorArea extends Component {
  constructor(props) {
    super(props);
    this.stageRef = React.createRef();
    this.layerRef = React.createRef();
    this.stageHeight = 2000;
    this.stageWidth = 2000;
    this.scaleBy = 1.01;
    this.state = {
      showExpModal: false,
      previewImage: null,
      isDrawing: false,
    };
  }

  handleMouseDown = (e) => {
    if (this.props.selectedOperation === SHAPES.PENCIL) {
      this.setState({ isDrawing: true });
      this.stageRef.current.scale({ x: 1, y: 1 });
      this.stageRef.current.position({
        x: this.stageRef.current.x(),
        y: this.stageRef.current.y(),
      });
      this.stageRef.current.batchDraw();
      const pos = e.target.getStage().getPointerPosition();
      this.props.addLine({
        points: [
          pos.x - this.stageRef.current.x(),
          pos.y - this.stageRef.current.y(),
        ],
      });
    } else if (this.props.selectedOperation) {
      this.stageRef.current.scale({ x: 1, y: 1 });
      this.stageRef.current.position({
        x: this.stageRef.current.x(),
        y: this.stageRef.current.y(),
      });
      let pos = this.stageRef.current.getPointerPosition();
      this.props.addShape(this.props.selectedOperation, {
        x: pos.x - this.stageRef.current.x(),
        y: pos.y - this.stageRef.current.y(),
      });
      setTimeout(() => {
        this.props.setOperation(null);
      }, 500);
    }
  };

  handleMouseMove = (e) => {
    if (this.props.selectedOperation === SHAPES.PENCIL) {
      if (!this.state.isDrawing) return;
      const stage = this.stageRef.current;
      const pos = stage.getPointerPosition();
      if (this.props.layers.length) {
        const lastLine = this.props.layers[this.props.layers.length - 1];
        const newPoints = [
          ...lastLine.points,
          pos.x - this.stageRef.current.x(),
          pos.y - this.stageRef.current.y(),
        ];
        this.props.deleteShape(this.props.layers.length - 1);
        this.props.addLine({
          points: newPoints,
        });
      } else {
        this.props.addLine({
          points: [
            pos.x - this.stageRef.current.x(),
            pos.y - this.stageRef.current.y(),
          ],
        });
      }
    }
  };

  toggleExportModal = (val) => {
    if (val) {
      this.props.setSelectedShape(-1);
      this.stageRef.current.position({ x: 0, y: 0 });
      setTimeout(() => {
        this.setState({ showExpModal: val });
        this.setState({ previewImage: this.getPreviewImage() });
      }, 100);
    } else {
      this.setState({ showExpModal: val });
    }
  };

  handleExport = () => {
    setTimeout(() => {
      let uri = this.getPreviewImage();
      function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      downloadURI(uri, "design.png");
    }, 100);
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

  getDimension = () => {
    let nodes = this.layerRef.current.getChildren();
    let MIN = -1e9;
    let MAX = 1e9;
    let minx = MAX;
    let miny = MAX;
    let maxx = MIN;
    let maxy = MIN;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].className === "Line") {
        let points = nodes[i].points();
        for (let j = 0; j < points.length; j += 2) {
          minx = Math.min(
            minx,
            Math.min(
              points[j] - nodes[i].strokeWidth(),
              points[j] + nodes[i].strokeWidth()
            )
          );
          maxx = Math.max(
            maxx,
            Math.max(
              points[j] - nodes[i].strokeWidth(),
              points[j] + nodes[i].strokeWidth()
            )
          );
          miny = Math.min(
            miny,
            Math.min(
              points[j + 1] - nodes[i].strokeWidth(),
              points[j + 1] + nodes[i].strokeWidth()
            )
          );
          maxy = Math.max(
            maxy,
            Math.max(
              points[j + 1] + nodes[i].strokeWidth(),
              points[j + 1] - nodes[i].strokeWidth()
            )
          );
        }
      } else {
        let nodeX = nodes[i].absolutePosition().x;
        let nodeY = nodes[i].absolutePosition().y;
        let width = nodes[i].width();
        let height = nodes[i].height();
        minx = Math.min(minx, Math.min(nodeX + width, nodeX - width));
        miny = Math.min(miny, Math.min(nodeY + height, nodeY - height));
        maxx = Math.max(maxx, Math.max(nodeX - width, nodeX + width));
        maxy = Math.max(maxy, Math.max(nodeY - height, nodeY + height));
      }
    }
    return {
      x: Math.min(minx, maxx),
      y: Math.min(maxy, miny),
      width: Math.abs(Math.max(minx, maxx) - Math.min(minx, maxx)),
      height: Math.abs(Math.max(miny, maxy) - Math.min(miny, maxy)),
    };
  };

  getPreviewImage = () => {
    this.props.setSelectedShape(-1);
    let position = this.getDimension();
    let uri = this.stageRef.current.toDataURL({
      pixelRatio: 1,
      quality: 100000,
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
    });
    return uri;
  };

  handleCheckboxChange(e) {
    this.props.setSelectedShape(-1);
    this.stageRef.current.position({ x: 0, y: 0 });
    let target = e.target;
    let layerId = parseInt(target.name, 10);
    let layers = [...this.props.layers];
    layers.map((layer) => {
      if (layer.id === layerId) {
        layer.display = e.target.checked;
      }
      return layer;
    });
    this.props.setLayers(layers);
    setTimeout(() => {
      this.setState({ previewImage: this.getPreviewImage() });
    }, 100);
  }

  render() {
    return (
      <Fragment>
        <Modal
          dialogClassName="ExportModal"
          show={this.state.showExpModal}
          onHide={() => this.toggleExportModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Layers to Export</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Button
                onClick={() => {
                  this.handleExport();
                }}
              >
                Export Selected Layers
              </Button>
            </Row>
            <Row>
              <Col md={2}>
                <Form>
                  {this.props.layers.map((layer) => {
                    return (
                      <Form.Check
                        key={layer.id}
                        type="checkbox"
                        checked={layer.display}
                        name={layer.id}
                        label={`${layer.displayName || layer.type}`}
                        onChange={(e) => this.handleCheckboxChange(e)}
                      />
                    );
                  })}
                </Form>
              </Col>
              <Col md={10} style={{ overflow: "scroll" }}>
                <p>Preview</p>
                <img alt="" src={this.state.previewImage} />
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <Button
          size="lg"
          style={{
            float: "right",
            zIndex: 10000000,
            position: "fixed",
            right: 0,
            top: 5,
          }}
          variant="success"
          onClick={() => this.toggleExportModal(true)}
        >
          Export
        </Button>
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
          onMouseUp={(e) => this.setState({ isDrawing: false })}
          onWheel={this.handleWheel}
          draggable={!this.props.selectedOperation}
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
                        isDrawing={this.state.isDrawing}
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
                      />
                    );
                  default:
                    return null;
                }
              })}
          </Layer>
        </Stage>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedId: state.editor.selectedId,
    isDrawing: state.editor.isDrawing,
    layers: state.editor.layers || [],
    selectedOperation: state.editor.selectedOperation,
    stageScale: state.editor.scale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedShape: (shapeId) => {
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        shapeId: -1,
      });
      dispatch({
        type: editorActionTypes.SET_SELECTED_SHAPE_ID,
        shapeId: shapeId,
      });
    },
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
    setEditorScale: (val) => {
      dispatch({
        type: editorActionTypes.SET_EDITOR_SCALE,
        val: val,
      });
    },
    setLayers: (layers) => {
      dispatch({
        type: editorActionTypes.SET_LAYERS,
        val: layers,
      });
    },
    setOperation: (val) => {
      dispatch({
        type: editorActionTypes.SET_OPERATION,
        val: val,
      });
    },
    addShape: (shape, config = {}) => {
      dispatch({
        type: editorActionTypes.ADD_SHAPE,
        shape: shape,
        config: config,
      });
      dispatch({ type: editorActionTypes.UPDATE_SELECTED_SHAPE_ID });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorArea);
