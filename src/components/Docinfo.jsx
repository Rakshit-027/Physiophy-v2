import React from 'react';
import styled from 'styled-components';
import './Docinfo.css';

const DocInfo = () => {
  const doctors = [
    {
      id: 1,
      name: "DR. VAGISH KATARIYA",
      role: "CONSULTANT PEDIATRIAN AND DIRECTOR,PHYSIOPHY",
      image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/cropped_image%20(4).png",
      specialties: ["Dermatology", "Cosmetic Surgery", "Skin Care"]
    },
    {
      id: 2,
      name: "DR. GEET KATARIYA",
      role: "CONSULTANT RADIOLOGY,CHAIRMAN ,PHYSIOPHY",
      image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/cropped_image%20(3).png",
      specialties: ["Dermatology", "Hair Treatment", "Laser Therapy"]
    },
    {
      id: 3,
      name: "DR. TANVI KATARIYA",
      role: "FOUNDER AND SENIOR NEURO CONSULTANT PHYSIOTHERAPIST ,PHYSIOPHY",
      image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/cropped_image%20(1).png",
      specialties: ["Trichology", "Hair Transplant", "Dermatology"]
    },
    {
      id: 4,
      name: "DR. URVASHI GAHUKAR",
      role: "BRANCH INCHARGE AND ORTHO CONSULTANT PHYSIOTHERAPIST,PHYSIOPHY",
      image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/cropped_image%20(2).png",
      specialties: ["Trichology", "Hair Transplant", "Dermatology"]
    }
  ];

  return (
    <StyledWrapper>
      <div className="docinfo-container">
        <div className="docinfo-header">
          <span className="docinfo-subtitle-accent">Our Team</span>
          <h2 className="docinfo-title">MEET OUR EXPERTS</h2>
          <div className="docinfo-decorative-line">
            <span className="docinfo-line-left"></span>
            <span className="docinfo-diamond"></span>
            <span className="docinfo-line-right"></span>
          </div>
        </div>
        
        <div className="docinfo-cards-container">
          {doctors.map(doctor => (
            <div key={doctor.id} className="docinfo-card card">
              <div className="blob" />
              <div className="bg" />
              <div className="card-content">
                <div className="docinfo-image-wrapper">
                  
                  <div className="docinfo-image-container">
                    <img src={doctor.image} alt={doctor.name} className="docinfo-image" />
                    <div className="docinfo-image-overlay"></div>
                  </div>
                </div>
                <div className="docinfo-content">
                {/* <div className="docinfo-logo-circle"> */}
                    <img 
                      src="https://physiophy.com/assets/Logo-Ch1nNKpq.png" 
                      alt="Physiophy Logo" 
                    />
                  {/* </div> */}
                  <h4 className="docinfo-doctor-name">{doctor.name}</h4>
                  <p className="docinfo-doctor-role">{doctor.role}</p>
                  <button className="docinfo-view-more">
                    <span>VIEW MORE</span>
                    <svg className="docinfo-arrow" viewBox="0 0 24 24">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    height: 470px;
    border-radius: 14px;
    z-index: 1111;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 290px;
    height: 460px;
    z-index: 2;
    background:#dddafe;
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 2px solid white;
  }

  /* Larger glowing red border animation */
  .blob {
    position: absolute;
    width: 180px; /* Increased size */
    height: 180px;
    border-radius: 50%;
    border: 15px solid #39FF14; /* Thicker, fully visible border */
    background-color: rgba(255, 0, 0, 0.4); /* Stronger red glow */
    filter: blur(16px); /* Increased blur effect */
    animation: border-move 6s linear infinite;
  }

  @keyframes border-move {
    0% {
      top: 0%;
      left: 0%;
      transform: translate(0%, 0%);
    }
    25% {
      top: 0%;
      left: 100%;
      transform: translate(-100%, 0%);
    }
    50% {
      top: 100%;
      left: 100%;
      transform: translate(-100%, -100%);
    }
    75% {
      top: 100%;
      left: 0%;
      transform: translate(0%, -100%);
    }
    100% {
      top: 0%;
      left: 0%;
      transform: translate(0%, 0%);
    }
  }

  .card-content {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .docinfo-image-wrapper {
    position: relative;
    margin-top: 25px;
  }

  // .docinfo-logo-circle {
  //   position: absolute;
  //   top: -25px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   width: 50px;
  //   height: 50px;
  //   background: #ffffff;
  //   border-radius: 50%;
  //   padding: 5px;
  //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  //   z-index: 4;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  // .docinfo-logo-circle img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  //   border-radius: 50%;
  // }

  .docinfo-content {
    padding: 1rem;
    text-align: center;
    // flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .docinfo-doctor-name {
    color: #1a365d;
    margin: 0.75rem 0;
    font-size: 1.35rem;
    font-weight: 700;
  }

  .docinfo-doctor-role {
    color: #4a5568;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

export default DocInfo;
