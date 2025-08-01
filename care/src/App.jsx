import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import GetCare from './components/getCare';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getCare" element={<GetCare />} />
    </Routes>
  );
};

export default App;