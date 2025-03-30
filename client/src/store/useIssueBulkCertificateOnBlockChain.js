import { create } from "zustand";
import { ethers } from "ethers";
import useWalletStore from "./useWalletStore";

const CONTRACT_ADDRESS = "0x666999C9667A4f63664149Be568Fe7c978C5dDF2";

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
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string[]", "name": "certificateIds", "type": "string[]" },
      { "internalType": "string[]", "name": "recipientNames", "type": "string[]" },
      { "internalType": "string[]", "name": "recipientEmails", "type": "string[]" },
      { "internalType": "string[]", "name": "achievementTitles", "type": "string[]" },
      { "internalType": "string[]", "name": "issueDates", "type": "string[]" },
      { "internalType": "string[]", "name": "issuedBys", "type": "string[]" },
      { "internalType": "string[]", "name": "additionalDetailsArray", "type": "string[]" }
    ],
    "name": "issueBatchCertificates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const useBulkCertificateStore = create((set) => ({
  loading: false,
  txHash: "",
  isProcessing: false,
  isComplete: false,
  certificateData: null,
  contractOwner: "",

  setLoading: (loading) => set(() => ({ loading })),
  setTxHash: (txHash) => set(() => ({ txHash })),
  setIsProcessing: (isProcessing) => set(() => ({ isProcessing })),
  setIsComplete: (isComplete) => set(() => ({ isComplete })),
  setCertificateData: (certificateData) => set(() => ({ certificateData })),
  setContractOwner: (contractOwner) => set(() => ({ contractOwner })),

  issueBatchCertificates: async (batchData) => {
    const { account, walletConnected } = useWalletStore.getState();

    if (!walletConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    set({ loading: true, isProcessing: true, isComplete: false });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      let gasEstimate;
      try {
        gasEstimate = await contract.issueBatchCertificates.estimateGas(
          batchData.certificateIds,
          batchData.recipientNames,
          batchData.recipientEmails,
          batchData.achievementTitles,
          batchData.issueDates,
          batchData.issuedBys,
          batchData.additionalDetailsArray
        );
      } catch (error) {
        console.error("Gas estimation failed:", error);
        alert("Transaction failed during gas estimation. Please try again.");
        set({ loading: false, isProcessing: false });
        return;
      }

      const tx = await contract.issueBatchCertificates(
        batchData.certificateIds,
        batchData.recipientNames,
        batchData.recipientEmails,
        batchData.achievementTitles,
        batchData.issueDates,
        batchData.issuedBys,
        batchData.additionalDetailsArray,
        { gasLimit: gasEstimate }
      );

      await tx.wait();
      set({ txHash: tx.hash, isComplete: true });
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      alert(`Transaction failed: ${error.message || "Unknown error"}`);
    } finally {
      set({ loading: false, isProcessing: false });
    }
  },

  getCertificate: async (certificateId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const certificate = await contract.getCertificate(certificateId);
      set({ certificateData: certificate });

      return certificate;
    } catch (error) {
      console.error("Failed to fetch certificate:", error);
      alert("Error fetching certificate. Please try again.");
    }
  },

  fetchContractOwner: async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const owner = await contract.owner();
      set({ contractOwner: owner });
      return owner;
    } catch (error) {
      console.error("Failed to fetch contract owner:", error);
      alert("Error fetching contract owner.");
    }
  }
}));

export default useBulkCertificateStore;
