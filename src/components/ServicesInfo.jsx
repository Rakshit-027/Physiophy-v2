import React, { useEffect, useRef } from 'react';
import './ServicesInfo.css';

const ServicesInfo = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="services-container">
      <h1 className="main-heading">Conditions Served in PhysioPhy</h1>
      
      <section className="service-section" ref={el => sectionRefs.current[0] = el}>
        <h2>🏥 Pediatric Rehabilitation</h2>
        <div className="services-grid">
          <div className="service-box">Muscular Dystrophy</div>
          <div className="service-box">Developmental Delay</div>
          <div className="service-box">Down Syndrome</div>
          <div className="service-box">Cerebral Palsy</div>
          <div className="service-box">Traumatic Brain Injury</div>
          <div className="service-box">Spina Bifida</div>
          <div className="service-box">Autism Spectrum Disorder (ASD)</div>
          <div className="service-box">Brachial Plexus Injury</div>
          <div className="service-box">Juvenile Arthritis</div>
          <div className="service-box">Clubfoot & Post-Surgical Pediatric Rehab</div>
        </div>
      </section>

      <section className="service-section" ref={el => sectionRefs.current[1] = el}>
        <h2>👥 Adult [Neuro & Ortho] & Geriatric Rehabilitation</h2>
        <div className="services-grid">
          <div className="service-box">Bell's Palsy</div>
          <div className="service-box">Cervical & Lumbar Spondylosis</div>
          <div className="service-box">Multiple Sclerosis</div>
          <div className="service-box">Transverse Myelitis</div>
          <div className="service-box">Plantar Fasciitis</div>
          <div className="service-box">Osteoarthritis</div>
          <div className="service-box">Frozen Shoulder</div>
          <div className="service-box">Tennis Elbow</div>
          <div className="service-box">Spinal Cord Injuries</div>
          <div className="service-box">Post-Fracture & Post-Surgical Rehabilitation</div>
          <div className="service-box">Stroke & Hemiplegia Rehabilitation</div>
          <div className="service-box">Carpal Tunnel Syndrome</div>
          <div className="service-box">Sciatica & Neuropathy Management</div>
          <div className="service-box">Parkinson's Disease Rehab</div>
          <div className="service-box">Diabetic Neuropathy</div>
          <div className="service-box">Geriatric Fall Prevention Program</div>
          <div className="service-box">TMJ Dysfunction</div>
          <div className="service-box">Post-Joint Replacement Rehabilitation</div>
          <div className="service-box">Sports Injury Rehab</div>
        </div>
      </section>

      <section className="service-section" ref={el => sectionRefs.current[2] = el}>
        <h2>👩 Women's Health & Wellness</h2>
        <div className="services-grid">
          <div className="service-box">ANC/PNC Rehab</div>
          <div className="service-box">Postural Correction for New Mothers</div>
          <div className="service-box">Diastasis Recti Correction</div>
          <div className="service-box">Pelvic Floor Strengthening</div>
          <div className="service-box">Post-C-Section Pain Management</div>
        </div>
      </section>

      <section className="service-section" ref={el => sectionRefs.current[3] = el}>
        <h2>🔧 Specialized Therapies</h2>
        <div className="services-grid">
          <div className="service-box">Gait Training & Balance Therapy</div>
          <div className="service-box">Dry Needling</div>
          <div className="service-box">Cupping Therapy</div>
          <div className="service-box">Kinesio Taping</div>
          <div className="service-box">Hydro Therapy</div>
          <div className="service-box">Electrotherapy & Pain Management</div>
          <div className="service-box">Moxa Fire Therapy</div>
          <div className="service-box">Lymphatic Drainage Therapy</div>
          <div className="service-box">Ergonomics and Postural Correction Therapy</div>
          <div className="service-box">Myofacial Release</div>
          <div className="service-box">Manual Therapy and Joint Mobilization</div>
          <div className="service-box">Hand and Fine Motor Rehabilitation</div>
        </div>
      </section>
    </div>
  );
};

export default ServicesInfo;