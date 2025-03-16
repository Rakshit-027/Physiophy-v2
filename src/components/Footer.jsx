import React from 'react';
import './Footer.css';
import {Facebook, Twitter, Instagram, Linkedin, Youtube,MapPin} from 'lucide-react'
import Insta from '../assets/My_Instagram_QR_Code.svg'
const Footer = () => {
  return (
    <footer className="physio-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Physiophy</h3>
          <p className="footer-text">
            We are dedicated to providing expert physiotherapy care with a personalized approach to help you achieve optimal health and wellness.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/book">Book Now</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <i className="footer-icon location"></i>
              

              Ground Floor, Hyatt Medicare, Besides Get Wel Hospital, Dhantoli, Nagpur - 440012.
            </li>
            <li>
              <i className="footer-icon location"></i>
              

              Pl no 83 , beside Bhavan’s school 
Gate no 1 , shrikrishna nagar , kharbi , nagpur , Maharashtra 440024
            </li>
            <li>
              <i className="footer-icon phone"></i>
              +919970127641  +917020427614
            </li>
            
            <li>
              <i className="footer-icon email"></i>
              contact@physiophy.com
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className='footer-title'>Scan & Follow</h3>
          <div className="qr-codes">
            <div className="qr-code">
              <img src={Insta} alt="Instagram QR Code" />
              {/* <span>Instagram</span> */}
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-linksss">
  <a href="https://www.facebook.com/PhysioPhyPhysiotherapyCentre/" target="_blank" rel="noopener noreferrer">
    <Facebook size={28} color='white' />
  </a>
  <a href="https://www.youtube.com/@PhysioPhy" target="_blank" rel="noopener noreferrer">
    <Youtube size={28} color='white' />
  </a>
  <a href="https://www.instagram.com/physio.phy/" target="_blank" rel="noopener noreferrer">
    <Instagram size={28} color='white' />
  </a>
  <a href="https://www.linkedin.com/in/physio-phy/" target="_blank" rel="noopener noreferrer">
    <Linkedin size={28} color='white' />
  </a>
</div>

        </div>
      </div>
     
      
      <div className="footer-bottom">
        <p>&copy; 2024 Physiophy. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;