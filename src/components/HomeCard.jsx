import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import pareshalImg from '../Celeb/With Paresh Rawal (1).jpg';
import aliirani from '../Celeb/With Dr. Ali Irani (1).jpg';
import TanuJain from '../Celeb/Dr. Tanu Jain (1).jpg';
import Velu from '../Celeb/With Dr. Velumani sir (1).jpg';

// Keyframes for infinite slow scrolling
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
`;

// Track with smooth pause on hover
const SliderTrack = styled.div`
  display: flex;
  width: calc(100% * 8); /* 4 images duplicated */
  animation: ${slide} 30s linear infinite;

  ${({ isPaused }) =>
    isPaused &&
    css`
      animation-play-state: paused; /* Pause without resetting */
    `}
`;

// Card styling with responsive zoom effect
const Card = styled.div`
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
    transform: scale(1.1); /* Bring the image closer */
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

  return (
    <SliderContainer>
      <SliderTrack
        isPaused={isPaused}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
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
