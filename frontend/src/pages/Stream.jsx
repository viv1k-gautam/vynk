import React from 'react'
import { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import {FaUserPlus } from 'react-icons/fa';
import {FaRegLaughSquint ,FaRegClone} from 'react-icons/fa';
import { FaMicrophone, FaVideo } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useEffect   } from 'react';  
import YoutubePlayer from "../components/youtube/YoutubePlayer";
import { extractYoutubeVideoID } from '../components/youtube/YoutubeUtils';
// import GetRandomCode from '../components/GetRandomCode';
const Stream = () => {
  const location = useLocation();



  const { name, url } = location.state || {};
  
  const [roomCode, setRoomCode] = useState('');

  const[videoId,setVideoId] =useState('');

  


  useEffect(() => {
    if(url) {
     const id = extractYoutubeVideoID(url);
      setVideoId(id);
    }

    
  

const fetchRoomCode =async () =>{
    try{
        const res =await fetch('http://localhost:8000/stream');
        const data =await res.json();
        setRoomCode(data.roomCode);
    }catch(err){
        console.error("Error fetching",err);

    }


}

fetchRoomCode();

  }, [url]);

    //  const code = GetRandomCode() || 'ABC123'; // Default code if generateRoomCode fails

  

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
            allow="accelerometer; 
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

            <div className=' h-58 flex border-t border-zinc-500'>
                <div className='
                 overflow-y-auto mb-2 m-5 text-sm space-y-1 text-white'>
                      <p>
                <span className="font-bold text-pink-400">Emma</span>: OMG that
                plot twist! 😲
              </p>
               <p>
                <span className="font-bold text-blue-400">James</span>: I knew
                it! Called it from the beginning 😏
              </p>
              <p>
                <span className="font-bold text-purple-400">Sophia</span>: Same
                😆
              </p>
                 </div>
            </div>


       
            <div className='h-15  flex justify-center items-center '>
                
                <input className='bg-white w-85 h-10 px-2 outline-none
                 rounded-l-3xl' type="text" placeholder='Type Your Message' 
                  />
                  <button className='bg-white h-10 w-10 rounded-r-3xl
                  flex justify-center items-center text-zinc-600'>
                  <FaRegLaughSquint size={20}/>
                  </button>
                  
                  
            </div>

            

        </div>


      </div>
    </div>
   
    </div>
  )
}

export default Stream
