import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{GoogleOAuthProvider} from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <GoogleOAuthProvider clientId='import.meta.env.VITE_GOOGLE_CLIENT_ID'>
   <BrowserRouter>
   <App/>
   </BrowserRouter>
   </GoogleOAuthProvider>
  //</StrictMode>,
)
