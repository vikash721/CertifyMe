"use client";

import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  FileText,
  Image,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active tab based on the current URL
  const activeTab = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-slate-800 fixed inset-y-0 z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? "left-0" : "-left-64"
        } lg:left-0 w-64 border-r border-slate-700`}
    >
      <div className="p-4 flex items-center border-b border-slate-700">
        <span className="ml-2 text-xl font-bold">CertifyMe</span>
        <button
          className="cursor-pointer ml-auto lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
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
          <button
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab("/issuer-dashboard")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
              }`}
            onClick={() => navigate("/issuer-dashboard")}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab("/issuer-dashboard/generate-certificate")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
              }`}
            onClick={() => navigate("/issuer-dashboard/generate-certificate")}
          >
            <Plus className="h-5 w-5 mr-3" />
            Generate Certificate
          </button>
          <button
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab("/issuer-dashboard/certificates")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
              }`}
            onClick={() => navigate("/issuer-dashboard/certificates")}
          >
            <FileText className="h-5 w-5 mr-3" />
            Certificates
          </button>
          <button
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab("/issuer-dashboard/templates")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
              }`}
            onClick={() => navigate("/issuer-dashboard/templates")}
          >
            <Image className="h-5 w-5 mr-3" />
            Templates
          </button>
          <button
            className={`cursor-pointer flex items-center w-full px-3 py-2 rounded-lg transition-colors ${activeTab("/issuer-dashboard/settings")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
              }`}
            onClick={() => navigate("/issuer-dashboard/settings")}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <button className="cursor-pointer flex items-center w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}