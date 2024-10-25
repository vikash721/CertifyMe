import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import styles from './Home.module.css';
import { FaCertificate, FaUpload, FaCheckCircle } from 'react-icons/fa';
import CenteredContainer from "../../CenterdComponent/CenteredContainer";
import Certificate1 from '../../Certificates/CRF1/Cf1';
import Certificate2 from '../../Certificates/CRF2/cf2';
import Certificate3 from '../../Certificates/CRF3/cf3';
import Certificate4 from '../../Certificates/CRF4/cf4';
import Slider from 'react-slick';
import CertificateModal from '../../Certificates/CertificateExportModal/CertificateModal';
import NavbarMain from '../../Navbars/NavbarMains/NavbaMain';

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [confirmedCustomization, setConfirmedCustomization] = useState({ name: '', certificateName: '', dateIssued: '' });

  const certificate1Ref = useRef();
  const certificate2Ref = useRef();
  const certificate3Ref = useRef();
  const certificate4Ref = useRef();
  
  // Ref for scrolling to templates section
  const templatesSectionRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '12%',
  };

  const handleGeneratePDF = async () => {
    const certificateRef = selectedCertificate.current;
    const canvas = await html2canvas(certificateRef);
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 500],
    });

    doc.addImage(imgData, 'PNG', 0, 0, 800, 500);
    doc.save('certificate.pdf');
  };

  const openModal = (certificateRef) => {
    setSelectedCertificate(certificateRef);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const handleCustomization = (customizationData, exportAfterSave = false) => {
    setConfirmedCustomization(customizationData); // Update confirmed customization
    if (exportAfterSave) {
      handleGeneratePDF(); // Generate PDF if exportAfterSave is true
    }
  };

  // Smooth scroll to the templates section
  const scrollToTemplates = () => {
    if (templatesSectionRef.current) {
      templatesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // New function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <>
      <NavbarMain />

      <CenteredContainer>
        <div className={styles.homeContainer}>
          <header className={styles.header}>
            <h1>Welcome to <span className={styles.certifyme}>CertifyMe</span></h1>
            <p>Your one-stop solution for generating and managing certificates!</p>
          </header>

          <section className={styles.generateSection}>
            <div className={styles.card}>
              <FaUpload className={styles.icon} />
              <h3>Upload CSV</h3>
              <p>Choose a CSV file with candidate names to get started.</p>
              {/* Use handleNavigation to route to the Web3 transaction page */}
              <button className={styles.button} onClick={() => handleNavigation('/home/web3')}>Upload Now</button>
            </div>

            <div className={styles.card}>
              <FaCertificate className={styles.icon} />
              <h3>Select Template</h3>
              <p>Pick a template that fits your needs from our library.</p>
              {/* Scroll to templates section when clicked */}
              <button className={styles.button} onClick={scrollToTemplates}>View Templates</button>
            </div>

            <div className={styles.card}>
              <FaCheckCircle className={styles.icon} />
              <h3>Generate Certificates</h3>
              <p>Click to generate cool certificates in just a few seconds.</p>
              {/* Use handleNavigation to route to the Web3 transaction page */}
              <button className={styles.button} onClick={() => handleNavigation('/home/web3')}>Generate Now</button>
            </div>
          </section>

          {/* Certificate Templates Section */}
          <section className={styles.templatesSection} ref={templatesSectionRef}>
            <h2 className={styles.templateHeader}>Certificate Templates</h2>
            <Slider {...settings}>
              <div className={styles.sliderItem}>
                <Certificate1 ref={certificate1Ref} customization={confirmedCustomization} />
                <button className={styles.pdfButton} onClick={() => openModal(certificate1Ref)}>Customize</button>
              </div>
              <div className={styles.sliderItem}>
                <Certificate2 ref={certificate2Ref} customization={confirmedCustomization} />
                <button className={styles.pdfButton} onClick={() => openModal(certificate2Ref)}>Customize</button>
              </div>
              <div className={styles.sliderItem}>
                <Certificate3 ref={certificate3Ref} customization={confirmedCustomization} />
                <button className={styles.pdfButton} onClick={() => openModal(certificate3Ref)}>Customize</button>
              </div>
              <div className={styles.sliderItem}>
                <Certificate4 ref={certificate4Ref} customization={confirmedCustomization} />
                <button className={styles.pdfButton} onClick={() => openModal(certificate4Ref)}>Customize</button>
              </div>
            </Slider>
          </section>

          <footer className={styles.footer}>
            <p>&copy; 2024 CertifyMe. All Rights Reserved.</p>
          </footer>

          <CertificateModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onGenerate={handleCustomization} // Call handleCustomization on generate
          />
        </div>
      </CenteredContainer>
    </>
  );
};

export default Home;
