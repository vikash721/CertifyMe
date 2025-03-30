"use client"

import { motion } from "framer-motion"

import WalletPage from "./CertificateWallet"

export default function MainCertWallet() {
  

  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-slate-700 text-white">
       <h1 className="text-xl font-bold text-white">Certificate Wallet</h1>
        <p className="text-slate-400 text-sm">Manage your verified blockchain certificates</p>
      </div>
      <div className="p-6">
        <WalletPage/>
      </div>
    </motion.div>
  )
}