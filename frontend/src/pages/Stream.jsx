import React from 'react'
import { FaYoutube } from 'react-icons/fa';
import {FaUserPlus  } from 'react-icons/fa';
import {FaLaughSquint} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';  

const Stream = () => {

    const copy =(e) =>{
        e.preventDefault();
        navigator.clipboard.writeText(code);
        toast('✅ Room code copied')
    }
 const code = 65464;

  return (
    <div className='mt-12 mx-20 rounded-3xl 
    bg-gradient-to-r from-blue-200 to-pink-400 
    shadow-2xl border border-white h-auto overflow-auto'>
      <nav>
        <div className='w-full px-10 py-3 flex justify-between text-white bg-zinc-700 items-center'>
          <div className='flex items-center gap-2'> 
            <img className='h-12 w-12' src="/Frame.png" alt="Logo" />
            <div className='flex flex-col '>
            <p>Yt video name</p>
            <p className='text-zinc-400'>Room Code :
                <a href="#" onClick={copy}>{code}</a>
            </p>
            </div>
          </div>  
          <div className='flex'> 
             <button className="bg-zinc-600 hover:bg-zinc-500
              text-red-600 font-medium py-1 px-2
              rounded-lg flex items-center 
              justify-center gap-2">
                          <FaYoutube size={30} /> 
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
         
        
        <div className='w-250'>
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/xVU2UDaFOfE?si=9k3fXn3kAEZB9A_Y" 
            title="YouTube video player" 
            className='w-full h-full' 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerpolicy="strict-origin-when-cross-origin" 
             allowfullscreen></iframe>
        </div>
        <div className='bg-zinc-700 h-145 w-100 border-l border-t border-zinc-600'>
            <div className=' mt-2 h-10 text-white text-center'>
               <p className=' font-semibold text-xl'> Watch Party : 5 </p>
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
                 overflow-y-auto mb-2 text-sm space-y-1'>
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
                  <FaLaughSquint size={20}/>
                  </button>
                  
                  
            </div>

            

        </div>


      </div>
    </div>
  )
}

export default Stream
