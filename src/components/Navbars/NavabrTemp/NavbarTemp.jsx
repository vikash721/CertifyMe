// src/components/Navbars/NavbarTemp/NavbarTemp.js
import React from 'react';
import styles from './NavbarTemp.module.css';
import { useNavigate } from 'react-router-dom';

const NavbarTemp = ({ onLoginClick }) => { // Accept onLoginClick as a prop
  return (
    <div className={styles.divcenter}>
      <header className={styles.header}>
        <div className={styles.logoSearchContainer}>
          <div className={styles.logo}>CertifyMe</div>
          <input
            className={styles.search}
            type="text"
            placeholder="Search resources"
          />
        </div>
        <nav className={styles.nav}>
          <a href="/">All Resources</a>
          <a href="#" onClick={onLoginClick}>Log In</a> {/* Use the onLoginClick prop */}
        </nav>
      </header>
    </div>
  );
};

export default NavbarTemp;
