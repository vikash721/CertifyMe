"use client"

import { motion } from "framer-motion"
import {

    RefreshCcw,
  
  } from "lucide-react"
  import { FiCheck, FiCopy, FiEye } from "react-icons/fi"
import BatchUpload from "../csv-parser/BatchUpload"

export default function BatchCertificateGnerate({ formData, setFormData, setPreviewMode }) {
  

  return (
    <motion.div
      className="bg-slate-800 rounded-xl border border-slate-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-slate-700 text-white">
       <h1 className="text-xl font-bold text-white">Batch Certificate Generation</h1>
        <p className="text-slate-400 text-sm">Upload a CSV file to generate multiple certificates at once</p>
      </div>
      <div className="p-6">
     <BatchUpload/>
      </div>
    </motion.div>
  )
}