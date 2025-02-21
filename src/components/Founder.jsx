import React from 'react';
import './Founder.css';
import FounderImage from '../assets/7.jpg';
import pareshalImg from '../Celeb/pareshal_rawal.jpeg';
import aliirani from '../Celeb/AliIrani.jpg';
import TanuJain from '../Celeb/TanuJain.jpg';

const Founder = () => {
  const celebrities = [
    {
      name: "Paresh Rawal",
      image: pareshalImg,
      testimonial: "Dr. Kataria's expertise in physiotherapy has been instrumental in my recovery. Her dedication and professional approach make her stand out in her field.",
      treatment: "Post-surgery rehabilitation"
    },
    {
      name: "Dr Ali Irani",
      image: aliirani,
      testimonial: "The personalized care and attention to detail at PhysioFi has made a significant difference in my recovery journey.",
      treatment: "Sports injury rehabilitation"
    },
    {
      name: "Dr Tanu Jain",
      image: TanuJain,
    }
  ];
  
  return (
    <div className="founder-container">
      <div className="content-wrapper">
        <div className="story-section">
          <h2 className="story-title">The story of founder from passion to practice</h2>
          
          <div className="story-content">
            <div className="text-section">
              <p className="story-paragraph">
                Physiophy is not just a rehabilitation center—it is a space of
                transformation, resilience, and hope. Founded by Dr. Tanvi
                Katariya, a renowned physiotherapist with over five years of
                hands-on experience, Physiophy was built on the belief that
                healing goes beyond recovery.
              </p>

              <p className="story-paragraph">
                As a celebrity physiotherapist, Dr. Katariya has treated
                esteemed personalities, yet her true passion lies in making world-class
                physiotherapy accessible to all. With a deep commitment to
                patient-centric care, she has redefined physiotherapy as
                more than just treatment—it is a movement toward
                strength, innovation, and excellence.
              </p>

              <p className="story-paragraph">
                Every patient is not just a case but a story, and at Physiophy,
                every story is given the attention, expertise, and dedication
                it deserves. This is a place where science meets compassion,
                where barriers are broken, and where every step forward is a
                victory.
              </p>

              <div className="quote-box">
                <p className="quote-text">
                  At Physiophy, we don't just heal—
                  <span className="quote-highlight">we transform lives.</span>
                </p>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-card">
                <div className="profile-image-container">
                  <img 
                    src={FounderImage}
                    alt="Dr. Tanvi Katariya"
                    className="profile-image"
                  />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Dr. Tanvi Katariya</h3>
                  <h4 className="profile-title">Master in Neurophysiotherapy</h4>
                  <ul className="credentials-list">
                    <li>Fellowship in Neuro Rehab, UK</li>
                    <li>Ex-Consultant Mission Walk, Hyderabad</li>
                    <li>Ex-Consultant Nanavati Hospital, Mumbai</li>
                    <li>Internationally Certified Autism Therapist</li>
                    <li>Internationally Certified Garbh Sanskar Coach </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="celebrity-section">
        <div className="celebrity-grid">
          {celebrities.map((celebrity, index) => (
            <div key={index} className="celebrity-card">
              <div className="celebrity-image-container">
                <img src={celebrity.image} alt={celebrity.name} className="celebrity-image" />
              </div>
              <div className="celebrity-content">
                <h3 className="celebrity-name">{celebrity.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Founder;