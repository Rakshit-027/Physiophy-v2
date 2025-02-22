import React, { useState, useEffect } from 'react';
import { Stethoscope, Brain,Bone, Activity, Users, Heart, Armchair,Apple } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import './Services.css';

const services = [
  {
    icon: <Stethoscope className="rehab-service-icon" />,
    title: "Pediatric Rehabilitation",
    description: "Helping little ones move, grow, and thrive with expert pediatric rehabilitation.",
    category: "Pediatric Care"
  },
  {
    icon: <Brain className="rehab-service-icon" />,
    title: "Neuro Rehabilitation",
    description: "Restoring mobility, independence, and confidence through advanced neurological rehabilitation.",
    category: "Neurological Care"
  },
  {
    icon: <Bone  className="rehab-service-icon" />,
    title: "Ortho Rehabilitation",
    description: "Precision-driven recovery for joint, muscle, and bone health, ensuring pain-free movement.",
    category: "Orthopedic Care"
  },
  {
    icon: <Users className="rehab-service-icon" />,
    title: "Geriatric Rehabilitation",
    description: "Gentle, effective rehabilitation to enhance mobility and quality of life in older adults.",
    category: "Senior Care"
  },
  {
    icon: <Heart className="rehab-service-icon" />,
    title: "ANC & PNC Rehabilitation",
    description: "Specialized physiotherapy for a smoother pregnancy, safer delivery, and faster postpartum recovery.",
    category: "Maternity Care"
  },
  {
    icon: <Apple className="rehab-service-icon" />,
    title: "Nutrition & Diet Counseling",
    description: "Personalized nutrition plans to fuel healing, recovery, and long-term wellness.",
    category: "Wellness"
  }
];

const ServiceCard = ({ icon, title, description, category }) => {
  return (
    <div className="rehab-service-card rehab-fade-in">
      <div className="rehab-service-icon-wrapper rehab-pulse">
        {icon}
      </div>
      <div className="rehab-service-category">
        <span>{category}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Services = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll('.rehab-service-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rehab-visible');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      console.log("Proceed to booking");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="rehab-services-page">
      <div className="rehab-main-content">
        <div className="rehab-intro-section rehab-fade-in">
          <h2>Our Specialized Services</h2>
          <p>
            From pediatric care to geriatric rehabilitation, we provide comprehensive therapeutic solutions
            tailored to each patient's unique needs and goals.
          </p>
        </div>

        <div className="rehab-services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="rehab-cta-section">
          <div className="rehab-cta-content rehab-bounce-in">
            <h3>Begin Your Recovery Journey Today</h3>
            <p>
              Let our experienced team guide you through your rehabilitation process.
            </p>
            <button onClick={handleBookAppointment} className="rehab-cta-button">
              Make a Consultation
            </button>
            <h2>or</h2>
            <button onClick={() => (window.location.href = "tel:+919970127614")} className="rehab-cta-button">
              +91 99701 27614
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Sign In Required</h2>
            <p>You need to sign in to book an appointment.</p>
            <div className="button-group">
              <RouterLink to="signIn" className="login-btn">Sign In</RouterLink>
              <button onClick={closePopup} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
