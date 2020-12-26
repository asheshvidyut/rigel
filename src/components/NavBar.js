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
import { SHAPES } from "../constants";

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
          <NavDropdown title="File" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
