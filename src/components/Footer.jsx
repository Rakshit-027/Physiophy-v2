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
              <i className="footer-icon phone"></i>
              +919970127641
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
          <div className="social-links">
            <a> <Facebook size={28} href="https://www.facebook.com/PhysioPhyPhysiotherapyCentre/"/></a>
            <a><Youtube size={28} href='https://www.youtube.com/@PhysioPhy'/></a>
            <a><Instagram size={28} href="https://www.instagram.com/physio.phy/"/></a>
            <a><Linkedin size={28} href="https://www.instagram.com/physio.phy/"/></a>
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