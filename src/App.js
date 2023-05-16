import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

//pages
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Files from './Pages/Files';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Register />} />

        <Route path='/files' element={<Files />} />
      </Routes>
    </Router>
  );
}

export default App;
