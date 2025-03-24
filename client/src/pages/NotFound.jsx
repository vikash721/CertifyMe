import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <motion.div 
        className="flex flex-col items-center p-10 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-8xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <p className="text-xl text-gray-300 mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <motion.button 
            className="cursor-pointer mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
