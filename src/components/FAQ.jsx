import React, { useState } from 'react';
import './FAQ.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: "General Information",
      items: [
        {
          question: "Do we need a doctor referral to come to Physiophy for physiotherapy treatment?",
          answer: "No, you don't need a doctor's referral to visit Physiophy. You can book an appointment directly."
        }
      ]
    },
    {
      category: "Treatment and Sessions",
      items: [
        {
          question: "What are the treatment charges at Physiophy?",
          answer: "Our treatment charges are tailored to the specific therapy you need, ensuring you receive the best care for your condition. We offer competitive pricing with flexible options to suit your needs. For a personalized quote and to explore the best treatment plan for you, feel free to contact us—we’re happy to assist!"
        },
        {
          question: "How many sessions of physiotherapy do we require?",
          answer: "The number of physiotherapy sessions varies based on your condition and recovery goals. Minor issues may need 4-6 sessions, while more complex cases may require 12 or more. After an initial assessment, our physiotherapists will recommend a personalized treatment plan for the best results. Contact us to learn more!" 
        },
        {
          question: "How long does a physiotherapy session last?",
          answer: "A physiotherapy session usually lasts 60 to 90 minutes, depending on your treatment plan and needs. Your therapist will ensure you get the most effective care within this time."
        }
      ]
    },
    {
      category: "Conditions Treated",
      items: [
        {
          question: "What conditions are treated at Physiophy?",
          answer: "Physiophy provides expert care for various conditions across all age groups. \n\n" +
            " Pediatric Rehabilitation: Muscular Dystrophy, Developmental Delay, Down Syndrome, Cerebral Palsy, Autism Spectrum Disorder (ASD), Brachial Plexus Injury, Juvenile Arthritis, Clubfoot & Post-Surgical Pediatric Rehab. \n\n" +
            " Adult & Geriatric Rehabilitation: Bell’s Palsy, Cervical & Lumbar Spondylosis, Multiple Sclerosis, Stroke & Hemiplegia, Parkinson’s Disease, Sciatica, Osteoarthritis, Frozen Shoulder, Sports Injuries, and Post-Surgical Rehabilitation. \n\n" +
            " Women’s Health & Wellness: ANC/PNC Rehab, Postural Correction for New Mothers, Diastasis Recti Correction, Pelvic Floor Strengthening, and Post-C-Section Pain Management. \n\n" +
            " Specialized Therapies: Gait Training, Dry Needling, Cupping Therapy, Kinesio Taping, Hydrotherapy, Electrotherapy & Pain Management, Moxa Fire Therapy, Myofascial Release, Manual Therapy & Joint Mobilization, Lymphatic Drainage Therapy, Ergonomics & Postural Correction Therapy, Hand & Fine Motor Rehabilitation. \n\n" +
            "Our expert physiotherapists offer personalized treatment plans for effective recovery. Contact us to learn more!"
        }
        
        
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0;
  
  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our physiotherapy services</p>
      </div>
      
      <div className="faq-list">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2>{category.category}</h2>
            {category.items.map((item) => {
              const currentIndex = globalIndex++;
              return (
                <div 
                  key={currentIndex}
                  className={`faq-item ${activeIndex === currentIndex ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleAccordion(currentIndex)}
                  >
                    <h3>{item.question}</h3>
                    {activeIndex === currentIndex ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <p>Still have questions? Contact us at (+91) 9970127614 or email info@physiophy.com</p>
      </div>
    </div>
  );
};

export default FAQ;
