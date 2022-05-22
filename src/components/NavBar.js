import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/navbar.scss";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import * as editorActionTypes from "../store/actions/editor";
import {
  AiOutlineMinus,
  AiOutlineStar,
  BiCircle,
  BiImage,
  BiRectangle,
  BsArrowUpRight,
  BsTriangle,
  CgShapeHalfCircle,
  FaLifeRing,
  FaPenFancy,
  MdTextFields,
} from "react-icons/all";
import { IconContext } from "react-icons";
import { DEVICES, SHAPES } from "../constants";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.inputFileRef = React.createRef();
  }

  render() {
    return (
      <Navbar expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="https://www.thedesignwine.com">
          The Rigel
        </Navbar.Brand>
        <Nav>
          <NavDropdown title="Phones" id="collasible-nav-dropdown">
            {DEVICES.PHONES.map((phone, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(phone);
                  }}
                >
                  {phone.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Tablets" id="collasible-nav-dropdown">
            {DEVICES.TABLETS.map((tablet, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(tablet);
                  }}
                >
                  {tablet.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Desktop" id="collasible-nav-dropdown">
            {DEVICES.DESKTOPS.map((desktop, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(desktop);
                  }}
                >
                  {desktop.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Watches" id="collasible-nav-dropdown">
            {DEVICES.WATCHES.map((watch, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(watch);
                  }}
                >
                  {watch.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Papers" id="collasible-nav-dropdown">
            {DEVICES.PAPERS.map((paper, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(paper);
                  }}
                >
                  {paper.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown title="Social Media" id="collasible-nav-dropdown">
            {DEVICES.SOCIALS.map((social, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(social);
                  }}
                >
                  {social.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.CIRCLE)}>
            {this.props.selectedOperation === SHAPES.CIRCLE ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <BiCircle />
                </div>
              </IconContext.Provider>
            ) : (
              <BiCircle />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.LINE)}>
            {this.props.selectedOperation === SHAPES.LINE ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <AiOutlineMinus />
                </div>
              </IconContext.Provider>
            ) : (
              <AiOutlineMinus />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.RECTANGLE)}>
            {this.props.selectedOperation === SHAPES.RECTANGLE ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <BiRectangle />
                </div>
              </IconContext.Provider>
            ) : (
              <BiRectangle />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.ARROW)}>
            {this.props.selectedOperation === SHAPES.ARROW ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <BsArrowUpRight />
                </div>
              </IconContext.Provider>
            ) : (
              <BsArrowUpRight />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.POLYGON)}>
            {this.props.selectedOperation === SHAPES.POLYGON ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <BsTriangle />
                </div>
              </IconContext.Provider>
            ) : (
              <BsTriangle />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.STAR)}>
            {this.props.selectedOperation === SHAPES.STAR ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <AiOutlineStar />
                </div>
              </IconContext.Provider>
            ) : (
              <AiOutlineStar />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.inputFileRef.current.click()}>
            <BiImage />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.RING)}>
            {this.props.selectedOperation === SHAPES.RING ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <FaLifeRing />
                </div>
              </IconContext.Provider>
            ) : (
              <FaLifeRing />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.ARC)}>
            {this.props.selectedOperation === SHAPES.ARC ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <CgShapeHalfCircle />
                </div>
              </IconContext.Provider>
            ) : (
              <CgShapeHalfCircle />
            )}
          </Nav.Link>
          <Nav.Link>
            {this.props.selectedOperation === SHAPES.PENCIL ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <FaPenFancy onClick={() => this.props.unsetOperation()} />
                </div>
              </IconContext.Provider>
            ) : (
              <FaPenFancy
                onClick={() => this.props.setOperation(SHAPES.PENCIL)}
              />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.setOperation(SHAPES.TEXT)}>
            <MdTextFields />
          </Nav.Link>
        </Nav>
        <input
          ref={this.inputFileRef}
          style={{ display: "none" }}
          id="fileItem"
          type="file"
          onClick={(event) => (event.target.value = null)}
          onChange={(event) => {
            let imageSrc = URL.createObjectURL(event.target.files[0]);
            this.props.addShape(SHAPES.IMAGE, { src: imageSrc });
          }}
        />
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedOperation: state.editor.selectedOperation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShape: (shape, options = {}) => {
      dispatch({
        type: editorActionTypes.ADD_SHAPE,
        shape: shape,
        options: options,
      });
      dispatch({ type: editorActionTypes.UPDATE_SELECTED_SHAPE_ID });
    },
    setOperation: (val) => {
      dispatch({
        type: editorActionTypes.SET_OPERATION,
        val: val,
      });
    },
    unsetOperation: () => {
      dispatch({
        type: editorActionTypes.SET_OPERATION,
        val: null,
      });
    },
    addDeviceBackground: (config) => {
      dispatch({
        type: editorActionTypes.ADD_SHAPE,
        shape: SHAPES.RECTANGLE,
        config: { ...config, fill: "white", canBeTransformed: false },
      });
    },
    setEditorScale: (val) => {
      dispatch({
        type: editorActionTypes.SET_EDITOR_SCALE,
        val: val,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
