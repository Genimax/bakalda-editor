import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PointEditor from "./pages/PointEditor/PointEditor.jsx";
import "./styles/global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/point-editor" element={<PointEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
