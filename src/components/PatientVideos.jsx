import React, { useState, useRef, useEffect } from 'react';
import './PatientVideos.css';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import inform from "../assets/inform0.jpg";
import inform1 from "../assets/inform.jpg";
import inform2 from "../assets/inform2.jpg";
import patient from "../assets/Patientsix.mp4";
import patient1 from "../assets/Patient8.mp4";
import patient2 from "../assets/Patientseven.mp4";
import reel1 from "../assets/Ad reel FINAL.mov";
import reel2 from "../assets/Cerebral.mp4";
import reel3 from "../assets/c1.mp4";
import Thumb from "../assets/Thumb.png";
import Thumb1 from "../assets/Thumb1.png";
import Thumb2 from "../assets/Thumb2.png";

const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current;
    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(value);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Seek video when clicking progress bar
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
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
        <div className="controls-wrapper">
          <button onClick={togglePlay} className="control-btn">
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button onClick={toggleMute} className="control-btn">
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>
        <div className="progress-container" onClick={handleProgressClick}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {!isPlaying && (
        <div className="play-overlay" onClick={togglePlay}>
          <Play size={50} />
        </div>
      )}
    </div>
  );
};

function PatientVideos() {
  const videos = [
    { id: 1, src: patient, poster: Thumb },
    { id: 2, src: patient1, poster: Thumb1 },
    { id: 3, src: patient2, poster: Thumb2 },
  ];

  const reels = [
    { id: 1, src: reel1, poster: inform },
    { id: 2, src: reel2, poster: inform1 },
    { id: 3, src: reel3, poster: inform2 },
  ];

  return (
    <div className="patient-videos">
      <h1 className="title">Success Stories</h1>
      <div className="videos-container">
        {videos.map(video => (
          <VideoPlayer
            key={video.id}
            src={video.src}
            poster={video.poster}
          />
        ))}
      </div>

      {/* <h1 className="title reels-title">Informative Videos</h1>
      <div className="videos-container">
        {reels.map(video => (
          <VideoPlayer
            key={video.id}
            src={video.src}
            poster={video.poster}
          />
        ))}
      </div> */}
    </div>
  );
}

export default PatientVideos;