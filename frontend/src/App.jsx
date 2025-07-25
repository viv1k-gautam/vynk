import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Join from './pages/Join'
import Create from './pages/Create'
import Welcome from './pages/Welcome';
import Stream from './pages/Stream';
import Space from './pages/Space';
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import ForceLowercase from "./components/ForceLowercase";
import { UserContextProvider } from '../context/userContext' 

import axios from 'axios'



axios.defaults.baseURL = 'http://localhost:5173';
axios.defaults.withCredentials = true;


const App = () => {
  return (
  <>
 
 <UserContextProvider>
    
<ForceLowercase />
      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
     
     <Routes>
       


      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
       <Route path='/join' element={<Join />}/>
       
      <Route path='/space' element={
        <ProtectedRoute>
          <Space />
        </ProtectedRoute>
      } />

      <Route path='/stream' element={
        <ProtectedRoute> 
          <Stream />
        </ProtectedRoute> 
      } />

      <Route path='/welcome' element={
       <ProtectedRoute>
        <Welcome />
</ProtectedRoute>
        } />
      <Route path='/create' element={
        <ProtectedRoute>
          <Create />
          </ProtectedRoute>
        }/>
       
      
     </Routes>
     
       </UserContextProvider>
      
    </>
  )
}

export default App
