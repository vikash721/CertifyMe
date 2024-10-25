// src/Certificates/CRF1/Cf1.jsx
import React, { forwardRef } from 'react';
import { FaAward } from 'react-icons/fa';
import styles from './crf1.module.css';

const Certificate1 = forwardRef(({ customization }, ref) => (
  <div ref={ref} className={styles.certificate}>
    <h1 className={styles.title}>Certificate of Excellence</h1>
    <p className={styles.recipient}>
      Awarded to: <span className={styles.name}>{customization.name || '[Recipient Name]'}</span>
    </p>
    <p className={styles.description}>
      In recognition of your outstanding achievement in <span className={styles.name}>{customization.certificateName || '[Certificate Name]'}</span>.
    </p>
    <div className={styles.iconContainer}>
      <FaAward className={styles.icon} />
    </div>
    <p className={styles.date}>Date: {customization.dateIssued || 'Date Here'}</p>
    <div className={styles.footer}>
      <p>Signature</p>
      <p>____________________</p>
    </div>
  </div>
));

export default Certificate1;
