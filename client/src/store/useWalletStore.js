import { create } from "zustand";
import { ethers } from "ethers";

const useWalletStore = create((set) => ({
  walletConnected: localStorage.getItem("walletConnected") === "true" || false,
  selectedWallet: localStorage.getItem("selectedWallet") || null,
  account: localStorage.getItem("account") || "",
  balance: localStorage.getItem("balance") || "",
  network: localStorage.getItem("network") || "",
  isConnecting: false,

  connectWallet: async (wallet) => {
    try {
      set({ isConnecting: true, selectedWallet: wallet.name });

      if (wallet.name === "MetaMask") {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = ethers.formatEther(await provider.getBalance(address));
          const network = await provider.getNetwork();

          // Store in Zustand & localStorage
          set({
            walletConnected: true,
            account: address,
            balance: balance,
            network: network.name,
            isConnecting: false,
          });

          localStorage.setItem("walletConnected", "true");
          localStorage.setItem("selectedWallet", wallet.name);
          localStorage.setItem("account", address);
          localStorage.setItem("balance", balance);
          localStorage.setItem("network", network.name);
        } else {
          alert("MetaMask is not installed. Please install it.");
          set({ isConnecting: false });
        }
      } else {
        alert(`${wallet.name} integration is not implemented yet.`);
        set({ isConnecting: false });
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      set({ isConnecting: false });
    }
  },

  disconnectWallet: () => {
    set({
      walletConnected: false,
      selectedWallet: null,
      account: "",
      balance: "",
      network: "",
      isConnecting: false,
    });

    localStorage.removeItem("walletConnected");
    localStorage.removeItem("selectedWallet");
    localStorage.removeItem("account");
    localStorage.removeItem("balance");
    localStorage.removeItem("network");
  },

  checkWalletStatus: async () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
          useWalletStore.getState().disconnectWallet(); // Disconnect if no accounts
        } else {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = ethers.formatEther(await provider.getBalance(accounts[0]));
          set({
            account: accounts[0],
            balance: balance,
          });

          localStorage.setItem("account", accounts[0]);
          localStorage.setItem("balance", balance);
        }
      });

      window.ethereum.on("disconnect", () => {
        useWalletStore.getState().disconnectWallet(); // Handle wallet disconnect
      });
    }
  },
}));

export default useWalletStore;
