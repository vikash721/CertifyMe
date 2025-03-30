"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import CertificateTable from "./CertificateTable"; // Ensure this is the correct import

export default function CertificatesTab() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const certificates = []; // Replace with actual data or fetch logic

  // Filter certificates based on the search term
  const filteredCertificates = certificates.filter((certificate) =>
    certificate.recipientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-slate-800 rounded-xl border border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">All Certificates</h2>
            <p className="text-sm text-slate-400">Manage all your issued certificates</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <div className="flex gap-3">
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Certificate
              </button>
            </div>
          </div>
        </div>
        <CertificateTable recentCertificates={filteredCertificates} />
        <div className="p-4 border-t border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {filteredCertificates.length} of {certificates.length} certificates
          </p>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-lg transition-colors">
              1
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded-lg transition-colors">
              2
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded-lg transition-colors">
              3
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}