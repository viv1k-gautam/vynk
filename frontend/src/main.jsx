import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{GoogleOAuthProvider} from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='735330514847-fc7vgtn81rre8vsvppl8hdg61ggtgmq4.apps.googleusercontent.com'>
   <BrowserRouter>
   <App/>
   </BrowserRouter>
   </GoogleOAuthProvider>
  </StrictMode>,
)
