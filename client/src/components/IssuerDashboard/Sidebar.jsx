import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Plus, FileText, Image } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = (path) => location.pathname.includes(path);

  return (
    <aside className="bg-gray-800 w-64 h-full text-white p-4">
      <nav>
        <button
          className={`w-full py-2 ${activeTab("/issuer-dashboard") ? "bg-blue-600" : "text-gray-300"}`}
          onClick={() => navigate("/issuer-dashboard")}
        >
          <LayoutDashboard className="h-5 w-5 mr-3" />
          Overview
        </button>
        <button
          className={`w-full py-2 ${activeTab("/issuer-dashboard/generate-certificate") ? "bg-blue-600" : "text-gray-300"}`}
          onClick={() => navigate("/issuer-dashboard/generate-certificate")}
        >
          <Plus className="h-5 w-5 mr-3" />
          Generate Certificate
        </button>
        <button
          className={`w-full py-2 ${activeTab("/issuer-dashboard/certificates") ? "bg-blue-600" : "text-gray-300"}`}
          onClick={() => navigate("/issuer-dashboard/certificates")}
        >
          <FileText className="h-5 w-5 mr-3" />
          Certificates
        </button>
        <button
          className={`w-full py-2 ${activeTab("/issuer-dashboard/templates") ? "bg-blue-600" : "text-gray-300"}`}
          onClick={() => navigate("/issuer-dashboard/templates")}
        >
          <Image className="h-5 w-5 mr-3" />
          Templates
        </button>
      </nav>
    </aside>
  );
}
