import "./App.scss";
import NavBar from "./components/NavBar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Footer from "./components/Footer";
import EditorArea from "./components/EditorArea";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="Container">
        <Row>
          <Col sm={2} className="panel">
            <LeftPanel />
          </Col>
          <Col sm={8} className="editor">
            <EditorArea />
          </Col>
          <Col sm={2} className="panel">
            <RightPanel />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
