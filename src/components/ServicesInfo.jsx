import React, { useEffect, useRef } from 'react';
import './ServicesInfo.css';

const ServicesInfo = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const servicesData = {
    pediatric: [
      { name: 'Muscular Dystrophy', desc: 'Therapy to improve mobility and slow muscle degeneration.' },
      { name: 'Developmental Delay', desc: 'Support for delayed motor or cognitive milestones.' },
      { name: 'Down Syndrome', desc: 'Therapy to enhance muscle tone, coordination, and daily function.' },
      { name: 'Cerebral Palsy', desc: 'Movement disorder management through specialized exercises and therapy.' },
      { name: 'Traumatic Brain Injury', desc: 'Rehab for cognitive and physical recovery.' },
      { name: 'Spina Bifida', desc: 'Rehabilitation to improve mobility and independence for spinal conditions.' },
      { name: 'Autism Spectrum Disorder (ASD)', desc: 'Motor skill and sensory integration therapy for improved coordination and function.' },
      { name: 'Brachial Plexus Injury', desc: 'Rehabilitation to restore arm movement after nerve injury.' },
      { name: 'Juvenile Arthritis', desc: 'Pain relief and joint function therapy for children with arthritis.' },
      { name: 'Clubfoot & Post-Surgical Pediatric Rehab', desc: 'Correction of foot deformity and recovery support.' },
    ],
    adultGeriatric: [
      { name: 'Bell’s Palsy', desc: 'Facial nerve therapy to restore movement and function.' },
      { name: 'Cervical & Lumbar Spondylosis', desc: 'Therapy for spinal degeneration to reduce pain and stiffness.' },
      { name: 'Multiple Sclerosis', desc: 'Rehabilitation to manage mobility, balance, and fatigue.' },
      { name: 'Transverse Myelitis', desc: 'Spinal inflammation recovery therapy.' },
      { name: 'Plantar Fasciitis', desc: 'Heel pain relief with targeted stretching and therapy.' },
      { name: 'Osteoarthritis', desc: 'Joint pain and stiffness reduction.' },
      { name: 'Frozen Shoulder', desc: 'Therapy to restore shoulder mobility and reduce pain.' },
      { name: 'Tennis Elbow', desc: 'Treatment for elbow tendon inflammation and pain relief.' },
      { name: 'Spinal Cord Injuries', desc: 'Rehabilitation to regain mobility and independence.' },
      { name: 'Post-Fracture & Post-Surgical Rehab', desc: 'Recovery after breaks or surgery.' },
      { name: 'Stroke & Hemiplegia Rehab', desc: 'Therapy to restore movement and daily function after a stroke.' },
      { name: 'Carpal Tunnel Syndrome', desc: 'Wrist pain and numbness relief.' },
      { name: 'Sciatica & Neuropathy Management', desc: 'Pain relief and nerve function therapy for sciatica and neuropathy.' },
      { name: 'Parkinson’s Disease Rehab', desc: 'Therapy to enhance movement, coordination, and balance.' },
      { name: 'Diabetic Neuropathy', desc: 'Rehabilitation to improve nerve function and reduce pain in diabetes.' },
      { name: 'Geriatric Fall Prevention', desc: 'Balance training for seniors.' },
      { name: 'TMJ Dysfunction', desc: 'Jaw pain relief and mobility therapy for TMJ disorders.' },
      { name: 'Post-Joint Replacement Rehab', desc: 'Recovery after joint surgery.' },
      { name: 'Sports Injury Rehab', desc: 'Healing for athletic injuries.' },
    ],
    womensHealth: [
      { name: 'ANC/PNC Rehab', desc: 'Prenatal and postnatal rehabilitation for strength and recovery.' },
      { name: 'Postural Correction for New Moms', desc: 'Post-pregnancy posture realignment to prevent pain.' },
      { name: 'Diastasis Recti Correction', desc: 'Healing abdominal separation.' },
      { name: 'Pelvic Floor Strengthening', desc: 'Therapy to enhance pelvic muscle strength and function.' },
      { name: 'Post-C-Section Pain Management', desc: 'Rehabilitation for pain relief and recovery after a C-section.' },
    ],
    specializedTherapies: [
      { name: 'Gait Training & Balance Therapy', desc: 'Improving walking and stability.' },
      { name: 'Dry Needling', desc: 'A technique using fine needles to relieve muscle tension and pain.' },
      { name: 'Cupping Therapy', desc: 'Suction therapy to promote circulation and relieve muscle tension.' },
      { name: 'Kinesio Taping', desc: 'Supportive taping for pain relief and muscle function.' },
      { name: 'Hydro Therapy', desc: 'Water-based rehabilitation for pain relief and mobility.' },
      { name: 'Electrotherapy & Pain Management', desc: 'Electrical stimulation for pain.' },
      { name: 'Moxa Fire Therapy', desc: 'Traditional heat therapy to improve circulation and reduce pain.' },
      { name: 'Lymphatic Drainage Therapy', desc: 'Reducing swelling and toxins.' },
      { name: 'Ergonomics & Postural Correction', desc: 'Postural adjustments to prevent strain and pain.' },
      { name: 'Myofascial Release', desc: 'Soft tissue therapy to reduce muscle tightness and pain.' },
      { name: 'Manual Therapy & Joint Mobilization', desc: 'Hands-on joint care.' },
      { name: 'Hand & Fine Motor Rehab', desc: 'Therapy to restore hand strength, coordination, and dexterity.' },
    ],
  };
  
  return (
    <div className="services-container">
      <h1 className="main-heading">Conditions Served In PhysioPhy</h1>

      <section className="service-section" ref={(el) => (sectionRefs.current[0] = el)}>
        <h2>Pediatric Rehabilitation</h2>
        <div className="services-grid">
          {servicesData.pediatric.map((service, index) => (
            <div key={index} className="service-box">
              <span>{service.name}</span>
              <span className="tooltip">{service.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section" ref={(el) => (sectionRefs.current[1] = el)}>
        <h2>Adult [Neuro & Ortho] & Geriatric Care</h2>
        <div className="services-grid">
          {servicesData.adultGeriatric.map((service, index) => (
            <div key={index} className="service-box">
              <span>{service.name}</span>
              <span className="tooltip">{service.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section" ref={(el) => (sectionRefs.current[2] = el)}>
        <h2>Women’s Health & Wellness</h2>
        <div className="services-grid">
          {servicesData.womensHealth.map((service, index) => (
            <div key={index} className="service-box">
              <span>{service.name}</span>
              <span className="tooltip">{service.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section" ref={(el) => (sectionRefs.current[3] = el)}>
        <h2>Specialized Therapies</h2>
        <div className="services-grid">
          {servicesData.specializedTherapies.map((service, index) => (
            <div key={index} className="service-box">
              <span>{service.name}</span>
              <span className="tooltip">{service.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesInfo;