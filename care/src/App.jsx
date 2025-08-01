import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import GetCare from './components/getCare';

<<<<<<< HEAD
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar'
// import Home from './components/home'
// import About from './components/about'
import Contact from './components/contact'
import Getcare from './components/getCare'

function App() {
  //  const router = createBrowserRouter([

  //   {
  //     path: "/",
  //     element: <><Navbar /> <Home /></>
  //   },
  //   {
  //     path: "/about",
  //     element: <><Navbar /> <About /></>
  //   },
  //   {
  //     path: "/contact",
  //     element: <><Navbar /> <Contact /></>
  //   }


  // ])

  return (
    <>
      {/* <Navbar /> */}
      <Getcare/>
      {/* <Contact /> */}
      {/* <RouterProvider router={router} />   */}
    </>
  )
}
=======
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getCare" element={<GetCare />} />
    </Routes>
  );
};
>>>>>>> 2b78b4bd69c8f35aaec02d63305c2ac10c60a083

export default App;