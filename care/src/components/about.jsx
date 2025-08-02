import React, { useEffect } from 'react';
import './about.css';
import { FaShieldAlt, FaRobot, FaQrcode, FaMobileAlt } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const headings = document.querySelectorAll('.heading');

    headings.forEach((heading) => {
      const split = new SplitType(heading, { types: 'chars' });

      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 10,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <div className="about-container">
      <header className="about-header">
        <div className="header-content">
          <h1>Connecting Care, <span className="highlight">Simplifying Health</span></h1>
          <p className="lead">Vital Link bridges the gap between patients and healthcare providers with secure, intelligent technology.</p>
        </div>
      </header>

      <section className="mission-section">
        <div className="mission-content">
          <h2 className='heading'>Our Mission</h2>
          <p className="mission-statement">
            At Vital Link, we're transforming healthcare communication by making medical information <strong>accessible</strong>, <strong>secure</strong>, and <strong>actionable</strong>. 
            Founded on the principle that better information leads to better care, we've created a platform that serves as your 
            digital health companion.
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Encrypted Data</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Accessibility</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Third-party Sharing</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className='heading'>Why Vital Link Stands Out</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Military-Grade Security</h3>
            <p>Your health data is encrypted end-to-end with the same technology used by financial institutions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaQrcode />
            </div>
            <h3>Instant Access</h3>
            <p>Generate unique access codes for doctors that expire after use, putting you in control.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaRobot />
            </div>
            <h3>AI Health Companion</h3>
            <p>Get smart insights from your uploaded documents without compromising privacy.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaMobileAlt />
            </div>
            <h3>Always With You</h3>
            <p>Access your complete medical history from any device, anywhere in the world.</p>
          </div>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="philosophy-content">
          <h2 className='heading'>Our Healthcare Philosophy</h2>
          <div className="philosophy-points">
            <div className="point">
              <div className="point-number">1</div>
              <div className="point-content">
                <h3>Patient-Centered Design</h3>
                <p>Every feature is built with real patient needs in mind, tested with diverse user groups.</p>
              </div>
            </div>
            <div className="point">
              <div className="point-number">2</div>
              <div className="point-content">
                <h3>Clinician Approved</h3>
                <p>Developed in consultation with medical professionals to ensure clinical relevance.</p>
              </div>
            </div>
            <div className="point">
              <div className="point-number">3</div>
              <div className="point-content">
                <h3>Technology With Empathy</h3>
                <p>We believe tech should enhance, not replace, the human connection in healthcare.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Take Control of Your Health Data?</h2>
        <p>Join thousands who've already simplified their healthcare journey.</p>
        <div className="cta-buttons">
          <button className="primary-cta">
            <a href="/login">Get Started Today</a>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
