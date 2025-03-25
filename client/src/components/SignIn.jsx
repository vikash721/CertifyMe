import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
  
      // Check if the response is not empty before using it
      if (response.data) {
        // Assuming response contains a message or token
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
        // Redirect or update UI here
      } else {
        console.error('Empty response received');
      }
    } catch (err) {
      // Handle error gracefully
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Unexpected error occurred');
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
