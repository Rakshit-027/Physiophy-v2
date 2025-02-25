// InfiniteCardSlider.jsx
import React, { useState, useEffect } from 'react';
import './InfiniteCardSlider.css';

const sampleCards = [
  { id: 1, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//DSC05364.JPG" },
  { id: 3, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//Photos%203.jpg" },
  { id: 4, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//Photos%209.jpg" },
  { id: 5, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%203.26.45%20PM%20(1).jpeg" },
  { id: 6, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.34.13%20PM%20(1).jpeg" },
  // { id: 7, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.36.44%20PM%20(2).jpeg" },
  { id: 8, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%204.36.46%20PM.jpeg" },
  { id: 9, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-05-17%20at%205.23.50%20PM.jpeg" },
  { id: 10, image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider//WhatsApp%20Image%202024-06-06%20at%2012.16.48%20AM.jpeg" }
];

const InfiniteCardSlider = () => {
  const [translate, setTranslate] = useState(0);
  const cardWidth = 220; // Card width + margin (200px + 20px)
  const totalWidth = cardWidth * sampleCards.length;
  const extendedCards = [...sampleCards, ...sampleCards];

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslate(prev => (prev - cardWidth) % totalWidth);
    }, 1500);

    return () => clearInterval(interval);
  }, [cardWidth, totalWidth]);

  return (
    <div className="infinite-slider-container">
      <div 
        className="infinite-slider-track"
        style={{ transform: `translateX(${translate}px)` }}
      >
        {extendedCards.map((card, index) => (
          <div key={index} className="infinite-slider-card">
            <img 
              src={card.image} 
              alt={`Slide ${index}`} 
              className="infinite-slider-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCardSlider;