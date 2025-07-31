import React from 'react';

const YoutubePlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
export default YoutubePlayer;


// import React, { useEffect, useRef } from 'react';
// import socket from '../../socket/socket';

// const YoutubePlayer = ({ videoId, isHost }) => {
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     document.body.appendChild(tag);

//     window.onYouTubeIframeAPIReady = () => {
//       playerRef.current = new window.YT.Player('yt-player', {
//         videoId,
//         events: {
//           onReady: (event) => {
//             if (isHost) {
//               event.target.addEventListener("onStateChange", (e) => {
//                 const currentTime = playerRef.current.getCurrentTime();
//                 if (e.data === window.YT.PlayerState.PLAYING) {
//                   socket.emit("video-action", { action: "play", currentTime });
//                 } else if (e.data === window.YT.PlayerState.PAUSED) {
//                   socket.emit("video-action", { action: "pause", currentTime });
//                 }
//               });
//             }
//           }
//         }
//       });
//     };

//     // Listener for non-hosts
//     socket.on("sync-video", ({ action, currentTime }) => {
//       const player = playerRef.current;
//       if (!player || isHost) return;

//       if (action === "play") {
//         player.seekTo(currentTime, true);
//         player.playVideo();
//       } else if (action === "pause") {
//         player.pauseVideo();
//       }
//     });

//     return () => {
//       socket.off("sync-video");
//     };
//   }, [videoId, isHost]);

//   return (
//     <div className="w-full h-full">
//       <div id="yt-player" className="w-full h-full"></div>
//     </div>
//   );
// };

// export default YoutubePlayer;
