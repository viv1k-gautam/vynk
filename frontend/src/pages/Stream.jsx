import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

import { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import {FaUserPlus } from 'react-icons/fa';
import {FaRegLaughSquint ,FaRegClone,FaDoorOpen,FaRegPaperPlane } from 'react-icons/fa';
import { FaMicrophone, FaVideo, } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useEffect   } from 'react';  
import YoutubePlayer from "../components/youtube/YoutubePlayer";
import { extractYoutubeVideoID } from '../components/youtube/YoutubeUtils';
import { useNavigate } from 'react-router-dom';

import { useRef } from "react";

import EmojiPicker from 'emoji-picker-react'; 


import io from "socket.io-client";

const socket = io("http://localhost:8000",{
  transports:['websocket','polling'],
}); // backend address

const Stream = () => {
  const chatEndRef = useRef(null);
    const { user } = useContext(UserContext)
  const location = useLocation();
  const navigate = useNavigate()


  const { name, url ,roomCode:initialCode} = location.state || {};
  
  const [roomCode] = useState(initialCode ||"");

  const[videoId,setVideoId] =useState('');

  const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
 const [showEmoji, setShowEmoji] = useState(false);  


  


  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      

    if(url) {
     const id = extractYoutubeVideoID(url);
      setVideoId(id);


    }
    if(roomCode){
      socket.emit('join_room',roomCode)
    }
    socket.on("receive_message",(data)=>{
      setMessages((prev) =>[...prev, data]);
    })
return()=>{
  socket.off('receive_message')
};
    
  

  }, [url ,roomCode ,messages]);


  

   const[micOn,setMicOn] = useState(true);
    const[videoOn,setVideoOn] = useState(true);

    const copy =(e) =>{
        e.preventDefault();
        navigator.clipboard.writeText(roomCode);
        toast('✅ Room code copied')
    };

    const toggleMic = () => {
        setMicOn(!micOn);
    };

    const toggleVideo = () => {
        setVideoOn(!videoOn);
    };
 

    //rome code
                  
    const handleExit = async () => {
  try {
    const res = await fetch("http://localhost:8000/exit", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      navigate("/welcome");
    } else {
      console.error("Failed to exit room");
    }
  } catch (err) {
    console.error(err);
  }
};

//send message

const sendMessage = () => {

  if (message.trim() !== "") {
    const data = {
      room: roomCode,
      author: user.name,  // later replace with actual username
      message,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", data);
     // show instantly
    setMessage("");
  }
};
  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  return (
       <div className='bg-zinc-800 h-full w-full flex flex-col items-center justify-center'> 
    <div className='mt-12  mx-12 rounded-3xl 
    bg-zinc-800
    shadow-2xl border border-white h-auto overflow-auto '>
      <nav>
        <div className='w-full px-10 py-3 flex justify-between text-white bg-zinc-700 items-center'>
          <div className='flex items-center gap-2'> 
            <img className='h-12 w-12' src="/Frame.png" alt="Logo" />
            <div className='flex flex-col '>
            <h1>{name || 'Room name' }</h1>
            <p className='text-zinc-400'>Room Code :
                <a href="#" > {roomCode || "failed"}</a> 
                <FaRegClone className='inline ml-2 mb-2 
                cursor-pointer text-blue-400' onClick={copy} />
            </p>
            </div>
          </div>  
          <div className='flex'> 
             <button className="bg-zinc-600 hover:bg-zinc-500
              text-red-600 font-medium py-1 px-2
              rounded-lg flex items-center 
              justify-center gap-2">
                          <FaYoutube size={30} /> Youtube
                        </button>
                        
                        <button className='bg-blue-400 w-30 flex items-center
                         justify-between px-5 rounded-xl mx-10 font-semibold' >
                            <FaUserPlus size={25}/>
                            Invite
                        </button>

                         <button className='bg-red-500 w-30 flex items-center
                         justify-between px-7 rounded-xl  font-semibold' onClick={handleExit} >
                            <FaDoorOpen size={25}/>
                            Exit
                        </button>
                        


                        </div>
                        
          </div>  

      </nav>
      <div className='w-full h-full flex'>
         
        
        <div className='  w-250 '>
            {/* Video Player Section */}

           <iframe width="560" height="315" 
         src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player" 
            className='w-full h-full' 
            frameborder="0" 
            allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope;"
             referrerpolicy="strict-origin-when-cross-origin" 
             allowFullScreen></iframe>
           

            
        </div>
        <div className='bg-zinc-700 h-145 w-100 border-l border-t border-zinc-600'>
            <div className=' mt-2 h-10 text-white text-center'>

               <p className=' font-semibold text-xl flex justify-between mx-7'> Watch Party : 4 

                <button className='text-zinc-400 '> 

                <FaMicrophone  onClick={toggleMic}
                  className={`inline mx-2  
                  cursor-pointer ${micOn ? 'text-white' : 'text-red-600'}`}/> 
                <FaVideo  onClick={toggleVideo}
                className={`inline mx-2 
                cursor-pointer ${videoOn ? 'text-white ' : 'text-red-600'}`}/>

                </button>
               </p>
            </div>
             {/* card */}
            <div className=' flex flex-wrap h-59 w-99 overflow-auto '>
                <div className='bg-amber-200 h-23 w-40 m-3 mx-4 rounded-xl '></div>
                <div className='bg-amber-200 h-23 w-40 m-3 mx-4 rounded-xl '></div>
                <div className='bg-amber-200 h-23 w-40 m-3 mx-4 rounded-xl '></div>
                <div className='bg-amber-200 h-23 w-40 m-3 mx-4 rounded-xl '></div>
               
            </div>

            {/*chat*/}

            <div className=' h-58  flex border-t border-zinc-500'>
                <div className='
                 overflow-y-auto mb-2 m-5 text-sm space-y-1 text-white w-full scrollbar-hide' >
                  {messages.map((msg,index)=>(
                    <p key={index}>
                      <span className="font-bold text-pink-400">{msg.author}</span>: {msg.message}
                    </p>
                  ))}

                   <div ref={chatEndRef} />
                      
                 </div>

            </div>

  

  

       
            <div className='h-15  flex justify-center items-center '>
                
                <input className='bg-white w-85 h-10 px-2 outline-none
                 rounded-l-3xl' 
                 type="text" 
                 placeholder='Type Your Message' 
                 value={message}
                 onChange={(e)=>setMessage(e.target.value)}
                 onKeyDown={(e)=>e.key =='Enter'&& sendMessage()}
                  />
                  <button className='bg-white h-10 w-10 cursor-pointer
                  flex justify-center items-center text-zinc-600 hover:text-blue-500' 
                   onClick={sendMessage}>
                    <FaRegPaperPlane size={20}/>
                  </button>

                  <button className='bg-white h-10 w-10 rounded-r-3xl
                  flex justify-center items-center text-zinc-600 hover:text-yellow-200'
                  onClick={()=>setShowEmoji(!showEmoji)}
                 >
                  <FaRegLaughSquint size={20}/>
                  </button>
                  {showEmoji &&(
                    <div className='absolute bottom-14 right-0'>
                       <EmojiPicker onEmojiClick={handleEmojiClick} theme='dark' />
                       </div>
                  )}
                  
                  
            </div>

            

        </div>


      </div>
    </div>
   
    </div>
  )
}

export default Stream
