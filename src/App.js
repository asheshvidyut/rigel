import "./App.scss";
import NavBar from "./components/NavBar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Footer from "./components/Footer";
import EditorArea from "./components/EditorArea";

function App() {
  return (
    <div className="App">
      <NavBar />
      <LeftPanel />
      <RightPanel />
      <EditorArea />
      <Footer />
    </div>
  );
}

export default App;
