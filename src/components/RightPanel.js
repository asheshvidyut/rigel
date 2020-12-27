import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/rightpanel.scss";
import Badge from "react-bootstrap/Badge";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { SHAPES } from "../constants";
import * as editorActionTypes from "../store/actions/editor";
import { SketchPicker } from "react-color";

class RightPanel extends Component {
  handleChange = (key, value) => {
    let property = key;
    let newAttrs = { ...this.props.layer };
    newAttrs[property] = value;
    this.props.updateShape(this.props.selectedId, newAttrs);
  };

  handleChangeComplete = (color) => {
    let newAttrs = { ...this.props.layer };
    if (newAttrs.type === SHAPES.LINE || newAttrs.type === SHAPES.ARROW) {
      newAttrs["stroke"] = color.hex;
    } else {
      newAttrs["fill"] = color.hex;
    }
    this.props.updateShape(this.props.selectedId, newAttrs);
  };

  render() {
    return (
      <div className="RightPanel">
        <Badge pill variant="info">
          Design
        </Badge>
        {this.props.layer ? (
          <div>
            {this.props.layer.type === SHAPES.CIRCLE && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="y">Y</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="y"
                      defaultValue={this.props.layer.y}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="width">Width</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="width"
                      defaultValue={this.props.layer.width}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="height">Height</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="height"
                      defaultValue={this.props.layer.height}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="radius">Radius</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="radius"
                      defaultValue={this.props.layer.radius}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <SketchPicker
                  color={this.props.layer.fill}
                  onChangeComplete={this.handleChangeComplete}
                />
              </Form>
            )}
            {this.props.layer.type === SHAPES.RECTANGLE && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="y">Y</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="y"
                      defaultValue={this.props.layer.y}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="width">Width</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="width"
                      defaultValue={this.props.layer.width}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="height">Height</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="height"
                      defaultValue={this.props.layer.height}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="cornerRadius">
                        Corner Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="cornerRadius"
                      defaultValue={this.props.layer.cornerRadius}
                      onChange={(e) => {
                        let value = e.target.value
                          .split(",")
                          .map((num) => parseFloat(num));
                        this.handleChange(e.target.ariaLabel, value);
                      }}
                    />
                  </InputGroup>
                </div>
                <SketchPicker
                  color={this.props.layer.fill}
                  onChangeComplete={this.handleChangeComplete}
                />
              </Form>
            )}
            {this.props.layer.type === SHAPES.LINE && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="y">Y</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="y"
                      defaultValue={this.props.layer.y}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="strokeWidth">
                        Stroke Width
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="strokeWidth"
                      defaultValue={this.props.layer.strokeWidth}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <SketchPicker
                  color={this.props.layer.fill}
                  onChangeComplete={this.handleChangeComplete}
                />
              </Form>
            )}
            {this.props.layer.type === SHAPES.ARROW && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="y">Y</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="y"
                      defaultValue={this.props.layer.y}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="strokeWidth">
                        Stroke Width
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="strokeWidth"
                      defaultValue={this.props.layer.strokeWidth}
                      onChange={(e) => {
                        this.handleChange(
                          e.target.ariaLabel,
                          parseFloat(e.target.value)
                        );
                      }}
                    />
                  </InputGroup>
                </div>
                <SketchPicker
                  color={this.props.layer.fill}
                  onChangeComplete={this.handleChangeComplete}
                />
              </Form>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedId: state.editor.selectedId,
    layers: state.editor.layers,
    layer: state.editor.layers
      ? state.editor.layers[state.editor.selectedId]
      : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShape: (shapeId, newAttrs) =>
      dispatch({
        type: editorActionTypes.UPDATE_SHAPE,
        shapeId: shapeId,
        newAttrs: newAttrs,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
