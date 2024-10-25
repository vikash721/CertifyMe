import React, { forwardRef } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import styles from './crf4.module.css';

const Certificate4 = forwardRef((props, ref) => (
  <div ref={ref} className={styles.certificate}>
    <h1 className={styles.title}>Academic Achievement Certificate</h1>
    <p className={styles.recipient}>
      Presented to: <span className={styles.name}>[Recipient Name]</span>
    </p>
    <FaGraduationCap className={styles.capIcon} />
    <p className={styles.description}>For your exceptional academic performance.</p>
    <p className={styles.date}>Date: 2024-10-23</p>
    <div className={styles.signatureSection}>
      <p>____________________</p>
      <p>Institution Representative</p>
    </div>
  </div>
));

export default Certificate4;
