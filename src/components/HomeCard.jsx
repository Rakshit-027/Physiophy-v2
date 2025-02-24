import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import pareshalImg from '../Celeb/With Paresh Rawal (1).jpg';
import aliirani from '../Celeb/With Dr. Ali Irani (1).jpg';
import TanuJain from '../Celeb/Dr. Tanu Jain (1).jpg';
import Velu from '../Celeb/With Dr. Velumani sir (1).jpg';
// Styled container with Safari-specific fixes
const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;
  touch-action: none; /* Prevent all default touch behaviors */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */
`;

// Track with improved Safari performance
const SliderTrack = styled(motion.div)`
  display: flex;
  width: calc(100% * 8);
  will-change: transform; /* Optimize performance */
  transform: translateZ(0); /* Force GPU acceleration */
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  ${({ $isPaused }) =>
    $isPaused &&
    css`
      animation-play-state: paused;
    `}
`;

const Card = styled(motion.div)`
  min-width: 350px;
  height: 350px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  transform: translateZ(0); /* Force GPU acceleration */
  -webkit-transform: translateZ(0);
  
  @media (max-width: 768px) {
    min-width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    min-width: 200px;
    height: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none; /* Prevent image dragging on iOS */
  user-select: none; /* Prevent selection */
`;

const HomeCard = () => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Start animation
  useEffect(() => {
    const startAnimation = async () => {
      if (!isPaused) {
        await controls.start({
          x: [0, -trackRef.current?.offsetWidth / 2 || 0],
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

  // Handle touch events
  const handleTouchStart = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  const images = [
    aliirani,
    pareshalImg,
    TanuJain,
    Velu
  ];

  return (
    <SliderContainer>
      <SliderTrack
        ref={trackRef}
        animate={controls}
        $isPaused={isPaused}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
        drag={isMobile ? false : "x"}
        dragConstraints={{ left: -500, right: 500 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          touchAction: 'none'
        }}
      >
        {[...images, ...images].map((image, index) => (
          <Card
            key={index}
            whileHover={isMobile ? {} : { scale: 1.1, zIndex: 10 }}
            initial={{ scale: 1 }}
          >
            <Image 
              src={image} 
              alt={`Slide ${index}`}
              draggable="false"
            />
          </Card>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default HomeCard;