// HomeCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import pareshalImg from '../Celeb/With Paresh Rawal (1).jpg';
import aliirani from '../Celeb/With Dr. Ali Irani (1).jpg';
import TanuJain from '../Celeb/Dr. Tanu Jain (1).jpg';
import Velu from '../Celeb/With Dr. Velumani sir (1).jpg';
import './HomeCard.css';

const HomeCard = () => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const animateSlider = async () => {
      if (!trackWidth || !trackRef.current) return;

      if (!isPaused) {
        await controls.start({
          x: [0, -trackWidth / 2],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }
        });
      } else {
        controls.stop();
      }
    };

    animateSlider();
  }, [controls, isPaused, trackWidth]);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    controls.stop();
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
  };

  const images = [aliirani, pareshalImg, TanuJain, Velu];

  return (
    <div className="home-card-slider-container">
      <motion.div
        ref={trackRef}
        className={`home-card-slider-track ${isPaused ? 'home-card-paused' : ''}`}
        animate={controls}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        drag={isMobile ? "x" : false}
        dragConstraints={{ 
          left: -(trackWidth / 2) || -500, 
          right: 0 
        }}
        dragElastic={0.2}
        dragMomentum={false}
        style={{
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          msUserSelect: 'none'
        }}
      >
        {[...images, ...images].map((image, index) => (
          <motion.div
            key={index}
            className="home-card-item"
            whileHover={isMobile ? {} : { scale: 1.05, zIndex: 10 }}
            initial={{ scale: 1 }}
          >
            <img 
              src={image} 
              alt={`Slide ${index}`}
              className="home-card-image"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeCard;