"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { ethers } from "ethers"


export default function BlockchainIssueModal({ isOpen, onClose, formData }) {



// Your smart contract details
const CONTRACT_ADDRESS = "0x60dD3Cb0fc1C3462D9bAaC69c7c4f52C2fb13397"

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "certificateId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "recipientName", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "achievementTitle", "type": "string" }
    ],
    "name": "CertificateIssued",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "certificateId", "type": "string" }],
    "name": "getCertificate",
    "outputs": [
      { "internalType": "string", "name": "recipientName", "type": "string" },
      { "internalType": "string", "name": "recipientEmail", "type": "string" },
      { "internalType": "string", "name": "achievementTitle", "type": "string" },
      { "internalType": "string", "name": "issueDate", "type": "string" },
      { "internalType": "string", "name": "issuedBy", "type": "string" },
      { "internalType": "string", "name": "additionalDetails", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "certificateId", "type": "string" },
      { "internalType": "string", "name": "recipientName", "type": "string" },
      { "internalType": "string", "name": "recipientEmail", "type": "string" },
      { "internalType": "string", "name": "achievementTitle", "type": "string" },
      { "internalType": "string", "name": "issueDate", "type": "string" },
      { "internalType": "string", "name": "issuedBy", "type": "string" },
      { "internalType": "string", "name": "additionalDetails", "type": "string" }
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];






  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState("MetaMask")
  const [balance, setBalance] = useState("")
  const [network, setNetwork] = useState("")

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const balance = ethers.formatEther(await provider.getBalance(address))
        const network = await provider.getNetwork()
        setWalletAddress(address)
        setBalance(balance)
        setNetwork(network.name)
        setWalletConnected(true)
      } else {
        alert("MetaMask is not installed. Please install MetaMask!")
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
      if (error.message) {
        alert(`Failed to connect wallet: ${error.message}`)
      } else {
        alert("Failed to connect wallet. Check the console for details.")
      }
    }
  }

  // Issue certificate on blockchain
  const issueCertificate = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
  
    setLoading(true);
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      const gasEstimate = await contract.issueCertificate.estimateGas(
        formData.certificateId,
        
        formData.recipientName,
        formData.recipientEmail,
        formData.achievementTitle,
        formData.issueDate,
        formData.issuedBy,
        formData.additionalDetails
      );
  
      const tx = await contract.issueCertificate(
        formData.certificateId,
        formData.recipientName,
        formData.recipientEmail,
        formData.achievementTitle,
        formData.issueDate,
        formData.issuedBy,
        formData.additionalDetails,
        { gasLimit: gasEstimate }
      );
  
      await tx.wait();
      setTxHash(tx.hash);
  
      alert("Certificate issued successfully on the blockchain!");
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      if (error.data && error.data.message) {
        alert(`Transaction failed: ${error.data.message}`);
      } else if (error.message) {
        alert(`Transaction failed: ${error.message}`);
      } else {
        alert("Transaction failed. Please check the console for details.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Issue Certificate on Blockchain</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="mb-4 text-green-600 text-sm">
            Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        )}

        <p className="text-gray-600 mb-4">
          Are you sure you want to issue this certificate on the blockchain? This action is irreversible.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={issueCertificate}
            disabled={!walletConnected || loading}
            className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Processing..." : "Deploy on Chain"}
          </button>
        </div>

        {txHash && (
          <div className="mt-4 text-sm text-gray-500">
            Transaction Hash:{" "}
            <a
              href={`https://sepolia.etherscan.io/address/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {txHash.slice(0, 10)}...{txHash.slice(-10)}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}