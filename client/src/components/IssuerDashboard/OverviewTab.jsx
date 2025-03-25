"use client"

import { motion } from "framer-motion"
import {
    BarChart3,
    Clock,
    Download,
    FileText,
    Plus,
  
  } from "lucide-react"
  import {FiCopy, FiEye } from "react-icons/fi"












export default function OverviewTab({ stats, recentCertificates }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-lg bg-${stat.color}-600/20 flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <div className="p-6 h-64 flex items-center justify-center">
            <BarChart3 className="h-full w-full text-slate-600" />
          </div>
        </motion.div>

        <motion.div
          className="bg-slate-800 rounded-xl border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-bold">Recent Activity</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center mt-1">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      Certificate issued to {["Emma", "Michael", "Sophia", "James"][index]}
                    </p>
                    <div className="flex items-center text-xs text-slate-400 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {["2 hours", "5 hours", "1 day", "2 days"][index]} ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-slate-800 rounded-xl border border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Recent Certificates</h2>
            <p className="text-sm text-slate-400">Manage your recently issued certificates</p>
          </div>
          <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Certificate
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="p-4 font-medium">Certificate ID</th>
                <th className="p-4 font-medium">Recipient</th>
                <th className="p-4 font-medium">Course</th>
                <th className="p-4 font-medium">Issue Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCertificates.map((cert, index) => (
                <tr key={index} className="border-t border-slate-700">
                  <td className="p-4 font-mono text-sm">{cert.id}</td>
                  <td className="p-4">{cert.recipient}</td>
                  <td className="p-4">{cert.course}</td>
                  <td className="p-4 text-slate-400">{cert.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.status === "Active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="cursor-pointer text-slate-400 hover:text-white transition-colors">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button className="cursor-pointer text-slate-400 hover:text-white transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="cursor-pointer text-slate-400 hover:text-white transition-colors">
                        <FiCopy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}