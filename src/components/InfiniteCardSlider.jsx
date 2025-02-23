import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding: 20px 0;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$translate}px);
`;

const Card = styled.div`
  min-width: 200px;
  height: 250px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
`;

const sampleCards = [
  { id: 1, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//DSC05364.JPG" },
//   { id: 2, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//Photos%2012.jpg" },
  { id: 3, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//Photos%203.jpg" },
  { id: 4, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//Photos%209.jpg" },
  { id: 5, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%203.26.45%20PM%20(1).jpeg" },
  { id: 6, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.34.13%20PM%20(1).jpeg" },
  { id: 7, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.36.44%20PM%20(2).jpeg" },
  { id: 8, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.36.46%20PM.jpeg" },
  { id: 9, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%205.23.50%20PM.jpeg" },
  { id: 10,  image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-06-06%20at%2012.16.48%20AM.jpeg" }
];

const InfiniteCardSlider = () => {
  const [translate, setTranslate] = useState(0);
  const cardWidth = 220;
  const totalWidth = cardWidth * sampleCards.length;
  const extendedCards = [...sampleCards, ...sampleCards];

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslate(prev => (prev - cardWidth) % totalWidth);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      <SliderTrack $translate={translate}>
        {extendedCards.map((card, index) => (
          <Card key={index}>
            <img src={card.image} alt={`Slide ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Card>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default InfiniteCardSlider;
