import React, { useEffect } from 'react';
import { auth } from '../../components/Login&Signup/firebase'; // Firebase auth module
import styles from './ProfileModal.module.css'; // CSS module for styling
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
  const placeholderImageURL = 'https://via.placeholder.com/150'; // Ensure HTTPS

  useEffect(() => {
    if (user) {
      console.log('Google Auth Response:', user);
      console.log('Profile Photo URL:', user.photoURL); // Check the photo URL
    }
  }, [user]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2 className={styles.title}>User Profile</h2>
        <div className={styles.profileDetails}>
          <div className={styles.profileImageContainer}>
            <img 
              src={user.photoURL || placeholderImageURL} 
              alt="Profile" 
              className={styles.profileImage} 
              referrerPolicy="no-referrer" // Added referrer policy
            />
          </div>
          <div className={styles.profileItem}>
            <strong>{user.displayName || 'N/A'}</strong>
          </div>
          <div className={styles.profileItem}>
            <strong>Email:</strong> {user.email || 'N/A'}
          </div>
          <div className={styles.profileItem}>
            <strong>UID:</strong> {user.uid || 'N/A'}
          </div>
          <div className={styles.profileItem}>
            <strong>Creation Time:</strong> {user.metadata.creationTime || 'N/A'}
          </div>
          <div className={styles.profileItem}>
            <strong>Last Sign-in Time:</strong> {user.metadata.lastSignInTime || 'N/A'}
          </div>
        </div>
        <div className={styles.logoutButtonContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
