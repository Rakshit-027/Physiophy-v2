import React, { useState, useRef } from 'react';
import './PatientVideos.css';
import inform from "../assets/inform0.jpg";
import inform1 from "../assets/inform.jpg";
import inform2 from "../assets/inform2.jpg";
import patient from "../assets/Patientsix.mp4";
import patient1 from "../assets/Patient8.mp4";
import patient2 from "../assets/Patientseven.mp4";
import reel1 from "../assets/Ad reel FINAL.mov"; // Local Instagram Reel
import reel2 from "../assets/Cerebral.mp4"; // Local Instagram Reel
import reel3 from "../assets/c1.mp4"; // Local Instagram Reel
 // Local Instagram Reel
import image from "../assets/imge1.jpg";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'react-feather';

const patientVideos = [
  {
    id: 1,
    video_url: patient,
  
  },
  {
    id: 2,
    video_url: patient1,
   
  },
  {
    id: 3,
    video_url: patient2,
    
  },
];

const instagramReels = [
  {
    id: 1,
    video_url: reel1, // Local reel file
    photo_url: inform // Taller thumbnail for reels
  },
  {
    id: 2,
    video_url: reel2, // Local reel file
    photo_url: inform1// Taller thumbnail for reels
  },
  {
    id: 3,
    video_url: reel3, // Local reel file
    photo_url: inform2, // Taller thumbnail for reels
  },
  
   
];

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="instagram-reel-card">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={video.video_url}
          poster={video.photo_url}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          controls
          preload="auto"
          style={{ backgroundColor: "black", width: "100%", borderRadius: "8px" }}
        />
        <div className="video-controls">
          <div className="control-overlay">
            <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <button onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
              {isFullscreen ? <Minimize /> : <Maximize />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstagramReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="instagram-reel-card">
      <div className="reel-wrapper">
        <video
          ref={videoRef}
          src={reel.video_url}
          poster={reel.photo_url}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          controls
          preload="auto"
          style={{ backgroundColor: "black", width: "100%", height: "100%", borderRadius: "8px" }}
        />
        <div className="video-controls">
          <div className="control-overlay">
            <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <button onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
              {isFullscreen ? <Minimize /> : <Maximize />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PatientVideos() {
  return (
    <section className="patient-videos">
      {/* <div className="video-header">
        <h2 className="head">From Pain to Power: Watch How Physiophy Changes Lives</h2>
        <h1 >Transformation Videos</h1>
      </div> */}

      <div className="instagram-reels-grid">
        {patientVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Instagram Reels Section */}
      <div className="instagram-reels-header">
        <h2>Informative Videos</h2>
      </div>

      <div className="instagram-reels-grid">
        {instagramReels.map((reel) => (
          <InstagramReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}

export default PatientVideos;