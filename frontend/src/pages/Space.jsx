import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import LogoutButton from '../components/LogoutButton'
import { FaPlus } from 'react-icons/fa';

const Space = () => {

    const { user } = useContext(UserContext)


  return (
    <div>
    <div>
          <nav className='fixed top-0 left-0 w-full z-50'>
          <div className=' w-full px-10 py-3 flex justify-between text-white bg-zinc-700 items-center'>
        <div className='flex items-center'>
            <img className='h-9 w-9 items-center' src="/Frame.png" alt="" />
            <a className='px-2 text-2xl font-semibold' href="">Vynk</a>
        </div>
        <div className='flex gap-10 items-center'>
            
         
            
            
            <a className='px-3 py-2 w-10 h-10 bg-amber-300 rounded-full ' href="">
              <img className='h-8 w-8' src="./public/profile.png" alt="Profile" />
          
            </a>
            <LogoutButton/>

        </div>
    
      </div>
      </nav>

      
    </div>
     <div className=' border-2 w-full flex items-center mx-10
      h-20 mt-20'>
 {/* Welcome Message */}
      <div className=" text-2xl font-medium text-white  ">
        {!!user && <h2>Welcome, {user.name}!</h2>}
      </div>
        </div>  

        <div className='border-2 h-full px-10 
        flex flex-wrap items-center overflow-auto'>

<div className='bg-amber-100 
h-50 w-50 rounded-2xl flex  
justify-center items-center mx-10
overflow-auto '>
    <div className='h-20 w-20 bg-amber-200 shadow-2xl 
    flex items-center justify-center hover:bg-amber-400
    rounded-full
    '>
        <FaPlus size={30} className='text-amber-600'/>
    </div>

    
</div>

<div className='bg-amber-100 
h-50 w-50 rounded-2xl flex  
justify-center items-center
overflow-auto '>
</div>

            </div> 
    </div>
  )
}

export default Space
