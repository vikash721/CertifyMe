"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ArrowRight, Check, ChevronDown, CreditCard, DollarSign, Key, Lock, Shield, Wallet, X, Bitcoin, EclipseIcon as Ethereum, Landmark, Loader, CheckCircle2, ShieldCheck, Loader2, CheckCircle  } from 'lucide-react'

import { FaApplePay, FaGooglePay, FaPaypal } from "react-icons/fa"
import { SiRipple, SiLitecoin } from "react-icons/si"
import wallets from "../web3/Wallets"; // Import the wallets component
import useWalletStore from "../../store/useWalletStore"; // Import Zustand store








export default function PaymentModal({ isOpen, onClose, amount = 199, currency = "USD", onPaymentComplete,  }) {

       



    
    const [step, setStep] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [cryptoType, setCryptoType] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [error, setError] = useState(null)
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: ""
    })


    const {
        walletConnected,
        selectedWallet,
        account,
        isConnecting,
        connectWallet,
        checkWalletStatus,
      } = useWalletStore();
    
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
    
      // Find selected wallet details
      const selectedWalletDetails = wallets.find(wallet => wallet.name === selectedWallet);








    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1)
            setPaymentMethod(null)
            setCryptoType(null)
            setIsProcessing(false)
            setIsComplete(false)
            setError(null)
        }
    }, [isOpen])

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method)
        setStep(2)
    }

    const handleCryptoSelect = (crypto) => {
        setCryptoType(crypto)
        setStep(3)
    }

    const handleCardInputChange = (e) => {
        const { name, value } = e.target
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProcessPayment = () => {
        setIsProcessing(true)
        setError(null)

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false)

            // Simulate successful payment (95% chance)
            if (Math.random() > 0.05) {
                setIsComplete(true)
                setStep(4)
            } else {
                setError("Transaction failed. Please try again.")
            }
        }, 3000)
    }

    const handleFinish = () => {
        if (onPaymentComplete) {
            onPaymentComplete()
        }
        onClose()
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm text-white"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative p-6 border-b border-slate-700">
    <div className="flex items-center justify-between">
        {step > 1 && step < 4 && (
            <button
                onClick={() => setStep(step - 1)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
                <ChevronDown className="h-5 w-5 rotate-90" />
            </button>
        )}
        <h2 className="text-xl font-bold text-center text-white flex-1 text-center">
            {step === 1 && "Select Payment Method"}
            {step === 2 && paymentMethod === "crypto" && "Waiting For Payment"}
            {step === 2 && paymentMethod === "card" && "Enter Card Details"}
            {step === 3 && paymentMethod === "crypto" && "Complete Crypto Payment"}
            {step === 3 && paymentMethod === "card" && "Confirm Payment"}
            {step === 4 && "Payment Complete"}
        </h2>
        <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
            <X className="h-5 w-5" />
        </button>
    </div>

    {/* Payment Steps */}
    {step < 4 && (
        <div className="flex items-center justify-center mt-6">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-slate-700"} text-white font-bold`}>
                1
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? "bg-blue-600" : "bg-slate-700"}`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-slate-700"} text-white font-bold`}>
                2
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? "bg-blue-600" : "bg-slate-700"}`}></div>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? "bg-blue-600" : "bg-slate-700"} text-white font-bold`}>
                3
            </div>
        </div>
    )}
