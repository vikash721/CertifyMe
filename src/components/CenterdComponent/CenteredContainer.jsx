import React from 'react';
import styles from './CenteredContainer.module.css';

const CenteredContainer = ({ children }) => {
  return (
    <div className={styles.centeredWrapper}>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
