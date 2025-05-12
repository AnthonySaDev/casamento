import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gifts from "./pages/Gifts";
import Secret from "./pages/Secret";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<Gifts />} />
        <Route path="/secret-names" element={<Secret />} />
      </Routes>
    </Router>
  );
}

export default App;
