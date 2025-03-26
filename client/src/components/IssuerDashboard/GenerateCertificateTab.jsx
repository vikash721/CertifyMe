"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Hexagon, Shield, X } from "lucide-react"

import GenerateCertificateForm from "./GenerateCertificateForm"
import TemplateSelector from "./TemplateSelector"
import BatchCertificateGenerate from "./BatchCertificateGeneration"
import BlockchainIssueModal from "../web3/BlockchainIssueModal" // Import the modal

export default function GenerateCertificateTab({ previewMode, setPreviewMode, formData, setFormData, templates, selectedTemplate, setSelectedTemplate }) {
  const [formType, setFormType] = useState("single") // Track form type
  const [isModalOpen, setIsModalOpen] = useState(false) // State to control modal visibility

  const handleIssueCertificate = () => {
    setIsModalOpen(true) // Open modal when clicking "Issue on Blockchain"
  }

  const handleConfirmIssue = () => {
    setIsModalOpen(false)
    // Add blockchain issuing logic here
    alert("Certificate issued on blockchain!") // Replace with actual blockchain integration
  }

  return (
    <div className="space-y-6">
      {previewMode ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Certificate Preview</h2>
            <button onClick={() => setPreviewMode(false)} className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
              <X className="h-4 w-4 mr-2" />
              Close Preview
            </button>
          </div>

          <div className="flex justify-center">
            <div
              className={`relative w-full max-w-2xl aspect-[1.4/1] bg-gradient-to-r ${
                selectedTemplate === 1
                  ? "from-blue-900 to-blue-700"
                  : selectedTemplate === 2
                    ? "from-purple-900 to-purple-700"
                    : selectedTemplate === 3
                      ? "from-teal-900 to-teal-700"
                      : "from-amber-900 to-amber-700"
              } rounded-xl p-8 text-white shadow-lg`}
            >
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-40 w-40 rounded-full bg-white "
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0.1 + Math.random() * 0.3,
                      transform: `scale(${0.5 + Math.random() * 1.5})`,
                    }}
                  />
                ))}
              </div>

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

          <div className="mt-6 flex justify-center space-x-4">
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center z-30">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </button>



            <button
              onClick={handleIssueCertificate}
              formData={formData}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center z-30"
            >
              <Shield className="h-4 w-4 mr-2" />
              Issue on Blockchain
            </button>



            
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {formType === "single" ? (
              <GenerateCertificateForm formData={formData} setFormData={setFormData} setPreviewMode={setPreviewMode} />
            ) : (
              <BatchCertificateGenerate formData={formData} setFormData={setFormData} />
            )}
          </div>
          <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} setFormType={setFormType} />
        </div>
      )}

      {/* Blockchain Issue Modal */}
      <BlockchainIssueModal
      formData={formData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmIssue}
      />
    </div>
  )
}
