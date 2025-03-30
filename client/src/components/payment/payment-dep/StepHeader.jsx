import { ChevronDown, X } from 'lucide-react';

const StepHeader = ({ step, setStep, onClose }) => (
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
            <h2 className="text-xl font-bold text-white flex-1 text-center">
                {step === 1 && "Select Payment Method"}
                {step === 2 && "Enter Payment Details"}
                {step === 3 && "Complete Payment"}
                {step === 4 && "Payment Complete"}
            </h2>
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    </div>
);

export default StepHeader;