import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import pareshalImg from '../Celeb/With Paresh Rawal (1).jpg';
import aliirani from '../Celeb/With Dr. Ali Irani (1).jpg';
import TanuJain from '../Celeb/Dr. Tanu Jain (1).jpg';
import Velu from '../Celeb/With Dr. Velumani sir (1).jpg';

// Keyframe for smooth infinite scrolling
const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Styled container
const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;
  touch-action: pan-y; /* Prevent vertical scroll issues */
`;

// Track for smooth scrolling and swipe support
const SliderTrack = styled(motion.div)`
  display: flex;
  width: calc(100% * 8); /* 4 images duplicated */
  animation: ${slide} 30s linear infinite;

  ${({ isPaused }) =>
    isPaused &&
    css`
      animation-play-state: paused; /* Pause without resetting */
    `}
`;

// Card styling with zoom effect
const Card = styled(motion.div)`
  min-width: 350px;
  height: 350px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  transition: transform 0.4s ease-in-out, z-index 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    transform: scale(1.1); /* Bring image closer */
    z-index: 10; /* Bring it to the front */
  }

  @media (max-width: 768px) {
    min-width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    min-width: 200px;
    height: 200px;
  }
`;

// Image styling
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
`;

const images = [Velu, TanuJain, aliirani, pareshalImg];

const HomeCard = () => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const trackRef = useRef(null);

  // Function to start infinite scroll
  const startAutoScroll = async () => {
    await controls.start({
      x: [0, -trackRef.current.scrollWidth / 2], // Scroll half of the duplicate images
      transition: {
        ease: "linear",
        duration: 30,
        repeat: Infinity,
      },
    });
  };

  return (
    <SliderContainer>
      <SliderTrack
        ref={trackRef}
        animate={controls}
        isPaused={isPaused}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        drag="x"
        dragConstraints={{ left: -500, right: 500 }} // Allows dragging within limits
        whileTap={{ cursor: "grabbing" }} // Changes cursor when swiping
        onTouchStart={() => setIsPaused(true)} // Pause when user touches
        onTouchEnd={() => setIsPaused(false)} // Resume after touch
      >
        {[...images, ...images].map((image, index) => (
          <Card key={index}>
            <Image src={image} alt={`Slide ${index}`} />
          </Card>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default HomeCard;
