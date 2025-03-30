"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wallets from "../../web3/Wallets";
import { useWallet } from "./payment-dep/walletStore";
import StepHeader from "./payment-dep/StepHeader";
import PaymentMethodSelection from "./payment-dep/PaymentMethodSelection";
import CryptoPayment from "./payment-dep/CryptoPayment";
import PaymentComplete from "./payment-dep/PaymentComplete";
import { Shield, Lock, Landmark } from "lucide-react";
import useBulkCertificateStore from "../../../store/useIssueBulkCertificateOnBlockChain";

export default function PaymentModal({ isOpen, onClose, amount = 199, currency = "USD", onPaymentComplete, csvData }) {
    const {
        walletConnected,
        selectedWallet,
        account,
        connectWallet,
        checkWalletStatus,
    } = useWallet();

    const {
        loading,
        txHash,
        issueBatchCertificates,
        setLoading,
        setIsProcessing,
        setIsComplete,
        isProcessing,
        isComplete,
    } = useBulkCertificateStore();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setPaymentMethod(null);
            setError(null);
            setIsProcessing(false);
            setIsComplete(false);
        }
    }, [isOpen]);

    const handlePaymentMethodSelect = async (method) => {
        if (method === "crypto" && !walletConnected) {
            await connectWallet(wallets[0]); // Connect to the first wallet (MetaMask)
        }
        setPaymentMethod(method);
        setStep(2);
    };

    const handleProcessPayment = async () => {
        setIsProcessing(true);
        setError(null);

        // Format CSV data into arrays
        const batchData = {
            certificateIds: csvData.map((cert) => cert["Certificate ID"]),
            recipientNames: csvData.map((cert) => cert["Recipient Name"]),
            recipientEmails: csvData.map((cert) => cert["Recipient Email"]),
            achievementTitles: csvData.map((cert) => cert["Achievement Title"]),
            issueDates: csvData.map((cert) => cert["Issue Date"]),
            issuedBys: csvData.map((cert) => cert["Issued By"]),
            additionalDetailsArray: csvData.map((cert) => cert["Details"] || ""),
        };

        try {
            console.log("Initiating transaction with MetaMask...");
            await issueBatchCertificates(batchData);
            setIsComplete(true);
        } catch (error) {
            console.error("Transaction failed:", error);
            setError("Transaction failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (isComplete) {
            setStep(4);
        }
    }, [isComplete]);

    const handleFinish = () => {
        if (onPaymentComplete) {
            onPaymentComplete();
        }
        onClose();
    };

    if (!isOpen) return null;

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
                    <StepHeader step={step} setStep={setStep} onClose={onClose} />

                    <div className="p-6">
                        {step === 1 && (
                            <PaymentMethodSelection
                                handlePaymentMethodSelect={handlePaymentMethodSelect}
                                walletConnected={walletConnected}
                                selectedWalletDetails={wallets.find(wallet => wallet.name === selectedWallet)}
                                connectWallet={connectWallet}
                                account={account}
                            />
                        )}

                        {step === 2 && paymentMethod === "crypto" && (
                            <CryptoPayment handleProcessPayment={handleProcessPayment} />
                        )}

                        {step === 4 && isComplete && (
                            <PaymentComplete handleFinish={handleFinish} currency={currency} amount={amount} txHash={txHash} />
                        )}

                        {step === 3 && error && (
                            <div className="text-center py-6">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button
                                    onClick={onClose}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>

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
    );
}