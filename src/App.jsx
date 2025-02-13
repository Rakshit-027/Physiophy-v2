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

function App() {
  const [showAuth, setShowAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showAdminAuth, setShowAdminAuth] = useState(null);

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

  const handleLogin = () => {
    setShowAuth('signin');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userProfile={userProfile}
        />
        <AnimatePresence mode="wait">
          {showAuth ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              {showAuth === 'signin' ? (
                <SignIn
                  onClose={() => setShowAuth(null)}
                  onSignUp={() => setShowAuth('signup')}
                />
              ) : (
                <SignUp
                  onClose={() => setShowAuth(null)}
                  onSignIn={() => setShowAuth('signin')}
                />
              )}
            </motion.div>
          ) : showAdminAuth ? (
            <motion.div
              key="admin-auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              {showAdminAuth === 'signin' ? (
                <AdminSignIn
                  onClose={() => setShowAdminAuth(null)}
                  onSignUp={() => setShowAdminAuth('signup')}
                />
              ) : (
                <AdminSignUp
                  onClose={() => setShowAdminAuth(null)}
                  onSignIn={() => setShowAdminAuth('signin')}
                />
              )}
            </motion.div>
          ) : (
            <ScrollContent isLoggedIn={isLoggedIn} />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

// 🔐 Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminSession = async () => {
      try {
        const adminEmail = localStorage.getItem('admin_email'); // Get stored admin email

        if (adminEmail) {
          const { data, error } = await supabase
            .from('admin_auth') // Ensure your table is named correctly
            .select('role')
            .eq('email', adminEmail)
            .single();

          if (error) {
            console.error("Error fetching admin:", error);
          }

          if (data?.role === 'admin') {
            setAdmin(data);
          }
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


// 📌 HomePage remains the same
const HomePage = ({ isLoggedIn }) => (
  <div className="sections-container">
    <Element name="home" className="element">
      <Home />
    </Element>
    <Element name="about" className="element">
      <About />
    </Element>
    <Element name="services" className="element">
      <Services />
    </Element>
    {isLoggedIn && (
      <Element name="appointment" className="element">
        <Appointment />
      </Element>
    )}
    <Element name="contact" className="element">
      <Contact />
    </Element>
    <Element name="faq" className="element">
      <FAQ />
    </Element>
  </div>
);

function ScrollContent({ isLoggedIn }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={isLoggedIn ? <Appointment /> : <BookNowPopup />} />
          <Route path="/testimonials" element={<ProtectedAdminRoute><Testimonials /></ProtectedAdminRoute>} />
          <Route path="/media" element={<MediaGallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
          <Route path="/profile" element={<PatientPanel />} />
          <Route path="/media_upload" element={<ProtectedAdminRoute><MediaUpload /></ProtectedAdminRoute>} />
          <Route path="/ClinicsPhotos" element={<ClinicPhotos />} />
          <Route path="/ClinicVideos" element={<ClinicVideos />} />
          <Route path="/admin-dashboard" element={<ProtectedAdminRoute><MainAdmin /></ProtectedAdminRoute>} />
          <Route path="/AdminA" element={<ProtectedAdminRoute><AdminAppointment /></ProtectedAdminRoute>} />
          <Route path="/Doctors" element={<ProtectedAdminRoute><Doctors/></ProtectedAdminRoute>}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
