import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import LogoutButton from '../components/LogoutButton'
const Welcome = () => {

  const { user } = useContext(UserContext)

 
  return (
    <div>
      <nav className='fixed top-0 left-0 w-full z-50'>
          <div className=' w-full px-10 py-3 flex justify-between text-white bg-zinc-700 items-center'>
        <div className='flex items-center'>
            <img className='h-9 w-9 items-center' src="/Frame.png" alt="" />
            <a className='px-2 text-2xl font-semibold' href="">Vynk</a>
        </div>
        <div className='flex gap-10 items-center'>
            
          {/* Welcome Message */}
      <div className=" text-lg font-medium text-white  ">
        {!!user && <h2>Welcome, {user.name}!</h2>}
      </div>
            
            
            <a className='px-3 py-2 w-10 h-10 bg-amber-300 rounded-full ' href="">
              <img className='h-8 w-8' src="./public/profile.png" alt="Profile" />
          
            </a>
            <LogoutButton/>

        </div>
    
      </div>
      </nav>

     
      
      <div className='flex items-center justify-center h-screen bg-gradient-to-r from-amber-200 to-amber-400'>

       

        
{/* Create Room Card */}

        <div className='border-amber-50 w-100 mx-10 h-100 flex flex-col justify-between p-4
        bg-gradient-to-r from-blue-200 to-pink-400 rounded-3xl shadow-2xl
         bg-[url(https://cdn.pixabay.com/photo/2024/07/08/05/41/girl-8880144_1280.png)] 
         bg-cover bg-center bg-no-repeat'>

        
            <img  src="./icons/createRoom.png "
            className='w-12 h-12 drop-shadow-2xl' alt="Create Room" />

          <a className='border-amber-50 h-10 w-full block text-center
           bg-orange-300 mt-90 rounded-r-3xl rounded-l-3xl 
             hover:bg-orange-400 transition-all duration-300
              hover:scale-105 text-white ' href='/create'>Create room</a>
        </div>

        {/* Join Room Card */}

                <div className='border-amber-50 w-100 h-100 bg-gradient-to-r
                 from-blue-200 to-pink-400 rounded-3xl shadow-2xl
                 bg-[url(https://cdn.pixabay.com/photo/2025/05/14/16/13/girl-9599953_1280.png)]
                 cover bg-center bg-no-repeat flex flex-col justify-between p-4 '>

                
            <img  src="./icons/joinRoom.png "
            className='w-12 h-12' alt="" />

<a className=' border-amber-50  w-full block text-center
           bg-orange-300 mt-90 rounded-r-3xl rounded-l-3xl 
             hover:bg-orange-400 transition-all duration-300 
             hover:scale-105 text-white ' href='/join'>Join Room</a>
                  
                  
                </div>

                 
      </div>
      <footer className='bg-zinc-700 text-white text-center py-4'>
        <p>&copy; 2024 Vynk. All rights reserved.</p> </footer>
    </div>
  )
}

export default Welcome
