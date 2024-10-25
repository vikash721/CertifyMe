// src/components/LandingPage/LandingPage.jsx
import React, { useState } from 'react';
import { FaCertificate, FaShieldAlt, FaUserCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './LandingPage.module.css';
import CenteredContainer from '../CenterdComponent/CenteredContainer';
import Login from '../Login&Signup/LoginModal/Login';
import Signup from '../Login&Signup/SignupModal/Signup';
import NavbarTemp from '../Navbars/NavabrTemp/NavbarTemp';

const LandingPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => setIsSignupModalOpen(false);

  const handleLoginSuccess = () => {
    closeLoginModal();
    navigate('/Home'); // Redirect to /Home after successful login
  };

  return (
    <>
      <NavbarTemp onLoginClick={openLoginModal} />
      <CenteredContainer>
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1>Welcome to <span className={styles.certifyme}>CertifyMe</span></h1>
              <p>Create effortless certificates and verify any time with CertifyMe.</p>
              <button className={styles.ctaBtn} onClick={openLoginModal}>Get Started</button>
            </div>
            <div className={styles.floatingShapes}>
              <div className={`${styles.shape} ${styles.shape1}`}></div>
              <div className={`${styles.shape} ${styles.shape2}`}></div>
              <div className={`${styles.shape} ${styles.shape3}`}></div>
            </div>
          </section>
          <section className={styles.featuresSection}>
            <h2>Features</h2>
            <div className={styles.features}>
              <div className={styles.featureCard}>
                <FaCertificate className={styles.featureIcon} />
                <h3>Customizable Templates</h3>
                <p>Easily create certificates that reflect your brand.</p>
              </div>
              <div className={styles.featureCard}>
                <FaShieldAlt className={styles.featureIcon} />
                <h3>Secure Verification</h3>
                <p>Validate certificates with our unique verification system.</p>
              </div>
              <div className={styles.featureCard}>
                <FaUserCheck className={styles.featureIcon} />
                <h3>User-Friendly Interface</h3>
                <p>Design and issue certificates effortlessly.</p>
              </div>
            </div>
          </section>
          <footer className={styles.footer}>
            <p>&copy; 2024 CertifyMe. All rights reserved.</p>
          </footer>
        </div>
      </CenteredContainer>
      {isLoginModalOpen && <Login onClose={closeLoginModal} openSignupModal={openSignupModal} onLoginSuccess={handleLoginSuccess} />}
      {isSignupModalOpen && <Signup onClose={closeSignupModal} />}
    </>
  );
};

export default LandingPage;
