"use client"

import { Bell, Menu, Search } from "lucide-react"

export default function Header({ sidebarOpen, setSidebarOpen, activeTab }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "generate" && "Generate Certificate"}
            {activeTab === "certificates" && "Manage Certificates"}
            {activeTab === "templates" && "Certificate Templates"}
            {activeTab === "settings" && "Settings"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <button className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}