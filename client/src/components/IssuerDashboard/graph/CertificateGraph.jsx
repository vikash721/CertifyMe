import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

const data = [
  { name: 'Week 1', Certificates: 40 },
  { name: 'Week 2', Certificates: 55 },
  { name: 'Week 3', Certificates: 78 },
  { name: 'Week 4', Certificates: 90 },
];

export default function CertificateGraph() {
  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-lg font-bold">Certificate Issuance</h2>
        <p className="text-sm text-slate-400">Last 30 days</p>
      </div>
      <div className="p-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155" }} />
            <Legend />
            <Bar dataKey="Certificates" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}