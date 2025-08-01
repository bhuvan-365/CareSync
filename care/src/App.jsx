
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {
   const router = createBrowserRouter([

    {
      path: "/",
      element: <><Navbar /> <Home /></>
    },
    {
      path: "/login",
      element: <><Navbar /> <Login /></>
    },
    {
      path: "/about",
      element: <><Navbar /> <About /></>
    }


  ])

  return (
    <>
    
      <RouterProvider router={router} />  
    </>
  )
}

export default App
