"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {

  Edit,
  Eye,
  Grid,
  Hexagon,
  ImageIcon,
  List,
  Plus,

  Search,
  Star,

} from "lucide-react"

import TemplateCustomizer from "./TemplateCustomizer"




export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [activeTab, setActiveTab] = useState("system") // system or custom
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [customizationSettings, setCustomizationSettings] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    fontFamily: "serif",
    showQrCode: true,
    showLogo: true,
    showBorder: true,
    showWatermark: true,
    logoPosition: "top",
  })

  // System templates
  const systemTemplates = [
    {
      id: 1,
      name: "Professional Blue",
      description: "A clean, professional design with blue gradient",
      colors: ["#3b82f6", "#1e40af"],
      featured: true,
      usageCount: 1284,
      dateCreated: "System Template",
    },
    {
      id: 2,
      name: "Executive Purple",
      description: "Elegant purple design for executive achievements",
      colors: ["#8b5cf6", "#6d28d9"],
      featured: false,
      usageCount: 876,
      dateCreated: "System Template",
    },
    {
      id: 3,
      name: "Modern Teal",
      description: "Contemporary teal design with geometric elements",
      colors: ["#14b8a6", "#0f766e"],
      featured: false,
      usageCount: 654,
      dateCreated: "System Template",
    },
    {
      id: 4,
      name: "Classic Gold",
      description: "Traditional gold certificate with ornate borders",
      colors: ["#f59e0b", "#b45309"],
      featured: true,
      usageCount: 1042,
      dateCreated: "System Template",
    },
    {
      id: 5,
      name: "Minimalist Black",
      description: "Clean, minimal design with black accents",
      colors: ["#1f2937", "#111827"],
      featured: false,
      usageCount: 432,
      dateCreated: "System Template",
    },
    {
      id: 6,
      name: "Vibrant Red",
      description: "Bold, energetic design with red gradient",
      colors: ["#ef4444", "#b91c1c"],
      featured: false,
      usageCount: 321,
      dateCreated: "System Template",
    },
  ]

  // User custom templates
  const customTemplates = [
    {
      id: 101,
      name: "Company Branded",
      description: "Our official company certificate template",
      colors: ["#2563eb", "#1e40af"],
      featured: true,
      usageCount: 42,
      dateCreated: "Created 2 months ago",
    },
    {
      id: 102,
      name: "Blockchain Summit 2023",
      description: "Special template for summit attendees",
      colors: ["#8b5cf6", "#7c3aed"],
      featured: false,
      usageCount: 156,
      dateCreated: "Created 3 months ago",
    },
    {
      id: 103,
      name: "Developer Certification",
      description: "Technical certification for developers",
      colors: ["#10b981", "#059669"],
      featured: false,
      usageCount: 89,
      dateCreated: "Created 1 month ago",
    },
  ]

  const allTemplates = activeTab === "system" ? systemTemplates : customTemplates

  const filteredTemplates = allTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    setIsCustomizing(true)
    // Initialize customization settings based on the template
    setCustomizationSettings({
      primaryColor: template.colors[0],
      secondaryColor: template.colors[1],
      fontFamily: "serif",
      showQrCode: true,
      showLogo: true,
      showBorder: true,
      showWatermark: true,
      logoPosition: "top",
    })
  }

  const handleCreateNewTemplate = () => {
    setIsCreatingNew(true)
    setSelectedTemplate({
      id: "new",
      name: "New Template",
      description: "My custom certificate template",
      colors: ["#3b82f6", "#1e40af"],
      featured: false,
      usageCount: 0,
      dateCreated: "Just now",
    })
    setCustomizationSettings({
      primaryColor: "#3b82f6",
      secondaryColor: "#1e40af",
      fontFamily: "serif",
      showQrCode: true,
      showLogo: true,
      showBorder: true,
      showWatermark: true,
      logoPosition: "top",
    })
  }

  const handleCloseCustomization = () => {
    setIsCustomizing(false)
    setIsCreatingNew(false)
    setSelectedTemplate(null)
  }

  const handleColorChange = (colorType, value) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      [colorType]: value,
    }))
  }

  const handleToggleSetting = (setting) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleFontChange = (font) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      fontFamily: font,
    }))
  }

  const handleLogoPositionChange = (position) => {
    setCustomizationSettings((prev) => ({
      ...prev,
      logoPosition: position,
    }))
  }

  return (
    <div className="p-6">
      {isCustomizing ? (
        <TemplateCustomizer
          template={selectedTemplate}
          settings={customizationSettings}
          onClose={handleCloseCustomization}
          onColorChange={handleColorChange}
          onToggleSetting={handleToggleSetting}
          onFontChange={handleFontChange}
          onLogoPositionChange={handleLogoPositionChange}
          isNew={isCreatingNew}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Certificate Templates</h1>
              <p className="text-slate-400">Manage and customize your certificate templates</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateNewTemplate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center self-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Template
            </motion.button>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "system" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setActiveTab("system")}
                >
                  System Templates
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "custom" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                  onClick={() => setActiveTab("custom")}
                >
                  My Templates
                </button>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="flex bg-slate-700 p-1 rounded-lg">
                  <button
                    className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or create a new template</p>
                <button
                  onClick={handleCreateNewTemplate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} onSelect={() => handleSelectTemplate(template)} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <TemplateListItem
                    key={template.id}
                    template={template}
                    onSelect={() => handleSelectTemplate(template)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TemplateCard({ template, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.2 }}
      className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 flex flex-col"
    >
      <div
        className="h-48 relative"
        style={{
          background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`,
        }}
      >
        {/* Certificate Preview */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className=" bg-opacity-10 backdrop-blur-sm rounded-lg p-4 w-full max-w-[80%] aspect-[1.4/1] flex flex-col items-center justify-center text-white text-center">
            <div className="flex items-center justify-center mb-1">
              <Hexagon className="h-4 w-4 mr-1" />
              <h3 className="text-xs font-bold">CertChain</h3>
            </div>
            <div className="border-t border-b border-white border-opacity-20 w-full my-2 py-2">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Certificate of Achievement</p>
              <p className="text-xs font-bold mt-1">John Doe</p>
              <p className="text-[8px] mt-1 opacity-70">has successfully completed</p>
              <p className="text-xs font-bold mt-1">Blockchain Development</p>
            </div>
            <div className="flex justify-between w-full text-[8px] opacity-70 mt-1">
              <span>ID: CERT-12345</span>
              <span>Date: 2023-12-15</span>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={onSelect}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105"
          >
            Customize
          </button>
        </div>
      </div>

      <div className="p-4 flex-grow z-10 bg-slate-700">
        <h3 className="font-bold text-white">{template.name}</h3>
        <p className="text-sm text-slate-400 mt-1">{template.description}</p>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-600 mt-2">
        <span>Used {template.usageCount} times</span>
        <span>{template.dateCreated}</span>
      </div>
    </motion.div>
  )
}

function TemplateListItem({ template, onSelect }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.5)" }}
      className="bg-slate-700 rounded-lg border border-slate-600 p-4 flex items-center"
    >
      <div
        className="h-16 w-24 rounded-lg mr-4 flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`,
        }}
      >
        {/* Mini preview */}
        <div className="h-full w-full flex items-center justify-center">
          <div className=" bg-opacity-10 rounded-sm w-[70%] h-[70%]"></div>
        </div>
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center">
          <h3 className="font-bold text-white">{template.name}</h3>
          {template.featured && (
            <span className="ml-2 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center">
              <Star className="h-2 w-2 mr-0.5" />
              Featured
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 truncate">{template.description}</p>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <span>Used {template.usageCount} times</span>
          <span className="mx-2">•</span>
          <span>{template.dateCreated}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={onSelect}
          className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors"
          title="Customize"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded-lg transition-colors" title="Preview">
          <Eye className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}



