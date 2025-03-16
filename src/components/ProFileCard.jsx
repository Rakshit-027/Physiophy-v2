import React from "react";
import "./ProFileCard.css";
// import FounderImage from './assets/components/Mini/7.jpg';
import FounderImage from '../assets/7.jpg';
const ProfileCard = ({ name, role, image, description, socialLinks }) => {
  return (
    <figure className="snip1515">
      <div className="profile-image">
        <img src={image} alt={name} />
      </div>
      <figcaption>
        <h3>{name}</h3>
        <h4>{role}</h4>
        <h4>Master in Neurophysiotherapy</h4>
        <h4>Fellowship in Neuro Rehab, UK</h4>
        <h4>Ex-Consultant Mission Walk, Hyderabad</h4>
        <h4>Ex-Consultant Nanavati Hospital, Mumbai</h4>
        <h4>Internationally Certified Autism Therapist</h4>
        <h4>Internationally Certified Garbh Sanskar Coach</h4>
        {/* <p>{description}</p> */}
        {/* <div className="icons">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div> */}
      </figcaption>
    </figure>
  );
};

const ProfileList = () => {
  const profiles = [
    {
      name: "Dr. Tanvi Katariya",
      role: "Founder",
      image: "https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/ScrollSlider/docs/IMG_2805%20(1).JPG",
      description: "Which is worse, that everyone has his price, or that the price is always so low.",
      socialLinks: [
        { url: "#", icon: "ion-social-reddit" },
        { url: "#", icon: "ion-social-twitter" },
        { url: "#", icon: "ion-social-vimeo" }
      ]
    }
    // {
    //   name: "Norman Gordon",
    //   role: "Web Designer",
    //   image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg",
    //   description: "I'm killing time while I wait for life to shower me with meaning and happiness.",
    //   socialLinks: [
    //     { url: "#", icon: "ion-social-reddit" },
    //     { url: "#", icon: "ion-social-twitter" },
    //     { url: "#", icon: "ion-social-vimeo" }
    //   ]
    // },
    // {
    //   name: "Ruby Von Rails",
    //   role: "Public Relations",
    //   image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample70.jpg",
    //   description: "The only skills I have the patience to learn are those that have no real application in life.",
    //   socialLinks: [
    //     { url: "#", icon: "ion-social-reddit" },
    //     { url: "#", icon: "ion-social-twitter" },
    //     { url: "#", icon: "ion-social-vimeo" }
    //   ]
    // }
  ];

  return (
    <div className="profile-list">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </div>
  );
};

export default ProfileList;
