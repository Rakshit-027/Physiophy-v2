import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Element, Events, scrollSpy } from 'react-scroll';
import supabase from './components/SupabaseClient';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import About from './components/About';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Appointment from './components/Appointment.jsx';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FAQ from './components/FAQ.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import PatientPanel from './components/PatientPanel.jsx';
import Testimonials from './components/Testimonials.jsx';
import MediaGallery from './components/MediaGallery.jsx';
import MediaUpload from './components/MediaUpload.jsx';
import ClinicPhotos from './components/ClinicPhotos.jsx';
import ClinicVideos from './components/ClinicVideos.jsx';
import MainAdmin from './components/MainAdmin.jsx';
import AdminAppointment from './components/AdminAppointment.jsx';
import AdminSignIn from './components/AdminSignIn';
import AdminSignUp from './components/AdminSignUp';
import BookNowPopup from './components/BookNowPopup.jsx';
import Doctors from './components/Doctors.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import AdminInstructions from './components/AdminInstructions.jsx';
import Whatsaap from './components/Mini/Whatsaap.jsx';
import Footer from './components/Footer.jsx';
import PatientVideos from './components/PatientVideos.jsx';
import "./App.css"
import InfiniteCardSlider from './components/InfiniteCardSlider.jsx';
import TermsAndConditions from './components/TermsAndConditions.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import DrTanviViewMore from './components/DrTanviViewMore/DrTanviViewMore.jsx';
import DrGeetViewMore from './components/DrGeetViewMore/DrGeetViewMore.jsx';
import DrUrvashiViewMore from './components/DrUrvashiViewMore/DrUrvashiViewMore.jsx';
import DrVageshViewMore from './components/DrVageshViewMore/DrVageshViewMore.jsx';
function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [showAuth, setShowAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showAdminAuth, setShowAdminAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    scrollSpy.update();

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserProfile(session.user);
        setIsLoggedIn(true);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUserProfile(session.user);
          setIsLoggedIn(true);
          setShowAuth(null);
          setShowAdminAuth(null);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setIsLoggedIn(false);
        }
      }
    );

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => setShowAuth('signin');
  const handleLogout = async () => await supabase.auth.signOut();

  return (
    <div className="app">
      {/* ✅ Navbar stays visible on all pages */}
      <div className="nav-app">
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} userProfile={userProfile} />
      </div>
      <div className="whatsapp" onClick={() => (window.location.href = "https://goto.now/70NiW")}>
        <Whatsaap />
      </div>

      <AnimatePresence mode="wait">
        {showAuth ? (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
            {showAuth === 'signin' ? <SignIn onClose={() => setShowAuth(null)} onSignUp={() => setShowAuth('signup')} /> : 
                                      <SignUp onClose={() => setShowAuth(null)} onSignIn={() => setShowAuth('signin')} />}
          </motion.div>
        ) : showAdminAuth ? (
          <motion.div key="admin-auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
            {showAdminAuth === 'signin' ? <AdminSignIn onClose={() => setShowAdminAuth(null)} onSignUp={() => setShowAdminAuth('signup')} /> : 
                                          <AdminSignUp onClose={() => setShowAdminAuth(null)} onSignIn={() => setShowAdminAuth('signin')} />}
          </motion.div>
        ) : (
          <ScrollContent isLoggedIn={isLoggedIn} />
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔐 Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminSession = async () => {
      try {
        const adminEmail = localStorage.getItem('admin_email');
        if (adminEmail) {
          const { data, error } = await supabase.from('admin_auth').select('role').eq('email', adminEmail).single();
          if (!error && data?.role === 'admin') setAdmin(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminSession();
  }, []);

  if (loading) return <div>Loading...</div>;
  return admin ? children : <Navigate to="/admin-signin" replace />;
};

// 📌 HomePage
const HomePage = ({ isLoggedIn }) => (
  <div className="sections-container">
    <Element name="home" className="element"><Home /></Element>
    <Element name="PatientVideo" className="element"><PatientVideos/></Element>
    <Element name="about" className="element"><About /></Element>
    <Element name="Scroll" className='element'><InfiniteCardSlider/></Element>
    <Element name="services" className="element"><Services /></Element>
    {isLoggedIn && <Element name="appointment" className="element"><Appointment /></Element>}
    <Element name="contact" className="element"><Contact /></Element>
    <Element name="faq" className="element"><FAQ /></Element>
    <Element name="Footer" className="element"><Footer/></Element>
  </div>
);

function ScrollContent({ isLoggedIn }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={isLoggedIn ? <Appointment /> : <BookNowPopup />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
          <Route path="/profile" element={<PatientPanel />} />
          <Route path="media" element={<MediaGallery/>}/>
          <Route path="ClinicsPhotos" element={<ClinicPhotos/>}/>
          <Route path="ClinicVideos" element={<ClinicVideos/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/doctors/tanvi-katariya" element={<DrTanviViewMore />} />
          <Route path="/doctors/geet-katariya" element={<DrGeetViewMore />} />
          <Route path="/doctors/urvashi-gahukar" element={<DrUrvashiViewMore />} />
          <Route path="/doctors/vagish-katariya" element={<DrVageshViewMore />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;

