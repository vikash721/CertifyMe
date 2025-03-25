import React from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Edit, Trash, Search, FileText, Filter, Shield, Download  } from "lucide-react"

export default function DataTable({
  sortedData,
  filteredData,
  searchTerm,
  setSearchTerm,
  requestSort,
  sortConfig,
  handleRowSelect,
  handleSelectAll,
  selectedRows,
  handleDeleteSelected,
  exportToCSV,
  goBackToStep1,
  csvData,
}) {
  return (
    <>
      {/* Table Controls */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center">
            <button
              onClick={goBackToStep1}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center mr-4"
            >
              <ChevronDown className="h-4 w-4 mr-1.5 rotate-90" />
              Back
            </button>
            <h2 className="text-lg font-bold">Review Certificate Data</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${selectedRows.length === 0 ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-red-600/20 text-red-400 hover:bg-red-600/30"}`}
              >
                <Trash className="h-4 w-4 mr-1.5" />
                Delete
              </button>

              <button
                onClick={exportToCSV}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Data Summary */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400">Total Records</p>
              <p className="font-medium">{csvData.length}</p>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-purple-400" />
            <div>
              <p className="text-xs text-slate-400">Filtered Records</p>
              <p className="font-medium">{filteredData.length}</p>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg px-4 py-2 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-400" />
                      <div>
                        <p className="text-xs text-slate-400">Selected Records</p>
                        <p className="font-medium">{selectedRows.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
          
                {/* Data Table */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                          <th className="p-4 font-medium">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                                onChange={handleSelectAll}
                                className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                              />
                            </div>
                          </th>
                          <th className="p-4 font-medium">
                            <button className="flex items-center" onClick={() => requestSort("Certificate ID")}>
                              Certificate ID
                              {sortConfig.key === "Certificate ID" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="p-4 font-medium">
                            <button className="flex items-center" onClick={() => requestSort("Recipient Name")}>
                              Recipient Name
                              {sortConfig.key === "Recipient Name" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="p-4 font-medium">
                            <button className="flex items-center" onClick={() => requestSort("Recipient Email")}>
                              Recipient Email
                              {sortConfig.key === "Recipient Email" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="p-4 font-medium">
                            <button className="flex items-center" onClick={() => requestSort("Achievement Title")}>
                              Achievement Title
                              {sortConfig.key === "Achievement Title" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="p-4 font-medium">
                            <button className="flex items-center" onClick={() => requestSort("Issue Date")}>
                              Issue Date
                              {sortConfig.key === "Issue Date" &&
                                (sortConfig.direction === "ascending" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.length > 0 ? (
                          filteredData.map((row, index) => (
                            <motion.tr
                              key={row.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                              className={`border-t border-slate-700 ${selectedRows.includes(row.id) ? "bg-blue-900/10" : ""}`}
                            >
                              <td className="p-4">
                                <input
                                  type="checkbox"
                                  checked={selectedRows.includes(row.id)}
                                  onChange={() => handleRowSelect(row.id)}
                                  className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                                />
                              </td>
                              <td className="p-4 font-mono text-sm">{row["Certificate ID"]}</td>
                              <td className="p-4">{row["Recipient Name"]}</td>
                              <td className="p-4 text-slate-300">{row["Recipient Email"]}</td>
                              <td className="p-4">{row["Achievement Title"]}</td>
                              <td className="p-4 text-slate-300">{row["Issue Date"]}</td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <button className="text-slate-400 hover:text-white transition-colors">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="text-slate-400 hover:text-white transition-colors">
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-400">
                              No records found. Try adjusting your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )
          }