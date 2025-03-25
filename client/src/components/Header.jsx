import { motion } from "framer-motion";
import { SiEthereum } from "react-icons/si";
import { HiOutlineDocumentAdd, HiOutlineDocumentSearch } from "react-icons/hi";

export default function Header() {

      const { openLoginModal } = useModalStore(); // Get function to open modal


  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-40 w-40 rounded-full bg-blue-500"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              opacity: 0.1 + Math.random() * 0.3,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center">
            <SiEthereum className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-2xl font-bold text-white">CertifyMe</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-gray-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
              How It Works
            </a>
            <a href="#verify" className="hover:text-blue-400 transition-colors">
              Verify
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Blockchain-Powered Certificate Verification
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Generate tamper-proof certificates and verify their authenticity instantly with our blockchain technology.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="cursor-pointerbg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <HiOutlineDocumentAdd className="mr-2 h-5 w-5" />
                Generate Certificate
              </button>
              <button className="cursor-pointer bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <HiOutlineDocumentSearch className="mr-2 h-5 w-5" />
                Verify Certificate
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <LoginModal /> {/* Include modal component here */}
    </header>
  );
}