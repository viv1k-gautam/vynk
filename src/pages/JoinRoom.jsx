import { FaDoorOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { BsArrowLeftCircleFill } from "react-icons/bs";

import toast from 'react-hot-toast';
const JoinRoom = () => {

const [code, setCode] = useState('');

const navigate = useNavigate();

const handleJoin = async() => {

    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode || trimmedCode.length < 6) {
      toast.error("Please enter a valid room code")
      return;
    }
    try{
      const res =await axios.post(`${import.meta.env.VITE_API_URL}/check-room`,{
        roomCode :trimmedCode
      })
      if(res.data.exists){
        
    //  const trimmedCode = code.trim().toUpperCase();
            navigate(`/stream/${trimmedCode}`, 
              { state: { 
                roomCode: trimmedCode ,
                 roomName:res.data.room.roomName,
                 videoId :res.data.room.videoId,
                 isHost :false,
               
                } ,
            });
          
      } else{
         toast.error("Room does not exist!");
      }
    }catch(err){
      console.error(err)
      toast.error("Server error, please try again later")
    }
  };


  return (
 <div className='min-h-screen text-white flex items-center justify-center 
 bg-[url(/background/bg19.jpg)] 
 bg-cover bg-center relative'>
  <div className='absolute bg-black opacity-80 inset-0'></div>
   <div className="max-w-md w-full bg-white/10 backdrop-blur-sm border border-zinc-400 p-8 rounded-3xl shadow-lg ">
<a href="/welcome"><BsArrowLeftCircleFill className='w-8 h-8 text-white/60 hover:text-white hover:scale-105'
></BsArrowLeftCircleFill></a> 
        <h2 className="text-2xl text-center font-semibold mb-6">Join Watch Party</h2>

        <div className="flex flex-col items-center text-center">
          <div className="bg-[#334155]/50 p-4 rounded-full mb-4">
            <FaDoorOpen size={24} className='text-white-200/50' />
          </div>
           <h3 className="text-lg font-semibold">Enter Party Code</h3>
          <p className="text-sm text-white mb-4">Enter the code shared by the party host</p>

          <input
            type="text" 
            value={code}
            onChange={(e)=>setCode(e.target.value)}         
             maxLength={6}
            placeholder="XXXX-XXXX"
            className="w-full px-4 py-2 rounded bg-zinc-400/20 uppercase
             text-cyan-400 drop-shadow-[0_0_10px_rgba(0,100,100,0.4)] font-semibold placeholder-gray-300 mb-2 outline-none"
          />

          <p className="text-xs text-gray-400 mb-4">Example: ABCD-1234</p>

          <button onClick={handleJoin}
           className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-2xl transition">
            Join Party
          </button>

    


        </div>
   </div>
       
    </div>
  )
}

export default JoinRoom
