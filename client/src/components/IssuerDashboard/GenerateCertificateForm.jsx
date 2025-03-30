"use client"

import { motion } from "framer-motion"
import {

  RefreshCcw,

} from "lucide-react"
import { FiCheck, FiCopy, FiEye } from "react-icons/fi"

export default function GenerateCertificateForm({ formData, setFormData, setPreviewMode }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-lg font-bold">Certificate Information</h2>
        <p className="text-sm text-slate-400">Enter the details for the new certificate</p>
      </div>
      <div className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Recipient Email</label>
              <input
                type="email"
                name="recipientEmail"
                value={formData.recipientEmail}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Course/Achievement Title</label>
            <input
              type="text"
              name="achievementTitle"
              value={formData.achievementTitle}
              onChange={handleInputChange}
              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Issued By</label>
              <input
                type="text"
                name="issuedBy"
                value={formData.issuedBy}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Certificate ID</label>
            <div className="flex">
              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleInputChange}
                className="w-full bg-slate-700 rounded-l-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                readOnly
              />
              <button
                type="button"
                className="cursor-pointerv bg-slate-600 hover:bg-slate-500 px-4 rounded-r-lg flex items-center justify-center transition-colors"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    certificateId: "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
                  }))
                }
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">Auto-generated unique identifier</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer"
            >
              <FiEye className="cursor-pointer h-4 w-4 mr-2" />
              Preview Certificate
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}