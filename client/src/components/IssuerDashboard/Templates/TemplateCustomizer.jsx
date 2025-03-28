import React from 'react'

import { useState } from "react"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  Eye,
  Hexagon,
  Save,
  Trash,
  Upload,
} from "lucide-react"








export default function TemplateCustomizer({
    template,
    settings,
    onClose,
    onColorChange,
    onToggleSetting,
    onFontChange,
    onLogoPositionChange,
    isNew,
  }) {
    const [activeTab, setActiveTab] = useState("design")
    const [templateName, setTemplateName] = useState(template.name)
    const [templateDescription, setTemplateDescription] = useState(template.description)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
  
    const handleSave = () => {
      setIsSaving(true)
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false)
        setSaveSuccess(true)
        setTimeout(() => {
          setSaveSuccess(false)
        }, 2000)
      }, 1500)
    }
  
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{isNew ? "Create New Template" : "Customize Template"}</h1>
              <p className="text-slate-400">
                {isNew ? "Design your custom certificate template" : `Editing "${template.name}" template`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <span className="text-green-400 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                Saved!
              </span>
            )}
            <button
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                isSaving ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-slate-400 border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </>
              )}
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-lg font-bold">Template Preview</h2>
              <div className="flex items-center space-x-2">
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6 flex justify-center items-center bg-slate-900 min-h-[500px]">
              {/* Certificate Preview */}
              <div
                className={`relative w-full max-w-2xl aspect-[1.4/1] rounded-xl p-8 text-white shadow-lg ${settings.showBorder ? "border-8 border-white/10" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                  fontFamily: settings.fontFamily,
                }}
              >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {settings.showWatermark && (
                    <>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute opacity-10"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${0.5 + Math.random() * 1.5}) rotate(${Math.random() * 360}deg)`,
                          }}
                        >
                         
                        </div>
                      ))}
                    </>
                  )}
                </div>
  
                <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
                  {/* Header */}
                  <div>
                    {settings.showLogo && settings.logoPosition === "top" && (
                      <div className="flex items-center justify-center mb-2">
                        <Hexagon className="h-8 w-8 mr-2" />
                        <h1 className="text-2xl font-bold">CertChain</h1>
                      </div>
                    )}
                    <p className="text-sm opacity-80">Blockchain-Verified Certificate of Completion</p>
                  </div>
  
                  {/* Content */}
                  <div className="my-6">
                    <h2
                      className={`text-4xl mb-2 ${settings.fontFamily === "serif" ? "font-serif" : settings.fontFamily === "mono" ? "font-mono" : "font-sans"}`}
                    >
                      Certificate of Achievement
                    </h2>
                    <p className="text-lg mb-4">This certifies that</p>
                    <p className="text-3xl font-bold mb-4">John Doe</p>
                    <p className="text-lg mb-4">has successfully completed the course</p>
                    <p className="text-2xl font-bold mb-6">Blockchain Development</p>
                    <p className="text-sm opacity-80">Completed with distinction (95% score)</p>
                  </div>
  
                  {/* Footer */}
                  <div className="grid grid-cols-3 w-full text-sm">
                    <div>
                      <p className="font-bold">Issue Date</p>
                      <p>2023-12-15</p>
                    </div>
                    <div>
                      <p className="font-bold">Certificate ID</p>
                      <p className="font-mono">CERT-8A72E5F9</p>
                    </div>
                    <div className="relative">
                      <p className="font-bold">Expiry Date</p>
                      <p>2025-12-15</p>
  
                      {/* QR Code */}
                      {settings.showQrCode && (
                        <div className="absolute bottom-0 right-0 h-16 w-16 bg-white rounded-md p-1">
                          <div className="h-full w-full bg-slate-900 rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
  
                  {/* Logo at bottom */}
                  {settings.showLogo && settings.logoPosition === "bottom" && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center mt-4">
                      <Hexagon className="h-5 w-5 mr-1" />
                      <span className="text-sm font-bold">CertChain</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Settings Panel */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold">Template Settings</h2>
            </div>
  
            <div className="p-4 border-b border-slate-700">
              <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
                <button
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "design" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setActiveTab("design")}
                >
                  Design
                </button>
                <button
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "content" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setActiveTab("content")}
                >
                  Content
                </button>
                <button
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  Settings
                </button>
              </div>
            </div>
  
            <div className="p-6 overflow-y-auto max-h-[600px]">
              {activeTab === "design" && (
                <div className="space-y-6">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Colors</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Primary Color</label>
                        <div className="flex items-center">
                          <div
                            className="h-10 w-10 rounded-lg mr-3 border border-slate-600"
                            style={{ backgroundColor: settings.primaryColor }}
                          ></div>
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) => onColorChange("primaryColor", e.target.value)}
                            className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                          />
                          <input
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => onColorChange("primaryColor", e.target.value)}
                            className="h-10 w-10 opacity-0 absolute right-0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Secondary Color</label>
                        <div className="flex items-center">
                          <div
                            className="h-10 w-10 rounded-lg mr-3 border border-slate-600"
                            style={{ backgroundColor: settings.secondaryColor }}
                          ></div>
                          <input
                            type="text"
                            value={settings.secondaryColor}
                            onChange={(e) => onColorChange("secondaryColor", e.target.value)}
                            className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                          />
                          <input
                            type="color"
                            value={settings.secondaryColor}
                            onChange={(e) => onColorChange("secondaryColor", e.target.value)}
                            className="h-10 w-10 opacity-0 absolute right-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
  
                  {/* Typography */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Typography</h3>
                    <label className="block text-xs text-slate-400 mb-2">Font Family</label>
                    <div className="relative">
                      <select
                        value={settings.fontFamily}
                        onChange={(e) => onFontChange(e.target.value)}
                        className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none"
                      >
                        <option value="sans">Sans-serif</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Monospace</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
  
                  {/* Elements */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Elements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show Border</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle-border"
                            className="sr-only peer"
                            checked={settings.showBorder}
                            onChange={() => onToggleSetting("showBorder")}
                          />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show Watermark</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle-watermark"
                            className="sr-only peer"
                            checked={settings.showWatermark}
                            onChange={() => onToggleSetting("showWatermark")}
                          />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show QR Code</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle-qr"
                            className="sr-only peer"
                            checked={settings.showQrCode}
                            onChange={() => onToggleSetting("showQrCode")}
                          />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show Logo</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle-logo"
                            className="sr-only peer"
                            checked={settings.showLogo}
                            onChange={() => onToggleSetting("showLogo")}
                          />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
  
                      {settings.showLogo && (
                        <div className="mt-3">
                          <label className="block text-xs text-slate-400 mb-2">Logo Position</label>
                          <div className="relative">
                            <select
                              value={settings.logoPosition}
                              onChange={(e) => onLogoPositionChange(e.target.value)}
                              className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none"
                            >
                              <option value="top">Top</option>
                              <option value="bottom">Bottom</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === "content" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Template Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Template Name</label>
                        <input
                          type="text"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Description</label>
                        <textarea
                          value={templateDescription}
                          onChange={(e) => setTemplateDescription(e.target.value)}
                          rows={3}
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        ></textarea>
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Certificate Text</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Title</label>
                        <input
                          type="text"
                          defaultValue="Certificate of Achievement"
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Subtitle</label>
                        <input
                          type="text"
                          defaultValue="Blockchain-Verified Certificate of Completion"
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Recipient Text</label>
                        <input
                          type="text"
                          defaultValue="This certifies that"
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Course Text</label>
                        <input
                          type="text"
                          defaultValue="has successfully completed the course"
                          className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Custom Logo</h3>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-slate-500 mb-2" />
                      <p className="text-sm mb-1">Drag and drop your logo here</p>
                      <p className="text-xs text-slate-400">or click to browse</p>
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Template Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Set as Default</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-default" className="sr-only peer" />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Featured Template</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="toggle-featured"
                            className="sr-only peer"
                            defaultChecked={template.featured}
                          />
                          <div className="h-4 w-10 bg-slate-600 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute w-6 h-6 bg-white rounded-full -left-1 -top-1 transition-all transform peer-checked:translate-x-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Access Control</h3>
                    <div className="relative">
                      <select
                        className="bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none"
                        defaultValue="private"
                      >
                        <option value="private">Private - Only you can use this template</option>
                        <option value="team">Team - Available to your organization</option>
                        <option value="public">Public - Available to all users</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
  
                  {!isNew && (
                    <div>
                      <h3 className="text-sm font-medium mb-3 text-red-400">Danger Zone</h3>
                      <div className="space-y-3">
                        <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate Template
                        </button>
                        <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Template
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

