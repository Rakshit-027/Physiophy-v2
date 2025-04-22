import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Twitter, Instagram, ExternalLink, Award, BookOpen, Users } from 'lucide-react';
import './DrTanviProfile.css';

const DrMeghalanViewMore = () => {
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
                src="https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/meghna-croped.png" 
                alt="Dr. Tanvi Geet Kataria" 
                className="tanvi-profile-image"
              />
            </div>
          </div>

          <div className="tanvi-profile-intro">
            <h1 className="tanvi-profile-name">Dr. Meghalan Zewar</h1>
            <p className="tanvi-profile-title">MPTH Neuro | Consultant Neurophysiotherapist</p>
          </div>
        </div>

        <div className="tanvi-profile-content">
          <div className="tanvi-bio-section">
            <p className="tanvi-profile-bio">
            An alumna of Lata Mangeshkar College, Nagpur, Dr. Meghalan Zewar specializes in neurological rehabilitation with an emphasis on functional recovery. Her strengths lie in assessing and treating complex neurological cases — including stroke, Parkinson’s, and traumatic brain injuries — with a goal to restore independence in daily life.
            </p>
            <p className="tanvi-profile-bio">
            Dr. Meghalan is known for her patient-centric approach and detailed evaluations, often uncovering subtle deficits that significantly influence therapy outcomes. Her calm demeanor and analytical skills contribute immensely to the multidisciplinary strength of PhysioPhy.
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

export default DrMeghalanViewMore;