</div>




                    

                    {/* Content */}
                    <div className="p-6">
                        {/* Step 1: Payment Method Selection */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center " >
                                    <div className="text-lg font-bold text-slate-400">Total Amount:</div>
                                    <div className="text-xl font-bold">{currency} {amount.toFixed(2)}</div>
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
                        )}

                        {/* Step 2: Crypto Selection */}
                        {step === 2 && paymentMethod === "crypto" && (
                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm mb-4">
                                    Please confirm the transaction in your wallet...
                                </p>

                                <div className="grid grid-cols-1 gap-3 p-6 text-center text-slate-300">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center"
                                    >
                                        <div className="mb-4">
                                            <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
                                        </div>
                                        <h3 className="text-lg font-medium">Waiting for Payment...</h3>
                                        <p className="text-sm text-slate-400 mt-2">
                                            Complete the payment in your wallet to proceed.
                                        </p>
                                        <button 
                                        onClick={handleProcessPayment}
                                        >next</button>
                                    </motion.div>


                                </div>




                                <div className="flex items-center justify-center mt-4 text-xs text-slate-400">
                                    <Shield className="h-3 w-3 mr-1" />
                                    <span>All transactions are secure and encrypted</span>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Card Details */}
                        {step === 2 && paymentMethod === "card" && (
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-4 mb-4 relative overflow-hidden">
                                    <div className="absolute top-2 right-2 text-xs bg-slate-800/50 px-2 py-1 rounded-full flex items-center">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Secure
                                    </div>
                                    <div className="h-8 w-12 bg-slate-800/50 rounded mb-4"></div>
                                    <div className="font-mono text-lg tracking-wider mb-4">
                                        {cardDetails.number ? cardDetails.number.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-xs text-slate-300 mb-1">CARD HOLDER</div>
                                            <div className="font-medium">{cardDetails.name || 'YOUR NAME'}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-300 mb-1">EXPIRES</div>
                                            <div className="font-medium">{cardDetails.expiry || 'MM/YY'}</div>
                                        </div>
                                    </div>
                                </div>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="number"
                                                value={cardDetails.number}
                                                onChange={handleCardInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className="w-full bg-slate-700 rounded-lg pl-4 pr-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={cardDetails.name}
                                            onChange={handleCardInputChange}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={cardDetails.expiry}
                                                onChange={handleCardInputChange}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">CVC</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="cvc"
                                                    value={cardDetails.cvc}
                                                    onChange={handleCardInputChange}
                                                    placeholder="123"
                                                    maxLength={4}
                                                    className="w-full bg-slate-700 rounded-lg pl-4 pr-10 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <div className="absolute right-3 top-2.5 text-xs bg-slate-600 px-1 rounded">
                                                    CVV
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="flex items-center mt-4 text-xs text-slate-400">
                                    <Lock className="h-3 w-3 mr-1" />
                                    <span>Your card information is encrypted with 256-bit SSL</span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors mt-4 flex items-center justify-center"
                                    onClick={() => setStep(3)}
                                >
                                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                                    
                                </motion.button>
                                
                            </div>
                        )}

                      
                       






                        {/* Step 3: Card Payment Confirmation */}
                        {step === 3 && paymentMethod === "card" && (
                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h3 className="font-medium mb-3">Payment Summary</h3>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Subscription Plan:</span>
                                            <span>Premium Certificate Package</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Billing Period:</span>
                                            <span>Annual</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Payment Method:</span>
                                            <span>Credit Card (**** {cardDetails.number.slice(-4) || '1234'})</span>
                                        </div>
                                        <div className="border-t border-slate-700 my-2 pt-2"></div>
                                        <div className="flex justify-between font-medium">
                                        <span className="">Total Amount:</span>

                                            <span>{currency} {amount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-700 text-blue-400 rounded-lg p-3 flex items-start">
                                    <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                                    <span>Your payment information is protected with bank-level security and encryption.</span>
                                </div>

                                {error && (
                                    <div className="bg-red-900/20 border border-red-700 text-red-400 rounded-lg p-3 flex items-start">
                                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 mt-2">
                                    <Lock className="h-3 w-3" />
                                    <span>This payment is secured with 256-bit encryption</span>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${isProcessing ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                                            }`}
                                        onClick={handleProcessPayment}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader className="animate-spin h-4 w-4 mr-2" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Confirm Payment <Check className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Payment Complete */}
                        {step === 4 && (
                            <div className="text-center py-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                    className="mb-6 "
                                >
                                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-600/20 text-green-400 mb-4">
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                                    <p className="text-slate-400 mb-4">
                                        Your payment of {currency} {amount.toFixed(2)} has been processed successfully.
                                    </p>
                                    <div className="bg-slate-700 rounded-lg p-3 mb-4 inline-block">
                                        <p className="text-sm font-mono">Transaction ID: TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                                    </div>
                                    <p className="text-sm text-slate-400">
                                        A receipt has been sent to your email address.
                                    </p>
                                </motion.div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                    onClick={handleFinish}
                                >
                                    Continue
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {step < 4 && (
                        <div className="p-4 border-t border-slate-700 flex items-center justify-center">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center text-xs text-slate-400">
                                    <Shield className="h-3 w-3 mr-1" />
                                    <span>Secure</span>
                                </div>
                                <div className="flex items-center text-xs text-slate-400">
                                    <Lock className="h-3 w-3 mr-1" />
                                    <span>Encrypted</span>
                                </div>
                                <div className="flex items-center text-xs text-slate-400">
                                    <Landmark className="h-3 w-3 mr-1" />
                                    <span>PCI Compliant</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

