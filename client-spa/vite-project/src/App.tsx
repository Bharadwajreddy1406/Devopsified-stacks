import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Tools from "./pages/ToolsPage";
import Tutorials from "./pages/TutorialsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
