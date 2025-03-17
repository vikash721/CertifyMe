import React, { useState } from 'react';
import styles from './CertiGen.module.css';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const Certigen = () => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploaded(true); // Set to true when a file is uploaded
      setUploadMessage('File uploaded successfully!'); // Set the upload message
    }
  };

  
  const handleConnectWallet = () => {
    // Here you would integrate your wallet connection logic
    setWalletConnected(true);
  };

  return (
    <div className={styles.bigContainer}>
      <div className={styles.uploadContainer}>
        <h1 className={styles.uploadHeading}>Upload Your CSV File</h1>

        <div className={styles.inputGrid}>
          {/* Input Fields for Name, Event Name, Signature, and Certificate */}
          <InputGroup label="Name" placeholder="Enter Name" />
          <InputGroup label="Event Name" placeholder="Enter Event Name" />
          <SignatureUpload />
          <InputGroup label="Certificate" placeholder="Enter Certificate" />
        </div>

        <div className={styles.uploadWithContainer}>
          <h2> OR Upload with:</h2>
        </div>

        {/* File Upload for CSV */}
        <div className={styles.fileUploadBox}>
          {isUploaded ? (
            <div className={styles.uploadedSuccess}>
              <FaCheckCircle />
              {uploadMessage} {/* Show success message in green */}
            </div>
          ) : (
            <>
              <label htmlFor="fileUpload" className={styles.uploadLabel}>
                <FaUpload /> Click to Upload CSV
              </label>
              <input
                type="file"
                id="fileUpload"
                accept=".csv"
                onChange={handleFileChange}
                className={styles.hiddenInput} // Hide the default input
              />
            </>
          )}
        </div>

        {/* Wallet Connection Section */}
        <div className={styles.connectWallet}>
          <h2>Connect Your Wallet</h2>
          <button className={styles.connectButton} onClick={handleConnectWallet}>
            {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

// InputGroup Component for Reusability
const InputGroup = ({ label, placeholder }) => (
  <div className={styles.inputGroup}>
    <label className={styles.inputLabel}>{label}</label>
    <input type="text" className={styles.inputBox} placeholder={placeholder} />
  </div>
);

// SignatureUpload Component
const SignatureUpload = () => (
  <div className={styles.inputGroup}>
    <label className={styles.inputLabel}>Signature</label>
    <label htmlFor="signatureUpload" className={styles.signatureUpload}>
      <FaUpload /> Click to Upload Signature
    </label>
    <input
      type="file"
      id="signatureUpload"
      accept="image/*" // Assuming signature is an image
      onChange={(e) => console.log(e.target.files[0])} // Handle signature upload
      className={styles.hiddenInput} // Hide the default input
    />
  </div>
);

export default Certigen;