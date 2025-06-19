import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Watching from './pages/Watching'
import Create from './pages/Create'


const App = () => {
  return (
    <div >
     <Routes>


      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
       <Route path='/watching' element={<Watching />}/>
      <Route path='/create' element={<Create />}/>
       
      
     </Routes>
      
    </div>
  )
}

export default App
