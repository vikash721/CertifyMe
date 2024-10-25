// src/components/CSVUpload.js
import React, { useState } from 'react';
import styles from './CertiGen.module.css';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';
import NavbarMain from '../Navbars/NavbarMains/NavbaMain';

const Certigen = () => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(true); // Set to true when a file is uploaded
  };

  const handleConnectWallet = () => {
    // Here you would integrate your wallet connection logic
    setWalletConnected(true);
  };

  return (
    <>
    {/* <NavbarMain/> */}
    <div className={styles.bigContainer}>
      <div className={styles.uploadContainer}>
        <h1 className={styles.uploadHeading}>Upload Your CSV File</h1>

        <div className={styles.inputGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Name</label>
            <input type="text" className={styles.inputBox} placeholder="Enter Name" />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Event Name</label>
            <input type="text" className={styles.inputBox} placeholder="Enter Event name" />
          </div>
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
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Certificate</label>
            <input type="text" className={styles.inputBox} placeholder="Enter Certificate" />
          </div>
        </div>

        {/* New div below the input fields */}
        <div className={styles.uploadWithContainer}>
          <h2> OR Upload with:</h2>
          
        </div>

        <div className={styles.fileUploadBox}>
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
          {isUploaded && (
            <div className={styles.uploadedSuccess}>
              <FaCheckCircle />
              File uploaded successfully!
            </div>
          )}
        </div>

        <div className={styles.connectWallet}>
          <h2>Connect Your Wallet</h2>
          <button className={styles.connectButton} onClick={handleConnectWallet}>
            {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Certigen;