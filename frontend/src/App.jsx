import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Watching from './pages/Watching'
import Create from './pages/Create'
import {Toaster} from 'react-hot-toast'

import axios from 'axios'



axios.defaults.baseURL = 'http://localhost:5173';
axios.defaults.withCredentials=true;


const App = () => {
  return (
  <>

      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
     
     <Routes>


      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
       <Route path='/watching' element={<Watching />}/>
      <Route path='/create' element={<Create />}/>
       
      
     </Routes>
      
    </>
  )
}

export default App
