import React, { useState } from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin,Youtube } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-main">
    <div className="contact-container">
      <div className="contact-header">
        <h1>Your First Step to a Healthier, Pain-Free Life</h1>
        <div className="decorative-line"></div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Contact us for any inquiries, appointments, or further information. We're here to help you.</p>
          
          <div className="contact-details">
  <div className="contact-item">
    <MapPin size={28} className="icon-c" />
    <a 
      href="https://www.google.com/maps/dir/21.1351351,79.1242868/PhysioPhy+-+Best+Neurophysiotherapy+Centre+in+Nagpur/@21.1369162,79.0610261,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bd4c1006aa0f325:0x7840366ec727ecc2!2m2!1d79.0797323!2d21.1366246?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
      target="_blank" 
      rel="noopener noreferrer"
      className="contact-link"
    >
      Ground Floor, Hyatt Medicare, Besides Get Wel Hospital, Dhantoli, Nagpur - 440012.
    </a>
  </div>
  <div className="contact-item">
    <Mail className="icon-c" />
    <a href="mailto:contact@physiotherapy.com" className="contact-link">contact@physiophy.com</a>
  </div>
  <div className="contact-item">
    <Phone className="icon-c" />
    <a href="tel:+919970127614" className="contact-link">+91 9970127614</a>
  </div>
</div>

          <div className="social-links">
            <h3>Follow us on:</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/physio.phy/" className="social-icon"><Instagram /></a>
              <a href="https://www.facebook.com/PhysioPhyPhysiotherapyCentre/" className="social-icon"><Facebook /></a>
              <a href="https://www.youtube.com/@PhysioPhy" className="social-icon"><Youtube /></a>
              <a href="https://www.linkedin.com/in/tanvi-shah-441106212/?originalSubdomain=in" className="social-icon"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;