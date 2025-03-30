import { motion } from "framer-motion";
import { CheckCircle2 } from 'lucide-react';

const PaymentComplete = ({ handleFinish, currency, amount, txHash }) => (
    <div className="text-center py-6">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="mb-6"
        >
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-600/20 text-green-400 mb-4">
                <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-slate-400 mb-4">
                Your payment of {currency} {amount.toFixed(2)} has been processed successfully.
            </p>

            {/* Show Transaction Hash */}
            {txHash && (
                <div className="bg-slate-700 rounded-lg p-3 mb-4 inline-block">
                    <p className="text-sm font-mono">Transaction Hash:</p>
                    <p className="text-xs text-green-300 break-all">{txHash}</p>
                </div>
            )}

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
);

export default PaymentComplete;
