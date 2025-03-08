import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Control from "./pages/Control";
import LiveView from "./pages/LiveView"; // Import LiveView component
import SongEditor from "./components/SongEditor"; // Import SongEditor component

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Control />} />
        <Route path="/live" element={<LiveView />} />
        <Route path="/edit-song" element={<SongEditor />} />
      </Routes>
    </Router>
  )
}

export default App;
