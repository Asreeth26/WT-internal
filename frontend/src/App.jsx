// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Admin from "./components/adminLogin"
import Hod from "./components/hodLogin"
import Signup from "./components/Signup"
import Adminhome from "./components/adminhome"
import Adminhod from "./components/adminhod"
import Marks from "./components/Marks"
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
          <Route path="/adminhome" element={<Adminhome/>}/>
          <Route path="/adminhod" element={<Adminhod/>}/>
          <Route path="/admin/marks" element={<Marks/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;