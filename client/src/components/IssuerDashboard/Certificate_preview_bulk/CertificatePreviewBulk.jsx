"use client"

import { motion } from "framer-motion"
import { Download, Hexagon, Shield, X } from "lucide-react"

export default function CertificatePreviewBulk({ previewMode, setPreviewMode, formData, selectedTemplate, handleIssueCertificate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 rounded-xl border border-slate-700 p-6 "
    >
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-lg font-bold">Certificate Preview</h2>
        <button onClick={() => setPreviewMode(false)} className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
          <X className="h-4 w-4 mr-2" />
          Close Preview
        </button>
      </div>

      <div className="flex justify-center">
        <div
          className={`relative w-full max-w-2xl aspect-[1.4/1] bg-gradient-to-r 
            ${selectedTemplate === 1 ? "from-blue-900 to-blue-700" :
              selectedTemplate === 2 ? "from-purple-900 to-purple-700" :
                selectedTemplate === 3 ? "from-teal-900 to-teal-700" :
                  "from-amber-900 to-amber-700"} 
            rounded-xl p-8 text-white shadow-lg overflow-hidden`}
        >
          {/* Background Circles */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-40 w-40 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.3,
                  transform: `scale(${0.5 + Math.random() * 1.5})`,
                }}
              />
            ))}
          </div>

          {/* Certificate Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Hexagon className="h-8 w-8 mr-2" />
                <h1 className="text-2xl font-bold">CertifyMe</h1>
              </div>
              <p className="text-sm opacity-80">Blockchain-Verified Certificate of Completion</p>
            </div>

            <div className="my-6">
              <h2 className="text-4xl font-serif mb-2">Certificate of Achievement</h2>
              <p className="text-lg mb-4">This certifies that</p>
              <p className="text-3xl font-bold mb-4">{formData.recipientName}</p>
              <p className="text-lg mb-4">has successfully completed the course</p>
              <p className="text-2xl font-bold mb-6">{formData.achievementTitle}</p>
              <p className="text-sm opacity-80">{formData.additionalDetails}</p>
            </div>

            <div className="grid grid-cols-3 w-full text-sm">
              <div>
                <p className="font-bold">Issue Date</p>
                <p>{formData.issueDate}</p>
              </div>
              <div>
                <p className="font-bold">Certificate ID</p>
                <p className="font-mono">{formData.certificateId}</p>
              </div>
              <div>
                <p className="font-bold">Issued By</p>
                <p>{formData.issuedBy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </motion.div>
    )
}