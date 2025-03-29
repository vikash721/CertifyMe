import { Loader, Shield, FileText, Plus, ChevronDown } from "lucide-react"
import { FiCheck } from "react-icons/fi"

import useBulkCertificateStore from "../../store/useIssueBulkCertificateOnBlockChain" // Import Zustand store
import { motion } from "framer-motion"

export default function Deployment({
  isDeploying,
  deploymentSuccess,
  clearData,
  csvData,
  goBackToStep2
}) {
  const issueBatchCertificates = useBulkCertificateStore((state) => state.issueBatchCertificates);

  const handleDeployToBlockchain = async () => {
    if (csvData.length === 0) {
      alert("No certificates to deploy!");
      return;
    }

    console.log(csvData);

    // Format CSV data into arrays
    const batchData = {
      certificateIds: csvData.map((cert) => cert["Certificate ID"]),
      recipientNames: csvData.map((cert) => cert["Recipient Name"]),
      recipientEmails: csvData.map((cert) => cert["Recipient Email"]),
      achievementTitles: csvData.map((cert) => cert["Achievement Title"]),
      issueDates: csvData.map((cert) => cert["Issue Date"]),
      issuedBys: csvData.map((cert) => cert["Issued By"]),
      additionalDetailsArray: csvData.map((cert) => cert["Details"] || ""),
    };

    console.log(batchData); // Log the batchData here

    // Deploy certificates to blockchain
    await issueBatchCertificates(batchData);
  };

  return (
    <motion.div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      {!deploymentSuccess ? (
        <>
          <div className="flex items-center mb-6">
            <button
              onClick={goBackToStep2}
              className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center mr-4"
            >
              <ChevronDown className="h-4 w-4 mr-1.5 rotate-90" />
              Back
            </button>
            <h2 className="text-lg font-bold">Review Certificate Data</h2>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
            <p className="font-medium">Ready to Deploy</p>
            <p className="text-sm text-slate-400">
              {csvData.length} certificates will be issued on the blockchain.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDeployToBlockchain}
              disabled={isDeploying || csvData.length === 0}
              className={`cursor-pointer px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                isDeploying || csvData.length === 0
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isDeploying ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Shield className="h-4 w-4 mr-2" />}
              {isDeploying ? "Deploying..." : "Deploy to Blockchain"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 text-green-400 mb-4">
            <FiCheck className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Certificates Successfully Deployed!</h3>
          <p className="text-slate-400 mb-6">All certificates have been successfully issued on the blockchain.</p>
          <button
            onClick={clearData}
            className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Batch
          </button>
        </div>
      )}
    </motion.div>
  );
}