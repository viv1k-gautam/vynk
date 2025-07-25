import React from 'react'
import { FaDoorOpen } from 'react-icons/fa';

const Create = () => {
  return (
 <div className='min-h-screen bg-[#0f172a] text-white flex items-center justify-center'>
   <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-lg shadow-lg">
  
        <h2 className="text-2xl text-center font-semibold mb-6">Join Watch Party</h2>

        <div className="flex flex-col items-center text-center">
          <div className="bg-[#334155] p-4 rounded-full mb-4">
            <FaDoorOpen size={24} />
          </div>
           <h3 className="text-lg font-semibold">Enter Party Code</h3>
          <p className="text-sm text-gray-400 mb-4">Enter the code shared by the party host</p>

          <input
            type="text"
            placeholder="XXXX-XXXX"
            className="w-full px-4 py-2 rounded bg-[#475569] text-white placeholder-gray-300 mb-2 outline-none"
          />

          <p className="text-xs text-gray-400 mb-4">Example: ABCD-1234</p>

          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded transition">
            Join Party
          </button>


        </div>
   </div>
       
    </div>
  )
}

export default Create
