"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Hexagon, Shield, X } from "lucide-react";

import GenerateCertificateForm from "./GenerateCertificateForm";
import TemplateSelector from "./TemplateSelector";
import BatchCertificateGenerate from "./BatchCertificateGeneration";
import BlockchainIssueModal from "../web3/BlockchainIssueModal";
import PaymentModal from "../payment/PaymentModal";

export default function GenerateCertificateTab({
  previewMode,
  setPreviewMode,
  formData,
  setFormData,
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) {
  const [formType, setFormType] = useState("single");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIssueCertificate = () => setIsModalOpen(true);
  const handleConfirmIssue = () => {
    setIsModalOpen(false);
    alert("Certificate issued on blockchain!");
  };

  const handleGenerateDescription = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: formData.recipientName,
          achievementTitle: formData.achievementTitle,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to generate description");
      const data = await response.json();
      setFormData((prev) => ({ ...prev, additionalDetails: data.description }));
    } catch (err) {
      console.error("Error generating description:", err);
    } finally {
      setLoading(false);
    }
  };

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
            <button onClick={() => setPreviewMode(false)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center">
              <X className="h-4 w-4 mr-2" /> Close Preview
            </button>
          </div>

          <div className="flex justify-center">
            <div className={`relative w-full max-w-2xl aspect-[1.4/1] bg-gradient-to-r ${
              selectedTemplate === 1 ? "from-blue-900 to-blue-700" :
              selectedTemplate === 2 ? "from-purple-900 to-purple-700" :
              selectedTemplate === 3 ? "from-teal-900 to-teal-700" : "from-amber-900 to-amber-700"
            } rounded-xl p-8 text-white shadow-lg`}>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center mb-2">
                  <Hexagon className="h-8 w-8 mr-2" />
                  <h1 className="text-2xl font-bold">CertifyMe</h1>
                </div>
                <p className="text-sm opacity-80">Blockchain-Verified Certificate of Completion</p>
                <h2 className="text-4xl font-serif my-4">Certificate of Achievement</h2>
                <p className="text-lg">This certifies that</p>
                <p className="text-3xl font-bold my-2">{formData.recipientName}</p>
                <p className="text-lg">has successfully completed the course</p>
                <p className="text-2xl font-bold my-4">{formData.achievementTitle}</p>
                <p className="text-sm opacity-80">{formData.additionalDetails}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-2" /> Download Certificate
            </button>
            <button onClick={handleIssueCertificate} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
              <Shield className="h-4 w-4 mr-2" /> Issue on Blockchain
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

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmIssue} />

      <div className="mt-6">
        <button onClick={handleGenerateDescription} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" disabled={loading}>
          {loading ? "Generating..." : "Generate Description with AI"}
        </button>
      </div>
    </div>
  );
}
