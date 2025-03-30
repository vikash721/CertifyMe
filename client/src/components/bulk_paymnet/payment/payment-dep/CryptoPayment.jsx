import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Shield } from 'lucide-react';

const CryptoPayment = ({ handleProcessPayment }) => {
    useEffect(() => {
        console.log("CryptoPayment component mounted, initiating payment process...");
        handleProcessPayment();
    }, [handleProcessPayment]);

    return (
        <div className="space-y-4">
            <p className="text-slate-400 text-sm mb-4">
                Payment in Progress... Please do not close or refresh the page.
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
                    <h3 className="text-lg font-medium">Processing Payment... Please wait.</h3>
                    <p className="text-sm text-slate-400 mt-2 w-65">
                        This may take a few moments. Do not close or refresh the page.
                    </p>
                </motion.div>
            </div>

            <div className="flex items-center justify-center mt-4 text-xs text-slate-400">
                <Shield className="h-3 w-3 mr-1" />
                <span>All transactions are secure and encrypted</span>
            </div>
        </div>
    );
};

export default CryptoPayment;