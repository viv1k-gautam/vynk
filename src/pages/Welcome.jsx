import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import LogoutButton from '../components/LogoutButton'
import { FaPlus,FaUsers, } from 'react-icons/fa'
import { BsShieldCheck,BsGlobe,BsFastForward } from "react-icons/bs";
const Welcome = () => {

  const { user } = useContext(UserContext)

 
  return (
<div> 
  {/* Navbar */}
  <nav className="fixed top-0 left-0 w-full z-50 ">
    <div className="w-full px-10 py-3 flex justify-between items-center bg-zinc-800/50 text-white backdrop-blur-xs ">
      <div className="flex items-center">
        <img className="h-9 w-9" src="/Frame.png" alt="Logo" />
        <a className="px-2 text-2xl font-semibold" href="">
          Vynk
        </a>
      </div>
      <div className="flex gap-6 items-center">
        <a href="/" className='underline' >Home</a>

        <LogoutButton />
        <a
          className="px-3 py-2 w-10 h-10 bg-amber-300 rounded-full"
          href=""
        >
          <img className="h-8 w-8" src="./public/profile.png" alt="Profile" />
        </a>
       
      </div>
    </div>
  </nav>

  {/* Main Section */}
  <div className="flex flex-col items-center justify-center min-h-screen pt-20 
  bg-[url(https://images.unsplash.com/photo-1492573637402-25691cd9eac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
   bg-contain">
    <h1 className="text-4xl font-bold text-white mb-3">Welcome {user?.name? user.name.charAt(0).toUpperCase() + user.name.slice(1):'Gust'}!!</h1>
    <p className="text-gray-500 mb-10 text-center max-w-xl">
      Create your own space or join existing rooms to connect with others.
      Experience seamless collaboration and communication.
    </p>

    <div className="flex gap-8 flex-wrap justify-center">
      {/* Create Room Card */}
      <div className="group relative w-80 rounded-3xl p-6 bg-white/5 backdrop-blur-sm shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="flex justify-center items-center border border-white w-10 h-10 rounded-2xl animate-bounce  backdrop-sm">
        <FaPlus className=' rounded-full border-2 text-green-300'></FaPlus>
        </div>
        <h2 className="text-xl font-semibold text-white text-center mt-4">Create New Room</h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Start your own room and invite others to join. Set up custom settings,
          manage participants, and lead engaging discussions.
        </p>
        <Link
          to="/create"
          className="block mt-6 w-full text-center py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          Create Room
        </Link>
      </div>

      {/* Join Room Card */}
      <div className="group relative w-80 rounded-3xl p-6  bg-white/5 backdrop-blur-sm shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="flex justify-center items-center border border-white w-10 h-10 rounded-2xl animate-bounce bg-#FF714B backdrop-sm ">
         <FaUsers className='text-orange-300'></FaUsers>
        </div>
        <h2 className="text-xl font-semibold text-white text-center mt-4">Join Existing Room</h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Enter a room code or browse available rooms. Connect with friends,
          colleagues, or new people in active conversations.
        </p>
        <Link
          href="/join-room"
          className="block mt-10 w-full text-center py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-300"
        >
          Join Room
        </Link>
      </div>
    </div>

    {/* Features Row */}
    <div className="flex gap-8 mt-14 flex-wrap justify-center">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-green-500 text-lg bg-green-200 w-10 h-10 flex justify-center items-center rounded-full">
      <BsShieldCheck  color="green" />
          </span> Secure & Private
      </div>
      <div className="flex items-center gap-2 text-gray-600  ">
        <span className="text-blue-500 text-lg  bg-blue-200 w-10 h-10 flex justify-center items-center rounded-full">
          <BsGlobe /></span> Global Access
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-purple-500 text-lg bg-purple-200 w-10 h-10 flex justify-center items-center rounded-full" >
          <BsFastForward/></span> Real-time Sync
      </div>
    </div>

    <p className="text-gray-400 text-sm mt-4">
      Join over 50,000+ users already using Vynk for their collaboration needs.
    </p>
  </div>

  {/* Footer */}
  <footer className="bg-black/80  text-zinc-400 text-center py-4">
    <p>&copy; 2024 Vynk. All rights reserved.</p>
  </footer>
</div>

  )
}

export default Welcome
