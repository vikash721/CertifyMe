// src/Certificates/CertificateExportModal/CertificateModal.jsx
import React, { useState } from 'react';
import styles from './CertificateModal.module.css';

const CertificateModal = ({ isOpen, onClose, onGenerate }) => {
  const [name, setName] = useState('');
  const [certificateName, setCertificateName] = useState('');
  const [dateIssued, setDateIssued] = useState('');

  const handleSave = () => {
    // Call the onGenerate function to save data
    onGenerate({ name, certificateName, dateIssued });
    onClose(); // Close the modal after saving
  };

  const handleExport = () => {
    onGenerate({ name, certificateName, dateIssued }, true); // Pass true to indicate exporting
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Customize Certificate</h2>
        <label>
          Recipient Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Certificate Name:
          <input type="text" value={certificateName} onChange={(e) => setCertificateName(e.target.value)} />
        </label>
        <label>
          Date Issued:
          <input type="text" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} />
        </label>
        <div className={styles.buttonContainer}>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleExport}>Save and Export</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
