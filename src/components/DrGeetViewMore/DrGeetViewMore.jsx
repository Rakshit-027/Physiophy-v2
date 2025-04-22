import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Twitter, Instagram, ExternalLink, Award, BookOpen, Users } from 'lucide-react';
import './DrTanviProfile.css';

const DrGeetViewMore = () => {
  const [isVisible, setIsVisible] = useState(false);
  const profileRef = useRef(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (profileRef.current) {
      observer.observe(profileRef.current);
    }

    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
    };
  }, []);

  const achievements = [
    { icon: <Award size={20} />, text: "Fellowship in Neurorehabilitation, UK" },
    { icon: <BookOpen size={20} />, text: "10+ years specialized experience" },
    { icon: <Users size={20} />, text: "Founder of PhysioPhy" }
  ];

  return (
    <div className={`tanvi-profile-container ${isVisible ? 'fade-in' : ''}`} ref={profileRef}>
      <div className="tanvi-decorative-circle tanvi-circle-1"></div>
      <div className="tanvi-decorative-circle tanvi-circle-2"></div>
      <div className="tanvi-decorative-circle tanvi-circle-3"></div>

      <div className="tanvi-profile-card">
        <div className="tanvi-card-header">
          <div className="tanvi-profile-image-container">
            <div className="tanvi-profile-image-wrapper">
              <img 
                src="https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/cropped_image%20(3).png" 
                alt="Dr. Tanvi Geet Kataria" 
                className="tanvi-profile-image"
              />
            </div>
          </div>

          <div className="tanvi-profile-intro">
            <h1 className="tanvi-profile-name">Dr. Geet Kataria</h1>
            <p className="tanvi-profile-title">MBBS, MD Radiology | Chairperson, PhysioPhy</p>
          </div>
        </div>

        <div className="tanvi-profile-content">
          <div className="tanvi-bio-section">
            <p className="tanvi-profile-bio">
            Dr. Geet Kataria is an MD radiologist with a growing specialization in interventional radiology. He is at the forefront of performing minimally invasive procedures such as varicose vein embolization, uterine artery embolization, and other image-guided interventions. These advanced techniques reduce recovery time and avoid traditional surgical complications.
            </p>
            <p className="tanvi-profile-bio">
            As the Chairperson of PhysioPhy, Dr. Kataria ensures diagnostic precision, technological innovation, and quality oversight across departments. His clinical leadership continues to support the integration of radiology with rehabilitative care for enhanced patient outcomes.
            </p>
          </div>

          <div className="tanvi-action-section">
            <div className="tanvi-social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="tanvi-social-link">
                <Linkedin size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="tanvi-social-link">
                <Twitter size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="tanvi-social-link">
                <Instagram size={22} />
              </a>
            </div>

            <a 
              href="https://physiophy.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tanvi-cta-button"
            >
              Visit PhysioPhy
              <ExternalLink size={16} className="tanvi-cta-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrGeetViewMore;