import { Loader, Shield, Plus, ChevronDown } from "lucide-react";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import useBulkCertificateStore from "../../store/useIssueBulkCertificateOnBlockChain";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Deployment({
  deploymentSuccess,
  clearData,
  csvData,
  goBackToStep2,
}) {
  const { issueBatchCertificates, loading, txHash, isProcessing } =
    useBulkCertificateStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (txHash) {
      setIsPaymentConfirmed(true); // Mark payment as confirmed
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [txHash]);

  const handleDeployToBlockchain = async () => {
    if (csvData.length === 0) {
      alert("No certificates to deploy!");
      return;
    }

    const batchData = {
      certificateIds: csvData.map((cert) => cert["Certificate ID"]),
      recipientNames: csvData.map((cert) => cert["Recipient Name"]),
      recipientEmails: csvData.map((cert) => cert["Recipient Email"]),
      achievementTitles: csvData.map((cert) => cert["Achievement Title"]),
      issueDates: csvData.map((cert) => cert["Issue Date"]),
      issuedBys: csvData.map((cert) => cert["Issued By"]),
      additionalDetailsArray: csvData.map((cert) => cert["Details"] || ""),
    };

    await issueBatchCertificates(batchData);
  };

  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <Confetti width={width} height={height} />}

      {/* Rerendered success component when payment is confirmed */}
      {isPaymentConfirmed ? (
        <PaymentSuccess key={txHash} txHash={txHash} clearData={clearData} />
      ) : (
        <>
          <div className="flex items-center mb-6">
            <button
              onClick={goBackToStep2}
              className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-all flex items-center mr-4"
            >
              <ChevronDown className="h-4 w-4 mr-1.5 rotate-90" />
              Back
            </button>
            <h2 className="text-lg font-bold">Review Certificate Data</h2>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 mb-6 shadow-md">
            <p className="font-medium">Ready to Deploy</p>
            <p className="text-sm text-slate-400">
              {csvData.length} certificates will be issued on the blockchain.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {loading && (
              <p className="text-yellow-400 text-sm mb-2 animate-pulse">
                Processing payment...
              </p>
            )}

            {txHash && (
              <p className="text-green-400 text-sm mb-2">
                Transaction Hash:{" "}
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-300"
                >
                  {txHash}
                </a>
              </p>
            )}

            <button
              onClick={handleDeployToBlockchain}
              disabled={loading || csvData.length === 0}
              className={`cursor-pointer px-6 py-2.5 rounded-lg font-medium transition-all flex items-center shadow-md ${
                loading || csvData.length === 0
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              {loading ? "Processing Payment..." : "Deploy to Blockchain"}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ✅ Separate Payment Success Component
function PaymentSuccess({ txHash, clearData }) {
  return (
    <motion.div
      className="text-center py-6"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 text-green-400 mb-4 shadow-md animate-pulse">
        <FiCheck className="h-8 w-8 animate-bounce" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-green-400">
        Payment Successful!
      </h3>
      <p className="text-slate-400 mb-6">
        All certificates have been successfully issued on the blockchain.
      </p>

      <motion.div
        className="bg-green-900/20 rounded-lg p-4 mb-6 text-green-400 shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p className="text-sm mb-2">Transaction Hash:</p>
        <a
          href={`https://sepolia.etherscan.io//tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-800 text-green-200 text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          {txHash}
        </a>
      </motion.div>

      <button
        onClick={clearData}
        className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center shadow-md"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Batch
      </button>
    </motion.div>
  );
}
