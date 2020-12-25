import "./App.scss";
import NavBar from "./components/NavBar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <LeftPanel />
      <RightPanel />
      <Footer />
    </div>
  );
}

export default App;
