import React from "react"
import { motion } from "framer-motion"
import { Loader, Shield, FileText, Plus, ChevronDown } from "lucide-react"
import { FiCheck } from "react-icons/fi"

export default function Deployment({
  handleDeployToBlockchain,
  isDeploying,
  deploymentSuccess,
  clearData,
  csvData,
  goBackToStep2
}) {
  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {deploymentSuccess ? (
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 text-green-400 mb-4">
            <FiCheck className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Certificates Successfully Deployed!</h3>
          <p className="text-slate-400 mb-6">All certificates have been successfully issued on the blockchain</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={clearData}
              className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Batch
            </button>
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              View All Certificates
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <button
              onClick={goBackToStep2}
              className=" cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center mr-4"
            >
              <ChevronDown className="h-4 w-4 mr-1.5 rotate-90" />
              Back
            </button>
            <h2 className="cursor-pointer text-lg font-bold">Review Certificate Data</h2>
          </div>
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-lg bg-blue-600/20 flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Deploy to Blockchain</h3>
              <p className="text-sm text-slate-400">
                Issue all certificates on the blockchain for permanent verification
              </p>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="bg-blue-600/20 rounded-full p-1 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Ready to Deploy</p>
                <p className="text-sm text-slate-400">
                  {csvData.length} certificates will be issued on the blockchain. This action cannot be undone.
                </p>
              </div>
            </div>
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
              {isDeploying ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Deploy to Blockchain
                </>
              )}
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}