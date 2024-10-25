// Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const Login = ({ onClose, openSignupModal, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoginLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Clear error if login is successful
      onLoginSuccess(); // Call the success callback
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Get user info
      console.log('User signed in successfully:', user); // Log user info
      onLoginSuccess(); // Call success callback after Google login
    } catch (error) {
      console.error("Google Sign-in Error Code:", error.code);
      console.error("Google Sign-in Error Message:", error.message);
      let errorMessage;

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = "The popup was closed before completing the sign in.";
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = "The popup request was cancelled.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Network error, please try again.";
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = "An account already exists with the same email but a different sign-in method.";
          break;
        case 'auth/invalid-credential':
          errorMessage = "The credential used is invalid or expired. Try signing in again.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "The Google sign-in method is disabled. Contact support.";
          break;
        default:
          errorMessage = `Something went wrong during Google Sign-in. (${error.code})`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginModal}>
      <div className={styles.loginContainer}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close login modal">
          <FaTimes />
        </button>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
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
          <button type="submit" className={styles.submitButton} disabled={loginLoading}>
            {loginLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
          </button>
        </form>

        <div className={styles.googleSigninButton} onClick={handleGoogleSignIn}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" 
                alt="Google Icon"
                className={styles.googleIcon}
              />
              <span>Sign in with Google</span>
            </>
          )}
        </div>

        <p>
          Don't have an account? <button onClick={openSignupModal}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
