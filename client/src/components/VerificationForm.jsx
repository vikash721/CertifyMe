import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCheck, FiLock, FiCopy } from "react-icons/fi";

export default function VerificationForm() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        valid: true,
        certificate: {
          id: verificationId,
          name: "John Doe",
          course: "Blockchain Development",
          issueDate: "2023-05-15",
          issuer: "Blockchain Academy",
          hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        },
      });
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <form onSubmit={handleVerify} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={verificationId}
            onChange={(e) => setVerificationId(e.target.value)}
            placeholder="Enter certificate ID or hash"
            className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {isVerifying ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              <span className="flex items-center">
                <FiSearch className="mr-2 h-5 w-5" />
                Verify Certificate
              </span>
            )}
          </button>
        </div>

        {verificationResult && (
          <motion.div
            className={`mt-6 p-4 rounded-lg ${verificationResult.valid ? "bg-green-600/20 border border-green-600" : "bg-red-600/20 border border-red-600"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            {verificationResult.valid ? (
              <div>
                <div className="flex items-center text-green-400 mb-2">
                  <FiCheck className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Certificate Verified Successfully</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p className="text-gray-400">Certificate ID</p>
                    <p>{verificationResult.certificate.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Recipient</p>
                    <p>{verificationResult.certificate.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Course</p>
                    <p>{verificationResult.certificate.course}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Issue Date</p>
                    <p>{verificationResult.certificate.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Issuer</p>
                    <p>{verificationResult.certificate.issuer}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Blockchain Hash</p>
                    <p className="truncate">{verificationResult.certificate.hash}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-red-400">
                <FiLock className="h-5 w-5 mr-2" />
                <span>Invalid Certificate. This certificate could not be verified on the blockchain.</span>
              </div>
            )}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}