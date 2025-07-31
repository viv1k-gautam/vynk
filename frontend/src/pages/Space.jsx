import React from 'react'

import YoutubePlayer from '../components/youtube/YoutubePlayer';
const Space = () => {
  const videoId = "dQw4w9WgXcQ"; // YouTube ka ID
  const isHost = true;
  return (
    <div>
         <YoutubePlayer videoId={videoId} isHost={isHost} />
    </div>
  )
}

export default Space
