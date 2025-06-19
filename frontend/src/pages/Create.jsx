import React from 'react'
import { SiNetflix } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import { FaAmazon } from 'react-icons/fa';


const Create = () => {
  return (

       <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
         <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-8">
                <h2 className="text-lg font-semibold mb-4">Party Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Give your watch party a name"
                className="w-full bg-[#334155] px-4 py-2 rounded text-white placeholder-gray-400 outline-none"
              />
</div>

  <div className="bg-[#1e293b] p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Content Selection</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                
                   <button className="bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-red-500 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                <SiNetflix size={20} /> Netflix
              </button>
               <button className="bg-[#facc15]/10 hover:bg-[#facc15]/20 text-red-600 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                <FaYoutube size={20} /> YouTube
              </button>
                            <button className="bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-purple-500 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                <FaAmazon size={20} /> Prime
              </button>

            </div>
              <input
              type="text"
              placeholder="Paste URL or enter content ID"
              className="w-full bg-[#334155] px-4 py-2 rounded text-white placeholder-gray-400 outline-none"
            />
              <p className="text-xs text-gray-400 mt-1">
              Example: https://www.netflix.com/watch/123456789
            </p>

            </div>

            </div>
             {/* Right Section (Preview) */}
        <div className="w-full md:w-[320px] bg-[#1e293b] p-4 rounded-lg space-y-4">
          <img
            src="https://cdn.pixabay.com/photo/2021/02/10/13/35/video-streaming-6002102_1280.jpg" // You can replace this with your image
            alt="Preview"
            className="rounded-lg"
          />
            <div>
            <h3 className="font-bold text-lg">Marvel Movie Night</h3>
            <p className="text-sm text-gray-400">Hosted by you</p>
          </div>

          <div className="flex justify-between text-sm text-gray-300">
            <span>👥 8 participants max</span>
            <span>🔒 Private</span>
          </div>
           <div className="bg-[#334155] p-4 rounded">
            <h4 className="font-semibold mb-2">Room Features</h4>
            <ul className="space-y-1 text-sm list-disc list-inside text-green-400">
              <li>Synchronized playback</li>
              <li>Group chat</li>
              <li>Video reactions</li>
              <li>Host controls</li>
            </ul>
          </div>
           <button className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-semibold">
            Start Watch Party
          </button>
          </div>


         </div>

        
       </div>

  )
}

export default Create
