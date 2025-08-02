import React from 'react';
import styles from './contact.module.css';

const Contact = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Left Section */}
                <div className={styles.footerSection}>
                    <h2 className={styles.footerTitle}>Vital Link</h2>
                    <p className={styles.footerDescription}>
                        VitalLink bridges your health with technology — never miss a dose <br /> with smart pill 
                        reminders, get quick answers from our <br />AI health assistant, and securely 
                        share your medical info <br /> via downloadable QR codes.
                    </p>
                </div>

                {/* Quick Links */}
                <div className={styles.linksContainer}>
                    <h3 className={styles.linksTitle}>Quick link</h3>
                    <a href="#home" className={styles.linkItem}>Home</a>
                    <a href="#about" className={styles.linkItem}>About</a>
                    <a href="#contact" className={styles.linkItem}>Contact</a>
                </div>

                {/* Contact Info */}
                <div className={styles.linksContainer}>
                    <h3 className={styles.linksTitle}>Contact us</h3>
                    <p>Kathmandu, Nepal</p>
                    <p>+123-456-789</p>
                    <p>vitalLink09@gmail.com</p>
                </div>
            </div>

            {/* Divider */}
            <hr className={styles.divider} />

            {/* Bottom */}
            <div className={styles.bottomSection}>
                <p>© 2025 vitalLinks. All rights reserved.</p>
                <div className={styles.bottomLinks}>
                    <a href="#" className={styles.linkItem}>Privacy Policy</a>
                    <a href="#" className={styles.linkItem}>Terms of Service</a>
                    <a href="#" className={styles.linkItem}>Cookies Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default Contact;