import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Control from "./pages/control/Control";
import LiveView from "./pages/live/LiveView";
import SongEditor from "./components/libraries/songs/SongEditor";
// import { DisplayItemProvider } from "./contexts/DisplayItemContext";

import './App.css';

function App() {

  return (
    <Router>
      {/* <DisplayItemProvider> */}
        <Routes>
          <Route path="/" element={<Control />} />
          <Route path="/live" element={<LiveView />} />
          <Route path="/edit-song" element={<SongEditor />} />
        </Routes>
      {/* </DisplayItemProvider> */}
    </Router>
  )
}

export default App;
