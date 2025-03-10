import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Polls from "./components/Polls";
import CreatePoll from "./components/CreatePoll";
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Polls />} />
        <Route path="/create" element={<CreatePoll />} />
      </Routes>
    </Router>
  );
}

export default App;
