import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-blue-600 mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">Create Certificate</h3>
              <p className="text-gray-400">
                Design your certificate using our templates or upload your own design. Add recipient details and
                customize as needed.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">Issue on Blockchain</h3>
              <p className="text-gray-400">
                With one click, your certificate is hashed and recorded on the blockchain, creating a permanent,
                tamper-proof record.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 bg-teal-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">Share & Verify</h3>
              <p className="text-gray-400">
                Share the certificate with recipients. Anyone can verify its authenticity using our verification tool.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}