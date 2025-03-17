// src/components/Ad/CourseCard.jsx

import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CourseCard.module.css';

const CourseCard = ({ course, openModal }) => {
  return (
    <div className={styles.card} onClick={() => openModal(course)}>
      <h2 className={styles.title}>{course.title}</h2>
      <p className={styles.instructor}>Instructor: {course.instructor}</p>
      <p className={styles.price}>{course.price}</p>
      <p className={styles.description}>{course.description}</p>
      <div className={styles.rating}>
        <FaStar className={styles.starIcon} /> 4.5 (200 Reviews)
      </div>
      <button className={styles.viewButton}>View Details</button>
    </div>
  );
};

export default CourseCard;
