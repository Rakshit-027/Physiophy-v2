import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container with improved responsiveness and gradient background
const Container = styled.div`
  max-width: 100%;
  padding: 30px;
  margin-top: 3rem;
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
  }
`;

// Title with a bold, modern look
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

// Section with subtle animation
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

// Section title with accent color
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

// Paragraph with improved readability
const Paragraph = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.8;
  text-align: justify;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Button for interactivity
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

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling for better UX
    });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          At Phyiophy Physiotherapy Clinic, your privacy is our top priority. We are dedicated to safeguarding your personal information with the highest standards of care and transparency. This policy outlines how we collect, use, and protect your data to ensure your trust and confidence in our services.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>2. Information We Collect</SectionTitle>
        <Paragraph>
          When you engage with our services, we may collect essential details such as your full name, email address, phone number, and relevant medical history. This information helps us tailor our physiotherapy treatments to your specific needs and ensures seamless communication for appointments and follow-ups.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>3. How We Use Your Information</SectionTitle>
        <Paragraph>
          We utilize your data to deliver personalized care, including designing treatment plans, scheduling appointments, and sending reminders. Additionally, we may analyze anonymized data to enhance our services, improve patient outcomes, and ensure our clinic operates efficiently—all while keeping your identity protected.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>4. Data Security</SectionTitle>
        <Paragraph>
          Your personal information is safeguarded with advanced encryption, secure servers, and strict access controls. We regularly update our security protocols to prevent unauthorized access, data breaches, or leaks, ensuring your sensitive details remain confidential and secure.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>5. Sharing Your Information</SectionTitle>
        <Paragraph>
          We do not sell, trade, or share your personal data with third parties unless legally obligated (e.g., by court order) or if you provide explicit consent—such as for a referral to a specialist. In such cases, we ensure any recipient adheres to equivalent privacy standards.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>6. Your Rights</SectionTitle>
        <Paragraph>
          You’re in control of your data. You can request access to your information, update inaccuracies, or ask for its deletion at any time. Contact us directly, and we’ll process your request promptly in accordance with applicable data protection laws.
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>7. Changes to This Policy</SectionTitle>
        <Paragraph>
          We may periodically refine this policy to reflect legal updates or service improvements. Any changes will be posted here, and your continued use of our services signifies your acceptance. We’ll notify you of significant updates via email or during your next visit.
        </Paragraph>
      </Section>
      <Link
        to="/contact"
        style={{ textDecoration: "none", backgroundColor: "#2596be" }}
      >
        <ContactButton>Contact Us for Questions</ContactButton>
      </Link>
    </Container>
  );
};

export default PrivacyPolicy;