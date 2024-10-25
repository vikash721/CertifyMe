import React, { forwardRef } from 'react';
import { FaRibbon } from 'react-icons/fa';
import styles from './crf2.module.css';

const Certificate2 = forwardRef(({ customization }, ref) => (
  <div ref={ref} className={styles.certificate}>
    <h1 className={styles.title}>Certificate of Achievement</h1>
    <p className={styles.recipient}>
      This is awarded to: <span className={styles.name}>{customization.name || '[Recipient Name]'}</span>
    </p>
    <FaRibbon className={styles.ribbonIcon} />
    <p className={styles.description}>For your exceptional performance!</p>
    <p className={styles.date}>{customization.dateIssued || 'Date Here'}</p>
    <div className={styles.signatureSection}>
      <p>____________________</p>
      <p>Authorized Signature</p>
    </div>
  </div>
));

export default Certificate2;