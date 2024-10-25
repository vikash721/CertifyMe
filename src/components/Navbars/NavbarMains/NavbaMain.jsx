import React, { useState } from "react";
import styles from "./NavbarMain.module.css";
import ProfileModal from "../../ProfileModals/ProfileModal"; // Import the ProfileModal component
import { auth } from "../../Login&Signup/firebase"; // Import your firebase auth module
import { FaUserCircle } from "react-icons/fa"; // Import the user profile icon from react-icons


const NavbarMain = ({ onLoginClick }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = auth.currentUser; // Get the current user from Firebase

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <div className={styles.divcenter}>
      
      <header className={styles.header}>
        <div className={styles.logoSearchContainer}>
          <div className={styles.logo}>CertifyMe</div>
          <input
            className={styles.search}
            type="text"
            placeholder="Search resources"
          />
        </div>
        <nav className={styles.nav}>
          <a href="/">All Resources</a>
          <button onClick={handleProfileClick} className={styles.profileButton}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className={styles.profileImage}
              />
            ) : (
              <FaUserCircle className={styles.profileIcon} />
            )}
          </button>
        </nav>
      </header>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        user={user}
      />
    </div>
  );
};

export default NavbarMain;
