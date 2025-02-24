import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Velu from '../Celeb/With Dr. Velumani sir (1).jpg';
import TanuJain from '../Celeb/Dr. Tanu Jain (1).jpg';
import aliirani from '../Celeb/With Dr. Ali Irani (1).jpg';
import pareshalImg from '../Celeb/With Paresh Rawal (1).jpg';

// Define the animation keyframes
const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;
  background-color: transparent;
`;

// Using CSS animation instead of framer-motion for better iOS compatibility
const SliderTrack = styled.div`
  display: flex;
  width: fit-content;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.translateX}px);
`;

const Card = styled.div`
  min-width: 350px;
  height: 350px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  transform: scale(${props => (props.isActive ? 1.1 : 1)});
  z-index: ${props => (props.isActive ? 10 : 1)};
  transition: transform 0.4s ease-in-out, z-index 0.2s ease-in-out;
  
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
  user-select: none;
  -webkit-user-drag: none;
`;

const images = [Velu, TanuJain, aliirani, pareshalImg];
const duplicatedImages = [...images, ...images];

const HomeCard = () => {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Calculate the total width of the original set of images
  const calculateImageSetWidth = () => {
    if (!containerRef.current) return 0;
    
    const cards = containerRef.current.querySelectorAll('div[data-card]');
    if (cards.length === 0) return 0;
    
    // Calculate width of first half (original set) of images
    let width = 0;
    for (let i = 0; i < images.length; i++) {
      const card = cards[i];
      const cardWidth = card.offsetWidth;
      const marginRight = parseInt(getComputedStyle(card).marginRight);
      const marginLeft = parseInt(getComputedStyle(card).marginLeft);
      width += cardWidth + marginRight + marginLeft;
    }
    return width;
  };

  // Auto-scrolling animation
  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    
    const imageSetWidth = calculateImageSetWidth();
    if (imageSetWidth === 0) return;
    
    // Reset position when we've scrolled through one complete set
    if (Math.abs(translateX) >= imageSetWidth) {
      setTranslateX(0);
    }
    
    intervalRef.current = setInterval(() => {
      setTranslateX(prev => prev - 1);
    }, 30);
    
    return () => clearInterval(intervalRef.current);
  }, [isPaused, translateX]);

  // Touch handlers for iOS
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(prev => prev + diff/5); // Divide by 5 to slow down the swiping
    setStartX(currentX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Mouse handlers for desktop
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setActiveIndex(-1);
  };

  return (
    <SliderContainer>
      <SliderTrack 
        ref={containerRef}
        translateX={translateX}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedImages.map((image, index) => (
          <Card 
            key={index}
            data-card
            isActive={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
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