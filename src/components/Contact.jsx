import React, { useState } from 'react';
import './Contact.css';
import { Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-main">
      <div className="xai-contact-headerr">
        <h1>Your First Step to a Healthier, Pain-Free Life</h1>
      </div>
      <section className="xai-contact-section">
        <div className="xai-contact-card">
          <div className="xai-contact-content">
            <h1 className="xai-contact-header">Get in Touch</h1>
            <p className="xai-contact-text">
              Reach out for inquiries, appointments, or more info. Your journey to wellness starts here!
            </p>
            <div className="xai-contact-info">
              <p className="xai-contact-location">
                <span className="xai-icon">📍</span>
                Ground Floor, Hyatt Medicare, Besides Get Well Hospital, Dhantoli, Nagpur - 440012
              </p>
              <p className="xai-contact-location">
                <span className="xai-icon">📍</span>
                Pl no 83, beside Bhavan’s School Gate no 1, Shrikrishna Nagar, Kharbi, Nagpur, Maharashtra 440024
              </p>
              <p className="xai-contact-email">
                <span className="xai-icon">📧</span>
                <a href="mailto:contact@physiophy.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  contact@physiophy.com
                </a>
              </p>
              <p className="xai-contact-phone">
                <span className="xai-icon">📞</span>
                <a href="tel:+919970127614" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 9970127614
                </a>
              </p>
              <p className="xai-contact-phone">
                <span className="xai-icon">📞</span>
                <a href="tel:+917020427614" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 70204 27614
                </a>
              </p>
            </div>
            <div className="xai-social-links">
              <p className="xai-social-text">Connect with us:</p>
              <div className="social-linksss">
                <a href="https://www.facebook.com/PhysioPhyPhysiotherapyCentre/" target="_blank" rel="noopener noreferrer" className="xai-social-icon">
                  <Facebook size={20} /> {/* Reduced icon size */}
                </a>
                <a href="https://www.youtube.com/@PhysioPhy" target="_blank" rel="noopener noreferrer" className="xai-social-icon">
                  <Youtube size={20} />
                </a>
                <a href="https://www.instagram.com/physio.phy/" target="_blank" rel="noopener noreferrer" className="xai-social-icon">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/in/physio-phy/" target="_blank" rel="noopener noreferrer" className="xai-social-icon">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="xai-contact-form-wrapper">
            <h2 className="xai-form-header">Let’s Talk</h2>
            <form onSubmit={handleSubmit} className="xai-contact-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="xai-form-input"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="xai-form-input"
                placeholder="Your Email"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="xai-form-input"
                placeholder="Your Phone"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="xai-form-textarea"
                placeholder="Tell us how we can assist you..."
                required
              />
              <button type="submit" className="xai-form-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;