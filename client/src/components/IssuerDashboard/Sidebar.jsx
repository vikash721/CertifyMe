"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  LayoutDashboard,
  Plus,
  FileText,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  return (
    <aside className={`bg-slate-800 fixed inset-y-0 z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? "left-0" : "-left-64"} lg:left-0 w-64 border-r border-slate-700`}>
      <div className="p-4 flex items-center border-b border-slate-700">
        <span className="ml-2 text-xl font-bold ">CertifyMe</span>
        <button className="cursor-pointer ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="font-bold">VK</span>
          </div>
          <div className="ml-3">
            <p className="font-medium">Vikash Kumar</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
        <nav className="space-y-1">
          <Link
            to="overview"
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "overview" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="generate"
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "generate" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            onClick={() => setActiveTab("generate")}
          >
            <Plus className="h-5 w-5 mr-3" />
            Generate Certificate
          </Link>
          <Link
            to="certificates"
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "certificates" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            onClick={() => setActiveTab("certificates")}
          >
            <FileText className="h-5 w-5 mr-3" />
            Certificates
          </Link>



          <Link
            to="templates"
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "templates" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            onClick={() => setActiveTab("templates")}
          >
            <Image className="h-5 w-5 mr-3" />
            Templates
          </Link>



          <Link
            to="settings"
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab === "settings" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>




          



          
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <button className="cursor-pointer flex items-center w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}