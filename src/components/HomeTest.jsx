import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './HomeTest.css';

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    text: "The physiotherapy treatment I received here completely transformed my recovery journey. I'm now pain-free and back to my active lifestyle!",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    text: "Professional, caring, and highly skilled team. They helped me recover from a sports injury faster than I expected.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    text: "Outstanding care and attention to detail. The personalized treatment plan made all the difference in my recovery.",
    rating: 5,
    date: "3 weeks ago"
  }
];

const successStories = [
  {
    id: 1,
    title: "Recovery Journey - Spinal Injury",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
    videoUrl: "https://www.example.com/video1.mp4",
    description: "Watch John's incredible recovery journey from a severe spinal injury"
  },
  {
    id: 2,
    title: "Back to Sports - Knee Rehabilitation",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
    videoUrl: "https://www.example.com/video2.mp4",
    description: "See how Maria returned to professional sports after knee surgery"
  },
  {
    id: 3,
    title: "Senior Wellness Success",
    thumbnail: "https://images.unsplash.com/photo-1576091160291-258be86f57f1?w=400",
    videoUrl: "https://www.example.com/video3.mp4",
    description: "Experience Mr. Thompson's journey to improved mobility"
  }
];

// import React, { useState, useEffect, useRef } from 'react';
// import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
// import './HomeTest.css';

// ... (keep the testimonials and successStories arrays as they are)

const HomeTest = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const testimonialInterval = useRef(null);

  useEffect(() => {
    testimonialInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval.current);
  }, []);

  const handlePrevTestimonial = () => {
    clearInterval(testimonialInterval.current);
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    clearInterval(testimonialInterval.current);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleVideoClick = (videoUrl) => {
    setIsPlaying(true);
    // Implement video player logic here
  };

  return (
    <div className="home-container">
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Patients Say</h2>
        <div className="testimonials-container">
          <button className="nav-button prev" onClick={handlePrevTestimonial}>
            <ChevronLeft />
          </button>
          
          <div className="testimonials-wrapper">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image || "/placeholder.svg"} 
                    alt={testimonial.name} 
                    className="testimonial-image"
                  />
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-date">{testimonial.date}</p>
                  </div>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="nav-button next" onClick={handleNextTestimonial}>
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Success Stories Videos Section */}
      <section className="videos-section">
        <h2 className="section-title">From Pain to Power: Watch How Physiophy Changes Lives</h2>
        <div className="videos-grid">
          {successStories.map((story) => (
            <div key={story.id} className="video-card">
              <div 
                className="video-thumbnail"
                onClick={() => handleVideoClick(story.videoUrl)}
              >
                <img src={story.thumbnail || "/placeholder.svg"} alt={story.title} />
                <div className="play-overlay">
                  <Play className="play-icon" />
                </div>
              </div>
              <h3 className="video-title">{story.title}</h3>
              <p className="video-description">{story.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeTest;