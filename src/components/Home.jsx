import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import supabase from "./SupabaseClient";
import HeroImg from "../assets/hero.webp";
import "./Home.css";
const reviewsData = [
  {
    "author_name": "Shriya Mehta",
    "rating": 5,
    "time": "1 month ago",
    "text": "Dr. Tanvi is an exceptional physiotherapist! Her expertise, personalized approach, and care have made a huge difference in my recovery. The studio is clean, well-equipped, and welcoming. I highly recommend her to anyone seeking effective and professional physiotherapy!"
  },
  {
    "author_name": "Gauri Malviya",
    "rating": 4,
    "time": "1 month ago",
    "text": "I had an amazing experience at this neurophysiotherapy centre! The service is truly excellent - the therapists are knowledgeable, professional, and tailored their treatment to my specific needs. What really stood out, though, was the friendly and welcoming staff. Five stars isn't enough - I'd give it ten stars if I could!"
  },
  {
    "author_name": "Nishad Katkoria",
    "rating": 5,
    "time": "1 month ago",
    "text": "I went to Dr Tanvi for my back pain issue which had become chronic over the years and was amazed by the quality of service and treatment provided in the clinic. Happy to say that after years of treatment and medication, my pain is now gone! Highly recommend to visit for any physio related issue."
  },
  {
    "author_name": "Gunvant Asare",
    "rating": 4,
    "time": "5 months ago",
    "text": "I recently had physiotherapy treatment at Physiophy, Dhantoli, Nagpur, met Dr Tanvi Katariya and I can't say enough good things about my experience. The team was professional, knowledgeable, and incredibly supportive throughout my recovery."
  },
  {
    "author_name": "Faizan Qureshi",
    "rating": 5,
    "time": "7 months ago",
    "text": "Exceptional care from knowledgeable staff. Clean, modern facilities. My recovery exceeded expectations. Highly recommend Physiophy clinic for effective treatment and great service."
  },
  {
    "author_name": "Shailendra Purale",
    "rating": 4,
    "time": "7 months ago",
    "text": "My experience was very good at this clinic. Proper guidance & treatment was given to me. I feel very good and relaxed. Thank you for giving me the best treatment to Doctor & their staff."
  },
  {
    "author_name": "Sneha Chandghode",
    "rating": 5,
    "time": "7 months ago",
    "text": "It’s one of the best physiotherapy centres. Including the service and staff, everything was so good. Must visit once."
  },
  {
    "author_name": "Vaibhav Zawar",
    "rating": 4,
    "time": "5 months ago",
    "text": "Great experience! Best doc providing excellent service."
  },
  {
    "author_name": "Chinmay Galwe",
    "rating": 5,
    "time": "7 months ago",
    "text": "Best physio with best hospitality and services. Professional care and personal attention given."
  },
  {
    "author_name": "Karnik Tawarji",
    "rating": 4,
    "time": "7 months ago",
    "text": "Good clinic with a friendly environment. Exercise program is given to each individual as per their problem and condition."
  },
  {
    "author_name": "Priti Choudhary",
    "rating": 5,
    "time": "7 months ago",
    "text": "I can't thank you enough for the special care you have provided. Thank you so much for the great care ❤"
  },
  {
    "author_name": "Champadevi Gundecha",
    "rating": 4,
    "time": "7 months ago",
    "text": "Best clinic and supreme trained doctors. I was relieved in no time."
  },
  {
    "author_name": "Adinath Bhagat",
    "rating": 5,
    "time": "7 months ago",
    "text": "Good treatment done in this hospital. I am satisfied with the services."
  },
  {
    "author_name": "Manda Waghmare",
    "rating": 4,
    "time": "6 months ago",
    "text": "Good clinic and doctors are highly qualified."
  },
  {
    "author_name": "Manisha Hivse",
    "rating": 5,
    "time": "1 month ago",
    "text": "Majha mulga 4 varsha cha aahe ani toh chalu navta shakt na ubha. Me Physiophy clinic mdhe aali, tyachi treatment shuru keli. Aata toh ubha rahu shakt aani pakdun chalnya cha prayatna karto. Me khup khush aahe improvement ni."
  }
];

const Home = ({ onLogin }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // NEW: Track login state
  const intervalRef = useRef(null);

  useEffect(() => {
    // Fetch session from Supabase
    const fetchAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session); // Update state based on session
    };

    fetchAuthStatus();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAutoScrollPaused) {
      intervalRef.current = setInterval(() => {
        nextReview();
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isAutoScrollPaused]);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  const prevReview = () => setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  const handleDotClick = (index) => setCurrentIndex(index);
  const handleMouseEnter = () => setIsAutoScrollPaused(true);
  const handleMouseLeave = () => setIsAutoScrollPaused(false);

  const handleBookNowClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      window.location.href = "/appointment";
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="physio-cont">
    <div className="physio-container">
      {/* Hero Section */}
      <section className="physio-hero">
        <div className="physio-hero-content">
          <h1 className="physio-main-title">
            <span className="physio-title-accent">Expert Care</span>
            <span className="physio-title-accent">With Physiophy</span>
            <span className="physio-title-main">for Your Recovery Journey</span>
          </h1>
          <p className="physio-hero-description">
            Discover personalized physiotherapy treatments that help you move better, feel stronger, and live pain-free.
          </p>
          <div className="physio-cta-group">
            <div>
              <div className="physio-primary-btn" onClick={handleBookNowClick}>
                Book Appointment
              </div>
            </div>
            <ScrollLink to="services" spy={true} smooth={true} offset={-70} duration={500} className="physio-secondary-btn">
              Our Services<span className="physio-btn-arrow">→</span>
            </ScrollLink>
          </div>
        </div>
        <div className="physio-hero-image-wrapper">
          <img src={HeroImg} alt="Physiotherapy Session" className="physio-hero-image" />
          {/* <div className="physio-experience-badge">
            {/* <span className="physio-badge-number">15+</span>
            <span className="physio-badge-text">Years of Excellence</span> */}
          {/* </div>  */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="physio-testimonials">
        <h2 className="physio-section-title">What Our Patients Say</h2>
        <div className="physio-testimonials-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button className="physio-nav-btn left" onClick={prevReview}>
            <ChevronLeft size={24} />
          </button>
          <div className="physio-testimonials-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviewsData.map((review, index) => (
              <div key={index} className={`physio-testimonial-card ${index === currentIndex ? "active" : ""}`}>
                <div className="physio-testimonial-header">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.author_name}`}
                    alt={review.author_name}
                    className="physio-testimonial-image"
                  />
                  <div className="physio-testimonial-info">
                    <h3 className="physio-testimonial-author">{review.author_name}</h3>
                    <p className="physio-testimonial-time">{review.time}</p>
                  </div>
                </div>
                <p className="physio-testimonial-text">{review.text}</p>
                <div className="physio-testimonial-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="physio-star-icon" fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="physio-nav-btn right" onClick={nextReview}>
            <ChevronRight size={24} />
          </button>
          <div className="physio-testimonial-dots">
            {reviewsData.map((_, index) => (
              <button key={index} className={`physio-dot ${index === currentIndex ? "active" : ""}`} onClick={() => handleDotClick(index)} />
            ))}
          </div>
        </div>
      </section>


        {/* Popup Modal */}
        {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h2>Sign In Required</h2>
      <p>You need to sign in to book an appointment.</p>
      <div className="button-group">
        <RouterLink to="signIn" onClick={onLogin} className="login-btn">Sign In</RouterLink>
        <button onClick={closePopup} className="close-button">Close</button>
      </div>
    </div>
  </div>
)}
     </div>
    </div>
  );
};

export default Home;
