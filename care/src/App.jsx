import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import GetCare from './components/getCare';
import NavBar from './components/navbar';

const App = () => {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getCare" element={<GetCare />} />
      </Routes>
    </>

  );
};

export default App;