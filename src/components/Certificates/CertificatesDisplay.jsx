import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FileUpload from '../FileUpload/FileUpload.jsx';
import ClassicCertificate from './CRF1/Cf1';
import ModernGradientCertificate from './CRF2/cf2';
import FloralCertificate from './CRF3/cf3';
import ColorfulCertificate from './CRF4/cf4';
import MinimalistCertificate from './CRF5/cf5';
import './certificates.css';

const CertificatesDisplay = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const certificateRefs = useRef([]);

  useEffect(() => {
    certificateRefs.current = certificates.map(() => React.createRef());
  }, [certificates]);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCertificates(results.data.filter(certificate => certificate.name !== 'Default Name'));
      },
    });
  };

  const generatePDF = async (certificate, ref) => {
    if (!ref.current) {
      console.error('Invalid ref:', ref);
      return null;
    }
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    return pdf.output('blob');
  };

  const downloadPDF = async (certificate, ref) => {
    const pdfBlob = await generatePDF(certificate, ref);
    if (pdfBlob) {
      saveAs(pdfBlob, `${certificate.name}_certificate.pdf`);
    }
  };

  const generateAllPDFs = async () => {
    const zip = new JSZip();
    const pdfPromises = certificates.map(async (certificate, index) => {
      const pdfBlob = await generatePDF(certificate, certificateRefs.current[index]);
      if (pdfBlob) {
        zip.file(`${certificate.name}_certificate.pdf`, pdfBlob);
      }
    });

    await Promise.all(pdfPromises);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'certificates.zip');
    });
  };

  const renderTemplate = (certificate, ref) => {
    switch (selectedTemplate) {
      case 'ModernGradientCertificate':
        return <ModernGradientCertificate ref={ref} customization={certificate} />;
      case 'FloralCertificate':
        return <FloralCertificate ref={ref} customization={certificate} />;
      case 'ColorfulCertificate':
        return <ColorfulCertificate ref={ref} customization={certificate} />;
      case 'MinimalistCertificate':
        return <MinimalistCertificate ref={ref} customization={certificate} />;
      case 'ClassicCertificate':
        return <ClassicCertificate ref={ref} customization={certificate} />;
      
    }
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <div>
        <label htmlFor="templateSelect">Select Template: </label>
        <select
          id="templateSelect"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select certificate format</option>
          <option value="ClassicCertificate">Classic Certificate</option>
          <option value="ModernGradientCertificate">Modern Gradient Certificate</option>
          <option value="FloralCertificate">Floral Certificate</option>
          <option value="ColorfulCertificate">Colorful Certificate</option>
          <option value="MinimalistCertificate">Minimalist Certificate</option>
        </select>
      </div>
      <button onClick={generateAllPDFs}>Generate All PDFs</button>
      <div className="templatesSection">
        {certificates.map((certificate, index) => (
          <div key={index} className="templateCard">
            {renderTemplate(certificate, certificateRefs.current[index])}
            <button onClick={() => downloadPDF(certificate, certificateRefs.current[index])}>Generate PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesDisplay;
