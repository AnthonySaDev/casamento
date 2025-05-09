import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gifts from "./pages/Gifts";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<Gifts />} />
      </Routes>
    </Router>
  );
}

export default App;
