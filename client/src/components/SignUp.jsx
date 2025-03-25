import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();  // For navigation after successful sign-up

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.email, password: user.password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful");
        navigate("/signin"); // Redirect to the login page
      } else {
        setError(data.message);
        console.error("Signup failed:", data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
