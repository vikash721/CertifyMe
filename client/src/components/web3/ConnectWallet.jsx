"use client"

import { useState, useEffect } from "react"
import { Wallet, X, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { ethers } from "ethers"

export default function ConnectWallet() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState("")
  const [network, setNetwork] = useState("")

  const connectWallet = async (wallet) => {
    try {
      if (wallet.name === "MetaMask") {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum)
          await window.ethereum.request({ method: "eth_requestAccounts" })
          const signer = await provider.getSigner()
          const address = await signer.getAddress()
          const balance = ethers.formatEther(await provider.getBalance(address))
          const network = await provider.getNetwork()
          setAccount(address)
          setBalance(balance)
          setNetwork(network.name)
          setWalletConnected(true)
          setSelectedWallet(wallet.name)
        } else {
          alert("MetaMask is not installed. Please install it to connect.")
        }
      } else {
        alert(`${wallet.name} integration is not implemented yet.`)
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setSelectedWallet(null)
    setAccount("")
    setBalance("")
    setNetwork("")
  }

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

            {/* Wallet Options */}
            {walletConnected ? (
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
                
                {/* Account Info */}
                <div className="bg-slate-900/50 p-3 rounded-xl w-full text-center mt-3">
                  <span className="text-sm text-gray-400">Address:</span>
                  <p className="text-gray-300 text-sm font-medium truncate">{account}</p>
                </div>
            
                <div className="flex justify-between w-full mt-3 px-4 text-gray-300 text-sm">
                  <div className="text-center">
                    <span className="text-gray-400 block text-xs">Network</span>
                    <span className="font-medium">{network}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-400 block text-xs">Balance</span>
                    <span className="font-medium">{balance} ETH</span>
                  </div>
                </div>
              </div>
            
              {/* Disconnect Button */}
              <button
                onClick={disconnectWallet}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition-transform text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg"
              >
                <LogOut className="h-5 w-5" />
                Disconnect Wallet
              </button>
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

            {/* Modal Footer */}
            {!walletConnected && (
              <p className="text-center text-sm text-gray-400 mt-6">
                Securely connect your wallet to access Web3 features.
              </p>
            )}
          </motion.div>
        </div>
      )}
    </>
  )
}

// Wallets Data
const wallets = [
  {
    name: "MetaMask",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
  },
  {
    name: "WalletConnect",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Walletconnect-logo.png",
  },
  {
    name: "Coinbase",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-coinbase-logo-icon-download-in-svg-png-gif-file-formats--web-crypro-trading-platform-logos-pack-icons-7651204.png",
  },
  {
    name: "Phantom",
    logo: "https://coinlaunch.space/media/images/4/8/5/0/4850.sp3ow1.192x192.png",
  },
  {
    name: "Trust Wallet",
    logo: "https://prod-coin360-cms.s3.eu-central-1.amazonaws.com/trust_wallet_be242a9284.png",
  },
  {
    name: "Rainbow",
    logo: "https://i.seadn.io/gae/lZYUnT5ScSexhzmMXAnle113cqedspXI_D7ICaEv0D374b21_FFG2_-FLGR0OMf1XhgILgpGXFjlAGdZtIFoi6CVrZjMl-qgNLLtBA?auto=format&dpr=1&w=1000",
  },
]