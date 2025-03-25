"use client"

import {Download,} from "lucide-react"
  import { FiCheck, FiCopy, FiEye } from "react-icons/fi"

export default function CertificateTable({ recentCertificates }) {
  return (
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
  )
}