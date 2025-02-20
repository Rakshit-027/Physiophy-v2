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
          answer: "Our treatment charges vary depending on the type of therapy required. Please contact us for detailed pricing."
        },
        {
          question: "How many sessions of physiotherapy do we require?",
          answer: "The number of sessions needed depends on your condition and recovery goals. Your physiotherapist will recommend a treatment plan after an initial assessment."
        },
        {
          question: "How long does a physiotherapy session last?",
          answer: "A typical physiotherapy session lasts between 30 to 60 minutes, depending on the treatment required."
        }
      ]
    },
    {
      category: "Conditions Treated",
      items: [
        {
          question: "What conditions are treated at Physiophy?",
          answer: "Physiophy treats a variety of conditions including musculoskeletal injuries, post-surgical rehabilitation, neurological disorders, sports injuries, and chronic pain."
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
