import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Control from "./pages/Control";
import LiveView from "./pages/LiveView"; // Import LiveView component

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/live" element={<LiveView />} />
      </Routes>
    </Router>
  )
}

export default App;
