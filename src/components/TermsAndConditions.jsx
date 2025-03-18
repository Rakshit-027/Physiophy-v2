import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container with gradient and responsive design
const Container = styled.div`
  max-width: 100%;
  margin: 40px auto;
//   margin-top:5.7rem;
  padding-top: 30px;
  margin-top: 5rem;
  background: linear-gradient(135deg, #f9f9f9 0%, #e8f0fe 100%);
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-family: "Poppins", Arial, sans-serif;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    padding: 15px;
    margin-top:5.7rem;
  }
`;

// Bold, modern title
const Title = styled.h1`
  text-align: center;
  color: #1a3552;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Section with hover animation
const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Section title with accent underline
const SectionTitle = styled.h2`
  color: #2c5282;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 50px;
    height: 3px;
    background: #63b3ed;
    bottom: -5px;
    left: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

// Paragraph with enhanced readability
const Paragraph = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.8;
  text-align: justify;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Interactive button
const ContactButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background: #2b6cb0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2c5282;
  }
`;

const TermsAndConditions = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling for better UX
    });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <Container>
      <Title>Terms and Conditions</Title>
      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Welcome to Phyiophy Physiotherapy Clinic in Nagpur! By choosing our services, you agree to abide by these Terms and Conditions, which govern your relationship with us. Our goal is to ensure a smooth, transparent experience while delivering top-quality physiotherapy care.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>2. Appointments & Cancellations</SectionTitle>
        <Paragraph>
          To ensure availability, patients are required to book appointments in advance through our online portal, phone, or in-person. We kindly request cancellations or rescheduling at least 24 hours prior to your appointment. Late cancellations may incur a fee to cover reserved time slots, except in emergencies.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>3. Payments</SectionTitle>
        <Paragraph>
          Full payment is due at the time of service to maintain seamless operations. We offer flexible options including cash, UPI (e.g., Google Pay, PhonePe), and online bank transfers. Please note that unpaid balances may restrict future bookings until settled.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>4. Liability</SectionTitle>
        <Paragraph>
          While we strive to provide safe and effective treatments, Phyiophy Physiotherapy Clinic is not liable for adverse effects if patients fail to adhere to prescribed exercises, guidelines, or post-treatment care instructions. Your active participation is key to successful outcomes.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>5. Privacy Policy</SectionTitle>
        <Paragraph>
          We prioritize your privacy. All patient data—such as medical records and personal details—is kept strictly confidential and will not be shared without your explicit consent, except where legally mandated (e.g., court orders). See our Privacy Policy for full details.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>6. Changes to Terms</SectionTitle>
        <Paragraph>
          We may update these Terms and Conditions periodically to reflect changes in our practices or legal requirements. Updates will be posted here, and your continued use of our services constitutes acceptance. We’ll notify you of major changes via email or during your next visit.
        </Paragraph>
      </Section>
      <Link
        to="/contact"
        style={{ textDecoration: "none", backgroundColor: "rgba(221,219,255,0.4)" }}
      >
        <ContactButton>Contact Us for Clarifications</ContactButton>
      </Link>
    </Container>
  );
};

export default TermsAndConditions;