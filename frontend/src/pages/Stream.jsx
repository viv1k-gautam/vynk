import React, { useState, useEffect, useContext } from 'react';
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import { 
  FaYoutube, FaUserPlus, FaRegLaughSquint, FaRegClone,
  FaDoorOpen, FaRegPaperPlane, FaMicrophone, FaVideo 
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import { UserContext } from '../../context/userContext';
import YoutubePlayer from '../components/youtube/YoutubePlayer';
import { extractYoutubeVideoID } from '../components/youtube/YoutubeUtils';
import { useChat } from '../hooks/useChat';

import socket from "../utils/socket";


const Stream = () => {
  const { code } = useParams(); 
  const { user } = useContext(UserContext);
  const location = useLocation();

  const navigate = useNavigate();

  // const { name, url, roomCode: initialCode, isHost } = location.state || {};

  const { state } = location;

const [name, setName] = useState(state?.name || localStorage.getItem("name") || "Room name");
const [url, setUrl] = useState(state?.url || localStorage.getItem("url") || "");
const [isHost, setIsHost] = useState(state?.isHost ?? JSON.parse(localStorage.getItem("isHost") || "false"));

const [roomCode] = useState(state?.roomCode || code || localStorage.getItem("roomCode") || "");

  const [videoId, setVideoId] = useState(state?.videoId || '');
  const [message, setMessage] = useState(''); 

  const [showEmoji, setShowEmoji] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const { messages, chatEndRef } = useChat(roomCode);
  


useEffect(() => {
  if (state) {
    if (state.name) localStorage.setItem("name", state.name);
    if (state.url) localStorage.setItem("url", state.url);
    if (state.isHost !== undefined) localStorage.setItem("isHost", JSON.stringify(state.isHost));
    if (state.roomCode) localStorage.setItem("roomCode", state.roomCode);
  }
}, [state]);




    useEffect(() => {
    if (isHost && videoId) {
       console.log("EMITTING VIDEO ID:", videoId, "TO ROOM:", roomCode);
      socket.emit("video-url", { room:roomCode, videoId });
    }
 console.log("room name:",name)
  console.log("STREAM PAGE RENDERED:");
  console.log("roomCode:", roomCode);
  console.log("videoId:", videoId);
  console.log("isHost:", isHost);

  }, [videoId, isHost, roomCode]);


// YouTube ka ID
useEffect(() => {
     if (url) {
      const id = extractYoutubeVideoID(url);
       console.log("Extracted video ID:", id);
      if (id){
         setVideoId(id);
      if(isHost){
        console.log('emmiting video to room: ,' ,roomCode,id)
        socket.emit('video-url',{room:roomCode,videoId:id})
      }
      }
    }
  
  }, [url]);

useEffect(() => {
  socket.on("load-video", (receivedVideoId) => {
    console.log("📥 Received videoId from host:", receivedVideoId);
    setVideoId(receivedVideoId);
  });

  return () => {
    socket.off("load-video");
  };
}, []);



  // Handlers
  const copyRoomCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(roomCode);
    toast.success('Room code copied');
  };

  const toggleMic = () => setMicOn((prev) => !prev);
  const toggleVideo = () => setVideoOn((prev) => !prev);

  const handleExit = async () => {
    try {

    localStorage.removeItem("name");
    localStorage.removeItem("url");
    localStorage.removeItem("isHost");
    localStorage.removeItem("roomCode");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/exit`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/welcome");
      else console.error("Failed to exit room");
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const data = {
        room: roomCode,
        author: user?.name ||"Gust",
        message,
        time: new Date().toLocaleTimeString(),
      };
     import('../socket/socket').then(({ default: socket }) =>{   
      socket.emit("send_message", data);
      setMessage("");
    })
  };
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
                cursor-pointer text-blue-400' onClick={copyRoomCode} />
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


{videoId && (
  <YoutubePlayer key={videoId} videoId={videoId} isHost={isHost} roomCode={roomCode} />
)}
{/* 
              <YoutubePlayer videoId={videoId} isHost={isHost} /> */}
           

            
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
                <div className= 'relative border border-zinc-500 h-23 w-40 m-3 mx-4 rounded-xl flex items-center justify-center shadow-lg overflow-hidden '>
               
                  <div className='rounded-full  flex h-15 w-15  items-center justify-center  bg-cyan-500 shadow-lg shadow-cyan-1000/100 '>
                                
                      <span className="text-3xl text-white uppercase" > {user?.name?.[0] || "?"}  </span>
                                                
                  </div>

     {/* Buttons - hover pe visible */}
    <div className="absolute bottom-2 flex justify-evenly bg-zinc-600 gap-10
    rounded-3xl overflow-auto opacity-0 hover:opacity-100 transition-opacity duration-1000 border  w-23">
      <button className="bg-zinc-500 text-black p-1 rounded-lg shadow hover:bg-gray-200"> 
        <FaMicrophone ></FaMicrophone>
         </button>
      <button className="bg-zinc-500 text-black p-1 rounded-lg shadow hover:bg-gray-200">
        <FaVideo></FaVideo>
      </button>
    </div>

  


      

                </div>
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
