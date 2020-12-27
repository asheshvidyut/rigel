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
    if (
      newAttrs.type === SHAPES.LINE ||
      newAttrs.type === SHAPES.ARROW ||
      newAttrs.type === SHAPES.POLYGON
    ) {
      newAttrs["stroke"] = color.hex;
    } else {
      newAttrs["fill"] = color.hex;
    }
    this.props.updateShape(this.props.selectedId, newAttrs);
  };

  handleChangeCompleteStar = (color, property) => {
    let newAttrs = { ...this.props.layer };
    newAttrs[property] = color.hex;
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
            {this.props.layer.type === SHAPES.RECTANGLE &&
              !this.props.layer.hasOwnProperty("displayName") && (
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
                          if (e.target.value)
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
                          if (e.target.value)
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
                          if (e.target.value)
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
                          if (e.target.value)
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
                          if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
            {this.props.layer.type === SHAPES.POLYGON && (
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="strokeWidth">
                        Stroke Width
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="strokeWidth"
                      defaultValue={this.props.layer.strokeWidth}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(
                            e.target.ariaLabel,
                            parseFloat(e.target.value)
                          );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="sides">Sides</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="sides"
                      defaultValue={this.props.layer.sides}
                      onChange={(e) => {
                        if (e.target.value)
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
            {this.props.layer.type === SHAPES.STAR && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="width">Width</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="width"
                      defaultValue={this.props.layer.width}
                      onChange={(e) => {
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="strokeWidth">
                        Stroke Width
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="strokeWidth"
                      defaultValue={this.props.layer.strokeWidth}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(
                            e.target.ariaLabel,
                            parseFloat(e.target.value)
                          );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="numPoints">
                        Num Points
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="numPoints"
                      defaultValue={this.props.layer.numPoints}
                      onChange={(e) => {
                        if (e.target.value)
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
                      <InputGroup.Text id="innerRadius">
                        Inner Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="innerRadius"
                      defaultValue={this.props.layer.innerRadius}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(
                            e.target.ariaLabel,
                            parseFloat(e.target.value)
                          );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="outerRadius">
                        Outer Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="outerRadius"
                      defaultValue={this.props.layer.outerRadius}
                      onChange={(e) => {
                        if (e.target.value)
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
                  onChangeComplete={(col) =>
                    this.handleChangeCompleteStar(col, "fill")
                  }
                />
                <SketchPicker
                  color={this.props.layer.stroke}
                  onChangeComplete={(col) =>
                    this.handleChangeCompleteStar(col, "stroke")
                  }
                />
              </Form>
            )}
            {this.props.layer.type === SHAPES.TEXT && (
              <Form>
                <div className="Tuple">
                  <InputGroup className="First">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="width">Width</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="width"
                      defaultValue={this.props.layer.width}
                      onChange={(e) => {
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="x">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="x"
                      defaultValue={this.props.layer.x}
                      onChange={(e) => {
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="padding">Padding</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="padding"
                      defaultValue={this.props.layer.padding}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(e.target.ariaLabel, e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="fontSize">Font Size</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="fontSize"
                      defaultValue={this.props.layer.fontSize}
                      onChange={(e) => {
                        if (e.target.value)
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
                      <InputGroup.Text id="fontFamily">
                        Font Family
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="fontFamily"
                      defaultValue={this.props.layer.fontFamily}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(e.target.ariaLabel, e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="textDecoration">
                        Text Decoration
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="textDecoration"
                      defaultValue={this.props.layer.textDecoration}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(e.target.ariaLabel, e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="lineHeight">
                        LineHeight
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="lineHeight"
                      defaultValue={this.props.layer.lineHeight}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(e.target.ariaLabel, e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="Single">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="text">Text</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="text"
                      defaultValue={this.props.layer.text}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(e.target.ariaLabel, e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
                <SketchPicker
                  color={this.props.layer.fill}
                  onChangeComplete={(col) => this.handleChangeComplete(col)}
                />
              </Form>
            )}
            {this.props.layer.type === SHAPES.ARC && (
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="innerRadius">
                        Inner Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="innerRadius"
                      defaultValue={this.props.layer.innerRadius}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(
                            e.target.ariaLabel,
                            parseFloat(e.target.value)
                          );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="outerRadius">
                        Outer Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="outerRadius"
                      defaultValue={this.props.layer.outerRadius}
                      onChange={(e) => {
                        if (e.target.value)
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
                      <InputGroup.Text id="angle">Angle</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="angle"
                      defaultValue={this.props.layer.angle}
                      onChange={(e) => {
                        if (e.target.value)
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
            {this.props.layer.type === SHAPES.RING && (
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
                        if (e.target.value)
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
                        if (e.target.value)
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
                      <InputGroup.Text id="innerRadius">
                        Inner Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="innerRadius"
                      defaultValue={this.props.layer.innerRadius}
                      onChange={(e) => {
                        if (e.target.value)
                          this.handleChange(
                            e.target.ariaLabel,
                            parseFloat(e.target.value)
                          );
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="Second">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="outerRadius">
                        Outer Radius
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="outerRadius"
                      defaultValue={this.props.layer.outerRadius}
                      onChange={(e) => {
                        if (e.target.value)
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
