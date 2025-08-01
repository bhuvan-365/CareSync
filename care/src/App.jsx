
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

export default App
