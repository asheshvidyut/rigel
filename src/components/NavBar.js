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
  FaPencilAlt,
  FaPenFancy,
  MdTextFields,
} from "react-icons/all";
import { SHAPES } from "../constants";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.inputFileRef = React.createRef();
  }
  render() {
    return (
      <Navbar expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="https://www.rigel.com">The Rigel</Navbar.Brand>
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
          <Nav.Link onClick={() => this.props.addShape(SHAPES.ELLIPSE)}>
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
          <Nav.Link>
            <FaPenFancy />
          </Nav.Link>
          <Nav.Link>
            <FaPencilAlt />
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
  return {};
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
