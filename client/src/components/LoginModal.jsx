import { motion } from "framer-motion";
import { AiOutlineClose, AiFillGoogleCircle } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa";
import useModalStore from "../store/useModalStore";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();

  if (!isLoginModalOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40">
      <motion.div
        className="bg-white dark:bg-gray-900/80 border border-gray-700 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-gray-900 dark:text-white relative backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Close Button */}
        <button onClick={closeLoginModal} className="absolute top-3 right-3 text-gray-400 hover:text-white transition">
          <AiOutlineClose size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Login Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-3 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* OAuth Login Options */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 py-3 rounded-lg font-medium transition">
            <AiFillGoogleCircle className="mr-2 text-red-500" size={24} />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 py-3 rounded-lg font-medium transition">
            <FaMicrosoft className="mr-2 text-blue-400" size={24} />
            Sign in with Microsoft
          </button>
        </div>

        {/* Signup Option */}
        <p className="text-center text-gray-400 mt-6">
          New here? <span className="text-blue-400 hover:underline cursor-pointer">Create an account</span>
        </p>
      </motion.div>
    </div>
  );
}
