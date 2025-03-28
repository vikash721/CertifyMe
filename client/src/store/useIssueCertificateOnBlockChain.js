import { create } from "zustand";
import { ethers } from "ethers";
import useWalletStore from "./useWalletStore";

const CONTRACT_ADDRESS = "0x60dD3Cb0fc1C3462D9bAaC69c7c4f52C2fb13397";

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "certificateId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "recipientName", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "achievementTitle", "type": "string" },
    ],
    "name": "CertificateIssued",
    "type": "event",
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
      { "internalType": "string", "name": "additionalDetails", "type": "string" },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      { "internalType": "string", "name": "certificateId", "type": "string" },
      { "internalType": "string", "name": "recipientName", "type": "string" },
      { "internalType": "string", "name": "recipientEmail", "type": "string" },
      { "internalType": "string", "name": "achievementTitle", "type": "string" },
      { "internalType": "string", "name": "issueDate", "type": "string" },
      { "internalType": "string", "name": "issuedBy", "type": "string" },
      { "internalType": "string", "name": "additionalDetails", "type": "string" },
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function",
  },
];

const useCertificateStore = create((set) => ({
  loading: false,
  txHash: "",
  isProcessing: false,
  isComplete: false,

  setLoading: (loading) => set((state) => ({ ...state, loading })),
  setTxHash: (txHash) => set((state) => ({ ...state, txHash })),
  setIsProcessing: (isProcessing) => set((state) => ({ ...state, isProcessing })),
  setIsComplete: (isComplete) => set((state) => ({ ...state, isComplete })),

  issueCertificate: async (formData) => {
    const { account, walletConnected } = useWalletStore.getState();
    const {
      setLoading,
      setTxHash,
      setIsProcessing,
      setIsComplete,
    } = useCertificateStore.getState();

    if (!walletConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    setLoading(true);
    setIsProcessing(true);
    setIsComplete(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      let gasEstimate;
      try {
        gasEstimate = await contract.issueCertificate.estimateGas(
          formData.certificateId,
          formData.recipientName,
          formData.recipientEmail,
          formData.achievementTitle,
          formData.issueDate,
          formData.issuedBy,
          formData.additionalDetails
        );
      } catch (error) {
        console.error("Gas estimation failed:", error);
        alert("Transaction failed during gas estimation. Please try again.");
        setLoading(false);
        setIsProcessing(false);
        return;
      }

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
      

      setIsComplete(true);
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      alert(`Transaction failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  },
}));

export default useCertificateStore;
