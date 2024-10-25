import React, { forwardRef } from 'react';
import { FaBuilding } from 'react-icons/fa';
import styles from './crf3.module.css';

const Certificate3 = forwardRef(({ customization }, ref) => (
  <div ref={ref} className={styles.certificate}>
    <h1 className={styles.title}>Corporate Achievement Award</h1>
    <p className={styles.recipient}>
      Presented to: <span className={styles.name}>{customization.name || '[Recipient Name]'}</span>
    </p>
    <FaBuilding className={styles.buildingIcon} />
    <p className={styles.description}>For exemplary contributions and dedication.</p>
    <p className={styles.date}>Date: {customization.dateIssued || 'Date Here'}</p>
    <div className={styles.signatureSection}>
      <p>____________________</p>
      <p>Company Representative</p>
    </div>
  </div>
));

export default Certificate3;