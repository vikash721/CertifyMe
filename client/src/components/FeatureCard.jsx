import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      className="bg-slate-800/50 p-8 rounded-xl border border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-14 w-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}