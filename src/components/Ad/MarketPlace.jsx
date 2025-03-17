// src/components/Ad/MarketPlace.jsx

import React, { useState } from 'react';
import CourseCard from './CourseCard';
import CourseDetailsModal from './CourseDetailsModal';
import styles from './MarketPlace.module.css';
import { FaSearch, FaTag, FaStar } from 'react-icons/fa';

// Sample course data array
const courses = [
  {
    id: 1,
    title: "Blockchain Basics",
    instructor: "John Doe",
    price: "$99",
    category: "Blockchain",
    description: "Learn the fundamentals of blockchain.",
    syllabus: "Introduction, Blockchain Technology, Smart Contracts, Cryptocurrencies"
  },
  {
    id: 2,
    title: "Advanced React",
    instructor: "Jane Smith",
    price: "$149",
    category: "Web Development",
    description: "Deep dive into React for building modern applications.",
    syllabus: "Hooks, Context API, Performance Optimization"
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Alice Johnson",
    price: "$199",
    category: "Data Science",
    description: "Master data science concepts using Python.",
    syllabus: "Data Analysis, Machine Learning, Data Visualization"
  },
  {
    id: 4,
    title: "Introduction to AI",
    instructor: "Mark Williams",
    price: "$129",
    category: "AI",
    description: "Explore the world of artificial intelligence.",
    syllabus: "AI Basics, Neural Networks, Natural Language Processing"
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    instructor: "Sarah Brown",
    price: "$249",
    category: "Web Development",
    description: "Become a full-stack web developer.",
    syllabus: "HTML, CSS, JavaScript, Node.js, React"
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    instructor: "James Miller",
    price: "$149",
    category: "Cybersecurity",
    description: "Learn the basics of cybersecurity.",
    syllabus: "Network Security, Threat Analysis, Risk Management"
  },
  {
    id: 7,
    title: "Digital Marketing 101",
    instructor: "Emma Davis",
    price: "$99",
    category: "Marketing",
    description: "Introduction to digital marketing strategies.",
    syllabus: "SEO, Social Media Marketing, Content Marketing"
  },
  {
    id: 8,
    title: "Introduction to Cloud Computing",
    instructor: "Liam Wilson",
    price: "$199",
    category: "Cloud Computing",
    description: "Learn the basics of cloud technologies.",
    syllabus: "Cloud Services, Deployment, Security"
  },
  {
    id: 9,
    title: "UI/UX Design Fundamentals",
    instructor: "Sophia Taylor",
    price: "$149",
    category: "Design",
    description: "Master the principles of UI/UX design.",
    syllabus: "Design Thinking, Prototyping, User Research"
  },
  {
    id: 10,
    title: "Financial Literacy for Beginners",
    instructor: "Benjamin Johnson",
    price: "$79",
    category: "Finance",
    description: "Learn the basics of personal finance.",
    syllabus: "Budgeting, Saving, Investing"
  },
  {
    id: 11,
    title: "Python for Data Science",
    instructor: "Lara Jones",
    price: "$149",
    category: "Data Science",
    description: "Python applications in data science.",
    syllabus: "Pandas, NumPy, SciKit Learn"
  },
  {
    id: 12,
    title: "Ethical Hacking Basics",
    instructor: "Tom Grey",
    price: "$199",
    category: "Cybersecurity",
    description: "Become a white-hat hacker.",
    syllabus: "Ethics, Penetration Testing, Vulnerability Scanning"
  },
  // ...additional courses
];

const MarketPlace = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.marketplaceContainer}>
        {/* Offers Banner */}
        <div className={styles.offerBanner}>
          <FaTag size={24} />
          <span>Special Offer: 20% off on all courses! Use code "LEARN20"</span>
        </div>

        {/* Search and Filter Section */}
        <div className={styles.searchFilterSection}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Design">Design</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <h1 className={styles.title}>Course Marketplace</h1>

        {/* Courses Grid */}
        <div className={styles.courseGrid}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} openModal={openModal} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className={styles.whyChooseUs}>
          <h2>Why Choose Our Platform?</h2>
          <p>Trusted by thousands of learners worldwide, our courses are curated by industry experts to give you the skills you need to succeed.</p>
          <ul>
            <li><FaStar /> Expert Instructors</li>
            <li><FaStar /> Affordable Prices</li>
            <li><FaStar /> Flexible Learning</li>
          </ul>
        </div>

        {/* Course Details Modal */}
        {isModalOpen && selectedCourse && (
          <CourseDetailsModal course={selectedCourse} closeModal={closeModal} />
        )}
      </div>
    </>
  );
};

export default MarketPlace;
