import { motion } from "framer-motion";
import { ArrowRight, Wallet, CheckCircle, Lock } from 'lucide-react';
import { FaApplePay, FaGooglePay, FaPaypal } from "react-icons/fa";

const PaymentMethodSelection = ({ handlePaymentMethodSelect, walletConnected, selectedWalletDetails, connectWallet, account }) => (
    <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center">
            <div className="text-lg font-bold text-slate-400">Total Amount:</div>
            <div className="text-xl font-bold">USD 199.00</div>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-4">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center transition-colors relative"
                onClick={() => handlePaymentMethodSelect("crypto")}
            >
                {walletConnected && selectedWalletDetails ? (
                    <>
                        <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center mr-4">
                            <img
                                src={selectedWalletDetails.logo}
                                alt={selectedWalletDetails.name}
                                className="h-5 w-5"
                            />
                        </div>
                        <div className="flex-grow flex flex-col">
                            <div className="flex items-center">
                                <h3 className="font-medium text-white mr-2">
                                    Pay with {selectedWalletDetails.name}
                                </h3>
                                <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    Connected
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400" />
                    </>
                ) : (
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg hover:scale-102 transition-all"
                        onClick={() => connectWallet(wallets[0])}
                    >
                        <Wallet className="h-5 w-5" />
                        Connect Wallet
                    </button>
                )}
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center justify-between transition-colors"
                onClick={() => handlePaymentMethodSelect("card")}
            >
                <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                        <img src="https://i.imgur.com/MiIwELC.png" alt="Razorpay" className="h-6 w-6" />
                    </div>
                    <div className="flex-grow flex flex-col items-start">
                        <h3 className="font-medium text-white leading-tight">Pay with Razorpay</h3>
                        <p className="text-sm text-slate-400">UPI, Cards, Net Banking</p>
                    </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
            </motion.button>

            <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-700 w-full"></div>
                <div className="absolute bg-slate-800 px-2 text-xs text-slate-400">OTHER OPTIONS</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                >
                    <FaPaypal className="h-6 w-6 text-blue-400 mb-1" />
                    <span className="text-xs text-white">PayPal</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                >
                    <FaApplePay className="h-6 w-6 text-white mb-1" />
                    <span className="text-xs text-white">Apple Pay</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                >
                    <FaGooglePay className="h-6 w-6 text-white mb-1" />
                    <span className="text-xs text-white">Google Pay</span>
                </motion.button>
            </div>

            <div className="flex items-center justify-center mt-6 text-xs text-slate-400">
                <Lock className="h-3 w-3 mr-1" />
                <span>Secure, encrypted payment processing</span>
            </div>

            <div className="flex items-center justify-center space-x-3 mt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3" />
                <img src="https://pngimg.com/d/mastercard_PNG16.png" alt="Mastercard" className="h-3" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-3" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" alt="RuPay" className="h-3" />
            </div>
        </div>
    </div>
);

export default PaymentMethodSelection;