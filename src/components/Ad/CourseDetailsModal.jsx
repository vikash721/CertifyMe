// src/components/Ad/CourseDetailsModal.jsx

import React from 'react';
import styles from './CourseDetailsModal.module.css';

const CourseDetailsModal = ({ course, closeModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{course.title}</h2>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Price:</strong> {course.price}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Syllabus:</strong> {course.syllabus}</p>
        <button className={styles.closeButton} onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
