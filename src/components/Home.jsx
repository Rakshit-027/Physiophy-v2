import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star,Play } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import supabase from "./SupabaseClient";
import HeroImg from "../assets/hero.webp";
import "./Home.css";
import ShinyText from "./ShinyText";
import ShinyTextc from "./ShinyTextc";
import ArrowLeft from "./ArrowLeft";
import ArrowRightt from "./ArrowRightt";
import HomeTest from "./HomeTest";
import image from "../assets/imge1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import Founder from "./Founder";
import PatientVideos from "./PatientVideos";
import  Helmet  from "react-helmet";
const reviewsData = [
  {
    name: "Dr. Rajesh Gadekar",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "After my heart bypass, I lost significant strength & mobility in my left arm. Thanks to Dr. Tanvi for her exceptional physiotherapy.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Nageen Farokhmanesh",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "Thanks to Dr. Tanvi for her wonderful treatment & care. Her friendly nature & personal attention made my therapy sessions easier.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Dr. Mayank Bhansali",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "As a dentist, I struggled with chronic pain affecting my work. After a few sessions with Dr. Tanvi my pain vanished & I recovered quickly.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Shriya Mehta",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLvWkxIeNTzZa8dzLkxYfFjdZKC4fp8eREkfnT3yWfKa8gVQFM=w60-h60-p-rp-mo-br100",
    text: "Dr. Tanvi is an exceptional physiotherapist! Her expertise, personalized approach, and care have made a huge difference in my recovery. The studio is clean, well-equipped, and welcoming. I highly recommend her to anyone seeking effective and professional physiotherapy!",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Gauri Malviya",
    image: "https://lh3.googleusercontent.com/a/ACg8ocJpFZb97DOGIPL8Ig_Rkfd25-iJI_0jQLTdM3w09U5_-44cLfg=w60-h60-p-rp-mo-br100",
    text: "I had an amazing experience at this neurophysiotherapy centre! The service is truly excellent - the therapists are knowledgeable, professional, and tailored their treatment to my specific needs. What really stood out, though, was the friendly and welcoming staff. Five stars isn't enough - I'd give it ten stars if I could!",
    rating: 4,
    date: "1 month ago"
  },
  {
    name: "Nishad Katkoria",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjU45MKsyHUNfinmboa_YkkcS5Em2qNBa3_v4RCXtqFyi6ewyk_i=w60-h60-p-rp-mo-br100",
    text: "I went to Dr Tanvi for my back pain issue which had become chronic over the years and was amazed by the quality of service and treatment provided in the clinic. Happy to say that after years of treatment and medication, my pain is now gone! Highly recommend to visit for any physio related issue.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Gunvant Asare",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXt2NRikrIojahJMwpCCbV82IQIN2JMo8v8U4RMzJsQ4onGN7gObg=w60-h60-p-rp-mo-br100",
    text: "I recently had physiotherapy treatment at Physiophy, Dhantoli, Nagpur, met Dr Tanvi Katariya and I can't say enough good things about my experience. The team was professional, knowledgeable, and incredibly supportive throughout my recovery.",
    rating: 4,
    date: "5 months ago"
  },
  {
    name: "Faizan Qureshi",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXPVBMlpLgFrrzvE40ObnggL_KONPUfchQ7ut4Py0iGKaHUHng=w60-h60-p-rp-mo-br100",
    text: "Exceptional care from knowledgeable staff. Clean, modern facilities. My recovery exceeded expectations. Highly recommend Physiophy clinic for effective treatment and great service.",
    rating: 5,
    date: "7 months ago"
  },
  {
    name: "Shailendra Purale",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVCyGhbOtfCcXG3_FNLEb2EUxTya95Hb-SMgRdHz8q5MCr4EN0=w60-h60-p-rp-mo-br100",
    text: "My experience was very good at this clinic. Proper guidance & treatment was given to me. I feel very good and relaxed. Thank you for giving me the best treatment to Doctor & their staff.",
    rating: 4,
    date: "7 months ago"
  },
  {
    name: "Sneha Chandghode",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVBdFtWx27giy_HtwGMRJwOE_W1nRqh-S8IA7qPIAXsIQlEWGZz=w60-h60-p-rp-mo-ba2-br100",
    text: "It’s one of the best physiotherapy centres. Including the service and staff, everything was so good. Must visit once.",
    rating: 5,
    date: "7 months ago"
  },
  {
    name: "Vaibhav Zawar",
    image: "https://via.placeholder.com/150",
    text: "Great experience! Best doc providing excellent service.",
    rating: 4,
    date: "5 months ago"
  },
  // {
  //   name: "Chinmay Galwe",
  //   image: "https://via.placeholder.com/150",
  //   text: "Best physio with best hospitality and services. Professional care and personal attention given.",
  //   rating: 5,
  //   date: "7 months ago"
  // },
  // {
  //   name: "Karnik Tawarji",
  //   image: "https://via.placeholder.com/150",
  //   text: "Good clinic with a friendly environment. Exercise program is given to each individual as per their problem and condition.",
  //   rating: 4,
  //   date: "7 months ago"
  // },
  {
    name: "Priti Choudhary",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKYN7HOB9uoP8S0G8faeCRdfJdMxEy0GNL4dmWaI7wmydGiwg=w60-h60-p-rp-mo-br100",
    text: "I can't thank you enough for the special care you have provided. Thank you so much for the great care ❤",
    rating: 5,
    date: "7 months ago"
  },
  {
    name: "Champadevi Gundecha",
    image: "https://lh3.googleusercontent.com/a/ACg8ocJqBMQfgXM1TbNoC5pNmZjCI3L0pK2evGvH7GWmZZY73hWd=w60-h60-p-rp-mo-br100",
    text: "Best clinic and supreme trained doctors. I was relieved in no time.",
    rating: 4,
    date: "7 months ago"
  },
  {
    name: "Adinath Bhagat",
    image: "https://via.placeholder.com/150",
    text: "Good treatment done in this hospital. I am satisfied with the services.",
    rating: 5,
    date: "7 months ago"
  },
  {
    name: "Manda Waghmare",
    image: "https://via.placeholder.com/150",
    text: "Good clinic and doctors are highly qualified.",
    rating: 4,
    date: "6 months ago"
  },
  {
    name: "Manisha Hivse",
    image: "https://via.placeholder.com/150",
    text: "Majha mulga 4 varsha cha aahe ani toh chalu navta shakt na ubha. Me Physiophy clinic mdhe aali, tyachi treatment shuru keli. Aata toh ubha rahu shakt aani pakdun chalnya cha prayatna karto. Me khup khush aahe improvement ni.",
    rating: 5,
    date: "1 month ago"
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
const sliderImages = [
  {
    url: image,
    slogan: "Expert Physical Therapy Care",
  },
  {
    url: image3,
    slogan: "State-of-the-Art Facilities",
  },
  {
    url: image2,
    slogan: "Advanced Rehabilitation Solutions",
  },
];

const Home = ({ onLogin }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const intervalRef = useRef(null);

  // Fetch user session
  useEffect(() => {
    const fetchAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    fetchAuthStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => authListener.subscription?.unsubscribe();
  }, []);

  // Auto-scroll for reviews & slider
  useEffect(() => {
    if (!isAutoScrollPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoScrollPaused]);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  const prevReview = () => setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));

  const handleMouseEnter = () => setIsAutoScrollPaused(true);
  const handleMouseLeave = () => setIsAutoScrollPaused(false);
  const handleBookNowClick = () => (!isLoggedIn ? setShowPopup(true) : (window.location.href = "/appointment"));
  const closePopup = () => setShowPopup(false);

  return (
    <div className="home-">
        <Helmet>
        <title>Physiophy - Best Physiotherapy Clinic in Nagpur</title>
        <meta name="description" content="Experience the best physiotherapy care at Physiophy in Nagpur. Expert treatments for pain relief, rehabilitation, and wellness." />
        <meta name="keywords" content="Physiotherapy, Pain Relief, Rehabilitation, Nagpur, Physiophy" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Physiophy - Your Bridge Between Disability and Ability" />
        <meta property="og:description" content="Personalized physiotherapy treatments to help you move better, feel stronger, and live pain-free." />
        <meta property="og:image" content={sliderImages[0].url} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {sliderImages.map((image, index) => (
            <div key={index} className="slide">
              <img src={image.url} alt={`Slide ${index + 1}`} />
              <div className="slide-content">
                <h2>{image.slogan}</h2>
                <div className="slider-buttons">
                  <button className="slider-btn primary" onClick={handleBookNowClick}>
                    Book Appointment
                  </button>
                  <RouterLink to="/contact" className="slider-btn secondary">
                    Contact Us
                  </RouterLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="about-hero">
        <h1 className="main-title">Your bridge between disability to ability</h1>
        <div className="decorative-line"></div>
      </div>
      <Founder />
    <div className="physio-cont">
    <div className="physio-container">
      {/* Hero Section */}
      
      {/* <section className="physio-hero">
        <div className="physio-hero-content">
          <h1 className="physio-main-title">
            <span className="physio-title-accent"><ShinyText text="Expert Care"/></span>
            <span className="physio-title-accent"><ShinyText text="With Physiophy"/></span>
            <span className="physio-title-main"><ShinyText text="Your bridge between  disability to ability"/></span>
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
        {/* </div> */}
      {/* </section> */} *
      {/* <div className="founder-container"> */}
      {/* <div className="founder-header">
        <div className="header-content">
          <div className="slogan">The story of founder from passion to practice</div>
          <div className="founder-photo">
            <img src={HeroImg} alt="Dr. Tanvi Katariya" className="profile-image" />
          </div>
          <h1>Dr. Tanvi Katariya</h1>
          <div className="title">Physiotherapist</div> */}
          {/* <div className="contact-info">
            <span><i className="icon">📞</i> +91 7020427614</span>
            <span><i className="icon">📧</i> tanvishah01@gmail.com</span>
            <span><i className="icon">📍</i> Physiophy - Dhantoli, Nagpur</span>
          </div> */}
        {/* </div> */}
      {/* </div> */}
      
  

      {/* <div className="content-grid">
        <div className="founder-section">
          <h2><span className="section-icon">🎓</span> Education</h2>
          <ul>
            <li className="highlight-item">
              <div className="year">2024</div>
              <div className="detail">Fellowship in Neuro-Rehab, UK</div>
            </li>
            <li className="highlight-item">
              <div className="year">2022</div>
              <div className="detail">Master's in Physiotherapy (MPT) - Orthopedic Rehabilitation<br/>
              <span className="institution">YBN University, Ranchi</span></div>
            </li>
            <li className="highlight-item">
              <div className="year">2020</div>
              <div className="detail">Bachelor's in Physiotherapy (BPT)<br/>
              <span className="institution">VSPM College of Physiotherapy</span></div>
            </li>
          </ul>
        </div>
        
        <div className="founder-section">
          <h2><span className="section-icon">🏆</span> Certifications & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-item">Certified Garbh Sankar Educator</div>
            <div className="skill-item">Certified Autism Therapist</div>
            <div className="skill-item">Certified ANC/PNC Trainer</div>
            <div className="skill-item">Yoga & Nutrition Expert</div>
            <div className="skill-item">Kinesio & Therapeutic Taping</div>
            <div className="skill-item">CPR/AED Certified</div>
            <div className="skill-item">Expert in Dry Needling</div>
            <div className="skill-item">Neuro-OPD Specialist</div>
          </div>
        </div>
        
        <div className="founder-section experience-section">
          <h2><span className="section-icon">💼</span> Professional Journey</h2>
          <div className="timeline">
            <div className="experience-item">
              <div className="experience-date">2024 - Present</div>
              <div className="experience-content">
                <h3>Founder & Lead Physiotherapist</h3>
                <p className="company">Physiophy, Nagpur</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="experience-date">2023</div>
              <div className="experience-content">
                <h3>Neuro-Rehabilitation Specialist</h3>
                <p className="company">Mission Walk, Hyderabad</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="experience-date">2023</div>
              <div className="experience-content">
                <h3>Senior Physiotherapist</h3>
                <p className="company">Nanavati Super Speciality Hospital, Mumbai</p>
              </div>
            </div>
          </div>
        </div> */}
        
      {/* </div>
      <div className="mvv-section">
        <div className="mvv-container">
          <div className="mvv-card">
            <div className="mvv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To provide exceptional physiotherapy care that empowers individuals to achieve optimal physical well-being and live life to its fullest potential.</p>
          </div>
          <div className="mvv-card">
            <div className="mvv-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>To be the leading physiotherapy center known for innovative treatment approaches, personalized care, and transformative patient outcomes.</p>
          </div>
          <div className="mvv-card">
            <div className="mvv-icon">⭐</div>
            <h3>Our Values</h3>
            <ul className="values-list">
              <li>Excellence in Patient Care</li>
              <li>Continuous Innovation</li>
              <li>Compassion & Empathy</li>
              <li>Integrity & Trust</li>
            </ul>
          </div>
        </div>
      </div>
    </div> */}
    <div className="about-hero"><h1>Clinic videos And reviews</h1></div>

      {/* Testimonials Section */}
      <section className="physio-testimonials">
        
        <h2 className="section-title">Real people real recoveries</h2>
        <div className="physio-testimonials-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="physio-nav-btn left" onClick={prevReview}>
            <ArrowLeft />
          </div>
          <div className="physio-testimonials-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviewsData.map((review, index) => (
              <div key={index} className={`physio-testimonial-card ${index === currentIndex ? "active" : ""}`}>
                <div className="physio-testimonial-header">
                <img 
                    src={review.image || `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} 
                    alt={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} 
                    className="physio-testimonial-image"
                  />
                  <div className="physio-testimonial-info">
                    <h3 className="physio-testimonial-author">{review.name}</h3>
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
          <div className="physio-nav-btn right" onClick={nextReview}>
            <ArrowRightt/>
          </div>
          <div className="physio-testimonial-dots">
            {reviewsData.map((_, index) => (
              <button key={index} className={`physio-dot ${index === currentIndex ? "active" : ""}`} onClick={() => handleDotClick(index)} />
            ))}
          </div>
        </div>
      </section>
      {/* <section className="videos-section">
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
      </section> */}
      {/* <HomeTest/> */}

      <div className="about-hero">
        <h1 className="head">From Pain to Power: Watch How Physiophy Changes Lives</h1>
        
      </div>
      {/* <PatientVideos/> */}


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
    </div>
  );
};

export default Home;
