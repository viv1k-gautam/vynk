import React from 'react'
import { SiNetflix } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import { FaAmazon,FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { isValidYoutubeURL,extractYoutubeVideoID } from '../components/youtube/YoutubeUtils';



const Create = () => {
  const  [partyName, setPartyName] = useState('');
  const [ videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {

    if(!videoUrl) return toast.error('Please enter a video URL ');

    try {
      const res =await fetch('http://localhost:8000/create',{
        method:"POST",
        headers:{
         "Content-Type":"application/json",
        },
        credentials:'include',
        body:JSON.stringify({
          name:partyName,
          url:videoUrl,
        }),
       
      
      });


      const data =await res.json();
      if(data.success){
        toast.success('created Successfully')
        navigate(`/stream/${data.code}`,{
          state:{
            name:partyName,
            url:videoUrl,
      roomCode:data.code,
            isHost:true
          },
          
        })
      }else{
        toast.error('failed to create');
      }
    }catch(err){
      console.error(err);
      toast.error('server error')
    }

  };


  return (

     
      <div
      className="h-screen w-full bg-cover 
    bg-center flex items-center justify-center relative "
      style={{
        backgroundImage:
          "url('/background/bg1.jpg')", // Replace with your background
      }}
    >
       <div className="absolute inset-1 bg-black/10"></div> 

<div className='bg-[#0f172acc] backdrop-blur-sm p-8 rounded-2xl shadow-xl w-[95%] max-w-5xl text-white'>
   <div className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white mb-6" >
           <a href="/welcome" className='flex gap-2 items-center'> <FaArrowLeft /> <span className="text-sm">Back</span></a>
          </div >
          <div className='flex flex-col md:flex-row gap-8'>
             <div className="flex-1 space-y-8">
                        <div>
                          <h2 className="text-lg font-semibold mb-4">Party Details</h2>
                          <input
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            type="text"
                            placeholder="Give your watch party a name"
                            className="w-full bg-[#334155]/70 px-4 py-2 rounded text-white placeholder-gray-400 outline-none"
                          />
                        </div>
            
                        <div className="bg-[#1e293b]/70 p-6 rounded-lg">
                          <h2 className="text-lg font-semibold mb-4">Content Selection</h2>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            
                            <button  className="bg-red-200/10 hover:bg-red-500/20 text-red-500 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                              <FaYoutube size={20}/> YouTube
                            </button>
                            <button className="bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-red-500 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                              <SiNetflix size={20} /> Netflix
                            </button>
                            <button className="bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-purple-500 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                              <FaAmazon size={20} /> Prime
                            </button>
                          </div>
            
                          <input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Paste URL or enter content ID"
                            className="w-full bg-[#334155]/70 px-4 py-2 rounded text-white placeholder-gray-400 outline-none"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Example: https://www.netflix.com/watch/123456789
                          </p>
                        </div>
            
                        <button
                          onClick={handleStart}
                          className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-semibold"
                        >
                          Start Watch Party
                        </button>
                      </div>

                      <div className="w-full md:w-[320px] bg-[#1e293b]/70 p-4 rounded-lg space-y-4">
            <img
              src="https://cdn.pixabay.com/photo/2021/02/10/13/35/video-streaming-6002102_1280.jpg"
              alt="Preview"
              className="rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg">
                {partyName || "Marvel Movie Night"}
              </h3>
              <p className="text-sm text-gray-400">Hosted by you</p>
            </div>

            <div className="flex justify-between text-sm text-gray-300">
              <span>👥 8 participants max</span>
              <span>🔒 Private</span>
            </div>

            <div className="bg-[#334155]/70 p-4 rounded">
              <h4 className="font-semibold mb-2">Room Features</h4>
              <ul className="space-y-1 text-sm list-disc list-inside text-green-400">
                <li>Synchronized playback</li>
                <li>Group chat</li>
                <li>Video reactions</li>
                <li>Host controls</li>
              </ul>
            </div>
          </div>
          </div>

</div>
       
    </div>
    

  )
}

export default Create
