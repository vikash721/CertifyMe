import { useState, useEffect  } from "react";
import { Wallet, X, CheckCircle, Copy, Check, Loader } from "lucide-react";
import { motion } from "framer-motion";
import useWalletStore from "../../store/useWalletStore";
import wallets from "./Wallets"; // Assuming you have a wallets.js file with wallet data

export default function ConnectWallet() {
  const {
    walletConnected,
    selectedWallet,
    account,
    balance,
    network,
    isConnecting,
    connectWallet,
    
    checkWalletStatus,
  } = useWalletStore();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

// Run checkWalletStatus on mount to detect changes
useEffect(() => {
  checkWalletStatus();
}, []);



  return (
    <>
      {/* Connect Wallet Button */}
      <button
        onClick={() => setWalletModalOpen(true)}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg hover:scale-102 transition-all"
      >
        <Wallet className="h-5 w-5" />
        {walletConnected ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>

      {/* Modal */}
      {walletModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl z-50"
          onClick={() => setWalletModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-slate-900/80 text-white p-8 rounded-2xl shadow-2xl w-[500px] max-w-full backdrop-blur-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-200">Connect Wallet</h2>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="hover:bg-slate-700 p-2 rounded-lg transition cursor-pointer"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Show "Connecting..." Screen */}
            {isConnecting ? (
              <div className="flex flex-col items-center gap-4">
                <Loader className="animate-spin w-10 h-10 text-blue-500" />
                <p className="text-lg text-gray-300 font-medium">Connecting to {selectedWallet}...</p>
              </div>
            ) : walletConnected ? (
              <div className="flex flex-col items-center gap-6">
                {/* Connected Wallet Box */}
                <div className="bg-slate-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center backdrop-blur-xl w-full max-w-xs">
                  <div className="bg-white/10 p-3 rounded-full mb-4 flex items-center justify-center shadow-md">
                    <img
                      src={wallets.find((w) => w.name === selectedWallet)?.logo}
                      alt={selectedWallet}
                      className="h-14 w-14"
                    />
                  </div>
                  <span className="text-xl font-semibold text-gray-200">{selectedWallet}</span>

                  <div className="bg-slate-900/50 p-3 rounded-xl w-50 text-center mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Address:</span>
                      <p className="text-gray-300 text-sm font-medium truncate max-w-[150px]">
                        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connecting..."}
                      </p>
                    </div>
                    <button onClick={handleCopy} className="focus:outline-none">
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400 transition" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white transition cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between w-2/3 mt-3 px-4 text-gray-300 text-sm">
                    <div className="text-center">
                      <span className="text-gray-400 block text-xs">Network</span>
                      <span className="font-medium">{network}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400 block text-xs">Balance</span>
                      <span className="font-medium">{parseFloat(balance).toFixed(4)} ETH</span>
                    </div>
                  </div>

                  {/* Connected Status */}
                  <div className="flex items-center gap-3 mt-4">
                    <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {wallets.map((wallet, index) => (
                  <button
                    key={index}
                    onClick={() => connectWallet(wallet)}
                    className="cursor-pointer group flex flex-col items-center justify-center bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition w-full shadow-lg border border-gray-700"
                  >
                    <img
                      src={wallet.logo}
                      alt={wallet.name}
                      className="h-12 w-12 transition group-hover:scale-110 cursor-pointer"
                    />
                    <span className="mt-2 text-sm font-medium text-gray-300">{wallet.name}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}





