import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false, // Tracks if user is logged in
  user: null, // Stores user details

  // Simulated Login Function
  login: (userData) => set({ isAuthenticated: true, user: userData }),

  // Logout Function
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
