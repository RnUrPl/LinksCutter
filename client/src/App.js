import React, { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Navbar } from './components/Navbar'
import { checkAuth} from './http/userApi'


 function App() {

  useEffect(() => {
    if (localStorage.getItem('token')) {
       checkAuth()
    }
}, [])
  
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App