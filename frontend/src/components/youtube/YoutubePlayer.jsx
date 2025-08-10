import React, { useEffect, useRef } from "react";
import socket from "../../utils/socket";

const YoutubePlayer = ({ videoId, isHost, roomCode }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;

    const loadYT = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        events: {
          onStateChange: (event) => {
            if (!isHost) return;
            const currentTime = playerRef.current.getCurrentTime();

            if (event.data === window.YT.PlayerState.PLAYING) {
              socket.emit("play-video", { room: roomCode, currentTime });
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              socket.emit("pause-video", { room: roomCode, currentTime });
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadYT;
      document.body.appendChild(tag);
    } else {
      loadYT();
    }

    // Viewers listen to host commands
    if (!isHost) {
      socket.on("play-video", ({ currentTime }) => {
        if (Math.abs(playerRef.current.getCurrentTime() - currentTime) > 0.5) {
          playerRef.current.seekTo(currentTime, true);
        }
        playerRef.current.playVideo();
      });

      socket.on("pause-video", ({ currentTime }) => {
        if (Math.abs(playerRef.current.getCurrentTime() - currentTime) > 0.5) {
          playerRef.current.seekTo(currentTime, true);
        }
        playerRef.current.pauseVideo();
      });

      socket.on("seek-video", (time) => {
        playerRef.current.seekTo(time, true);
      });
    }

    return () => {
      socket.off("play-video");
      socket.off("pause-video");
      socket.off("seek-video");
    };
  }, [videoId, isHost, roomCode]);

  return <div id="yt-player" className="w-full h-full"></div>;
};

export default YoutubePlayer;
