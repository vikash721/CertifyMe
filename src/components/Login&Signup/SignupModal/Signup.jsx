import React, { useState } from 'react';
import styles from './Signup.module.css';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const Signup = ({ onClose, openLoginModal }) => { // Add openLoginModal as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
      });
      setError('');
      setSuccess('Signup successful! User data stored in Firestore.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onClose(); // Close the modal after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.signupModal}>
      <div className={styles.signupContainer}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close signup modal">
          <FaTimes />
        </button>
        <h2>Signup</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
            />
          </div>
          <button type="submit" className={styles.submitButton}>Signup</button>
        </form>

        <p>
          Already have an account? <button className={styles.switchLink} onClick={openLoginModal}>Login here</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
