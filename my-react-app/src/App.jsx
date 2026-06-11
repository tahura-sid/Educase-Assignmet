import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} /> 
        <Route path="/signup" element={<Signup/> } />
        <Route path="/login" element={<Login/> } />
        <Route path="/profile" element={<Profile/>} />



      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App