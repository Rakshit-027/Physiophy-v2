import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./TestimonialSlider.css"; // Import global CSS instead of CSS modules

const reviewsData = [
  {
    name: "Dr. Rajesh Gadekar",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "After my heart bypass, I lost significant strength & mobility in my left arm. Thanks to Dr. Tanvi for her exceptional physiotherapy.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Nageen Farokhmanesh",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "Thanks to Dr. Tanvi for her wonderful treatment & care. Her friendly nature & personal attention made my therapy sessions easier.",
    rating: 5,
    date: "1 month ago",
  },
  // Add the rest of your reviewsData here
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentIndex(index);

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchMove = (moveEvent) => {
      const touchEndX = moveEvent.touches[0].clientX;
      if (touchStartX - touchEndX > 50) nextSlide();
      if (touchEndX - touchStartX > 50) prevSlide();
      document.removeEventListener("touchmove", handleTouchMove);
    };
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", () => document.removeEventListener("touchmove", handleTouchMove), { once: true });
  };

  return (
    <div
      className="ts-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="ts-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
      >
        {reviewsData.map((review, index) => (
          <div key={index} className="ts-testimonial">
            <span className="ts-quote ts-open">“</span>
            <div className="ts-image">
              <div className="ts-clip"></div>
              <img src={review.image} alt={`${review.name}'s avatar`} />
            </div>
            <p className="ts-text">{review.text}</p>
            <div className="ts-source">
              <span>{review.name} - {review.date}</span>
            </div>
            <span className="ts-quote ts-close">"</span>
          </div>
        ))}
      </div>

      <button className="ts-nav-btn ts-prev" onClick={prevSlide} aria-label="Previous Testimonial">
        <ChevronLeft size={24} />
      </button>
      <button className="ts-nav-btn ts-next" onClick={nextSlide} aria-label="Next Testimonial">
        <ChevronRight size={24} />
      </button>

      <div className="ts-dots">
        {reviewsData.map((_, index) => (
          <button
            key={index}
            className={`ts-dot ${index === currentIndex ? "ts-active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;