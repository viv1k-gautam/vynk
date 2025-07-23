import React from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
 const navigate = useNavigate();
 const [data, setData] = useState({ 
    name: "",
    email: "",
    password: ""
 });

 const registerUser = async (e) => {
    e.preventDefault(); 
    const { name, email, password } = data;
    try {

      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name,
        email,
        password
      })
      if(data.error) {
        toast.error(data.error);
      }
      else {
        setData({})
        toast.success("Registration successful");
        navigate("/welcome");
      }
    } catch (error) { 
      console.log(error);
    }
  }

  return (
    <div>
       <div className='w-full h-screen text-white flex justify-center items-center bg-[url(https://media.istockphoto.com/id/1271522553/photo/a-young-woman-is-watching-a-movie-and-is-eating-popcorn-at-the-cinema.jpg?s=2048x2048&w=is&k=20&c=mHajW_Pe8krRcSm4gWqSCHuMbzz5n082IcQewIWFmmw=)] bg-cover'>
       <div className='w-96 h-135 bg-white/10 backdrop-blur-md border-white/20 shadow-lg text-white rounded-2xl '>
          <div className='flex justify-center mt-5'>
            <img className='w-10 h-10' src="/Frame.png" alt="" /></div>
            
            <h1 className=' mt-2 mb-10 text-center text-2xl font-semibold tracking-tight capitalize leading-none'>Welcome to Vynk</h1>
            <form className='w-80 mx-auto ' action="" onSubmit={registerUser}>
              <input className='border-2 rounded-2xl block mb-4 w-full px-3 py-2 hover:border-blue-300'
               id="name"  type="text" name='name' placeholder='name' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>

               <input className='border-2 rounded-2xl block mb-4 w-full px-3 py-2 hover:border-blue-300'
               id='email' type="email" name='email' placeholder='email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>

               <input className='border-2 rounded-2xl block mt-2 w-full px-3 py-2'
               id='password' type="password" name='password' placeholder='password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>

               <a href="#" className="mt-2 inline-block font-semibold text-zinc-300">Forgot password ?</a> 

               <button className=" block mt-5 w-full px-3 py-2 bg-blue-600 text-white rounded-full mb-2 " type="submit">Create account</button>
               </form>
             



{/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Google Login Failed');
  }}
/> */}


               <p className="text-xs text-zinc-400 mt-7 w-3/4  mx-auto text-center">By continuing, you agree to Pinterest's Terms of Service and acknowledge that you've read our Privacy Policy. Notice at collection.</p>

            
        </div>
        </div>
    </div>
  )
}
