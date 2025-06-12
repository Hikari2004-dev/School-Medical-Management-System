
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HoiVien from "./pages/HoiVien";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
      </Routes>
    </Router>
  );
}

export default App;