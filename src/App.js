import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Licence from "./components/License";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Licence />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
