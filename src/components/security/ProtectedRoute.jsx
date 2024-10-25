// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../components/Login&Signup/firebase'; // Import your firebase auth module
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when we have the user state
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading indicator or nothing while checking auth state
    return <div>Loading...</div>; 
  }

  if (!user) {
    // If there's no user, redirect to login page
    return <Navigate to="/" replace />;
  }

  return children; // If user exists, render children (i.e., the Home component)
};

export default ProtectedRoute;
