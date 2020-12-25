import { Component } from "react";
import { Navbar } from "react-bootstrap";
import "../css/footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Navbar expand="md" bg="dark" variant="dark" fixed="bottom">
          <a href="https://www.asheshvidyut.com">Created by Ashesh Vidyut</a>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
