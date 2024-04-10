// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Admin from "./components/adminLogin"
import Hod from "./components/hodLogin"
import Signup from "./components/Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/HOD" element={<Hod/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;