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
        <Navbar.Brand href="https://www.designerfact.com">
          The Design Wine
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Phones" id="collasible-nav-dropdown">
            {DEVICES.PHONES.map((phone, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() => {
                    this.props.addDeviceBackground(phone);
                    this.props.setEditorScale(1);
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
                    this.props.setEditorScale(1);
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
                    this.props.setEditorScale(1);
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
                    this.props.setEditorScale(1);
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
                    this.props.setEditorScale(1);
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
                    this.props.setEditorScale(1);
                  }}
                >
                  {social.displayName}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link>Export</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.CIRCLE)}>
            <BiCircle />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.LINE)}>
            <AiOutlineMinus />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.RECTANGLE)}>
            <BiRectangle />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.ARROW)}>
            <BsArrowUpRight />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.POLYGON)}>
            <BsTriangle />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.STAR)}>
            <AiOutlineStar />
          </Nav.Link>
          <Nav.Link onClick={() => this.inputFileRef.current.click()}>
            <BiImage />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.RING)}>
            <FaLifeRing />
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.ARC)}>
            <CgShapeHalfCircle />
          </Nav.Link>
          <Nav.Link
            onClick={() =>
              this.props.setSelectedPencil(!this.props.selectedPencil)
            }
          >
            {this.props.selectedPencil ? (
              <IconContext.Provider value={{ color: "#0b8793" }}>
                <div>
                  <FaPenFancy />
                </div>
              </IconContext.Provider>
            ) : (
              <FaPenFancy />
            )}
          </Nav.Link>
          <Nav.Link onClick={() => this.props.addShape(SHAPES.TEXT)}>
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
    selectedPencil: state.editor.selectedPencil,
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
    setSelectedPencil: (val) => {
      dispatch({
        type: editorActionTypes.SET_SELECTED_PENCIL,
        val: val,
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
