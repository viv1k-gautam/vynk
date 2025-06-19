import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-zinc-800 '>
      <div className=' w-full px-10 py-3 flex justify-between text-white bg-zinc-700 items-center'>
        <div className='flex items-center'>
            <img className='h-9 w-9 items-center' src="./public/Frame.png" alt="" />
            <a className='px-2 text-2xl font-semibold' href="">Vynk</a>
        </div>
        <div className='flex gap-10 items-center'>
            
            <a href="#">Profile</a>
            <a className='text-blue-200' href='/login'>Login</a>
            <a className='px-3 py-2 bg-amber-300 rounded-lg' href="">Sign up</a>

        </div>
    
      </div>

      <div className='w-190 h-130 object-cover flex '>
        <img className='w-full h-full'  src="https://cdn.pixabay.com/photo/2022/02/21/06/56/couple-7025924_1280.jpg" alt=""  />
        <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2022/02/21/07/00/couple-7025933_1280.jpg" alt="" />
        <div className='absolute top-20 left-0 w-150 h-5  opacity-100 flex flex-col justify-start py-50 item-start text-white px-10 '>

        <h1 className='text-5xl font-bold mb-4 max-w-xl'>Watch Together, Miles Apartk</h1>
        <p className='text-lg max-w-xl mt-3'>Synchronize your streaming experience with friends and family. Share reactions, chat, and enjoy content together in perfect sync, no matter where you are.</p>

        <div className="mt-10 flex gap-4">
        
         <Link to="/watching">
      <button className="bg-blue-600 px-5 py-2 rounded text-white hover:bg-blue-700">Start Watching</button>
       </Link>

       <Link to="/create">
      <button className="bg-white text-blue-600 px-5 py-2 rounded hover:bg-blue-100">Create Watch Party</button>
       </Link>
    </div>
        </div>

      </div>
      <h2 class="text-3xl font-bold text-center mt-10 mb-12 text-white">How It Works</h2>
      <div><div className=' text-white w-full h-50 flex justify-center-safe items-center gap-20'>

    <div className='w-80 h-50 bg-zinc-700 rounded-2xl  '>

        <div class="flex justify-center mt-2 mb-4">
        <div class="bg-gray-700 p-4 rounded-full">
          <svg class=" w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 2v20l18-10L4 2z"/>
          </svg>
        </div>
      </div>
       <h3 class="text-xl text-center font-semibold mb-2">Choose Your Content</h3>
      <p class="text-sm text-center text-gray-400 ">
        Select from YouTube, Netflix, Disney+, and more. Our platform supports all major streaming services.
      </p>
    </div>


    <div className='w-80 h-50 bg-zinc-700  rounded-2xl'>

        <div class="flex justify-center mt-2 mb-4">
        <div class="bg-gray-700 p-4 rounded-full">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C15.57 13.36 17 14.4 17 15.5V19h5v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        </div>
      </div>
      <h3 class="text-xl text-center font-semibold mb-2">Invite Friends</h3>
      <p class="text-sm text-center text-gray-400">
        Generate a room code or link and share it with friends. They can join instantly from anywhere.
      </p>
    </div>

    <div className='w-80 h-50 bg-zinc-700  rounded-2xl'>
          <div class="flex justify-center mt-2 mb-4">
        <div class="bg-gray-700 p-4 rounded-full">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 8v8l6-4-6-4z"/><circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>
      <h3 class="text-xl text-center font-semibold mb-2">Watch & React</h3>
      <p class="text-sm  text-center text-gray-400">
        See friends' reactions in real-time via video call while chatting and enjoying perfectly synchronized content.
      </p>
    </div>
</div>



</div>

<div className='w-full h-30 text-white '>
    <h1 className='text-center mt-10 font-bold text-3xl'>Experience Seamless Synchronized Streaming</h1>
    <p className='text-center mt-3'>Our advanced technology ensures everyone stays in perfect sync, down to the <br /> millisecond.</p>
</div>
    </div>
  )
}

export default Home
