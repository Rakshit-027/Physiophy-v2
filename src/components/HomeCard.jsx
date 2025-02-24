// HomeCard.jsx (updated)
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const startAnimation = async () => {
      if (!trackRef.current) return;
      
      if (!isPaused) {
        await controls.start({
          x: [0, -trackRef.current.offsetWidth / 2],
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      } else {
        controls.stop();
      }
    };

    startAnimation();
  }, [controls, isPaused]);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    controls.stop();
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    setIsPaused(false);
  };

  const images = [aliirani, pareshalImg, TanuJain, Velu];

  return (
    <div className="slider-container">
      <motion.div
        ref={trackRef}
        className={`slider-track ${isPaused ? 'paused' : ''}`}
        animate={controls}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        drag={isMobile ? "x" : false}
        dragConstraints={{ 
          left: -trackRef.current?.offsetWidth / 2 || -500, 
          right: 0 
        }}
        dragElastic={0.1}
        style={{
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        {[...images, ...images].map((image, index) => (
          <motion.div
            key={index}
            className="card"
            whileHover={isMobile ? {} : { scale: 1.1, zIndex: 10 }}
            initial={{ scale: 1 }}
          >
            <img 
              src={image} 
              alt={`Slide ${index}`}
              className="card-image"
              draggable="false"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeCard;