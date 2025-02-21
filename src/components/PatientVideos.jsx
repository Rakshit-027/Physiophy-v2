import React, { useState, useRef } from 'react';
import './PatientVideos.css';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import inform from "../assets/inform0.jpg";
import inform1 from "../assets/inform.jpg";
import inform2 from "../assets/inform2.jpg";
import patient from "../assets/Patientsix.mp4";
import patient1 from "../assets/Patient8.mp4";
import patient2 from "../assets/Patientseven.mp4";
import reel1 from "../assets/Ad reel FINAL.mov"; // Local Instagram Reel
import reel2 from "../assets/Cerebral.mp4"; // Local Instagram Reel
import reel3 from "../assets/c1.mp4"; // Local Instagram Reel
import Thumb from "../assets/Thumb.png";
import Thumb1 from "../assets/Thumb1.png";
import Thumb2 from "../assets/Thumb2.png";


const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        onClick={togglePlay}
      />
      <div className="video-controls">
        <button onClick={togglePlay} className="control-btn">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={toggleMute} className="control-btn">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      {!isPlaying && (
        <div className="play-overlay">
          <Play size={48} />
        </div>
      )}
    </div>
  );
};

function PatientVideos() {
  const videos = [
    {
      id: 1,
      src: patient,
      poster:Thumb
    },
    {
      id: 2,
      src: patient1,
      poster: Thumb1
    },
    {
      id: 3,
      src: patient2,
      poster: Thumb2
    }
  ];

  const reels = [
    {
      id: 1,
      src: reel1,
      poster: inform,
    },
    {
      id: 2,
      src: reel2,
      poster: inform1,
    },
    {
      id: 3,
      src: reel3,
      poster: inform2,
    }
  ];

  return (
    <div className="patient-videos">
      <h1 className="title">Patient Success Stories</h1>
      <div className="videos-grid">
        {videos.map(video => (
          <VideoPlayer
            key={video.id}
            src={video.src}
            poster={video.poster}
          />
        ))}
      </div>

      <h1 className="title reels-title">Informative Videos</h1>
      <div className="videos-grid">
        {reels.map(video => (
          <VideoPlayer
            key={video.id}
            src={video.src}
            poster={video.poster}
          />
        ))}
      </div>
    </div>
  );
}

export default PatientVideos;