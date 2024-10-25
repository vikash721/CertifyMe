// MinimalistCertificate.js
import React from 'react';
import './crf5.module.css'; // Import the single CSS file

const MinimalistCertificate = ({ recipientName, courseName, date, signature }) => {
  return (
    <div className={`certificate minimalist`}>
      <h1 className="title">Minimalist Certificate</h1>
      <p className="recipient">{recipientName}</p>
      <p className="course">{courseName}</p>
      <p className="date">Date: {date}</p>
      <p className="signature">Signed: {signature}</p>
    </div>
  );
};

export default MinimalistCertificate;
