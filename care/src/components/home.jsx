import React from 'react';
import Btn from './btns';
import './home.css';
import About from './about';
import Contact from './contact';
import Navbar from './navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="navbar-spacer"></div>
      
      <section id="home">
        <div className="home-container">
          <div className="head-content">
            <h1>Revolutionizing <br /> Healthcare with <br />AI</h1>
            <p>
Vital Link is your digital bridge between patients and healthcare providers — a secure, intelligent platform that makes accessing, sharing, and understanding medical records effortless. With end-to-end encryption, instant QR access, and AI-powered insights, we empower you to take control of your health like never before.
            </p>
          </div>

          <div className="btn-container">
            <Btn />
          </div>

          <div className="pp">
            <div className="doctor-images">
              <img src="/image/doc1.avif" alt="Doctor 1" />
              <img src="/image/doc2.png" alt="Doctor 2" />
              <img src="/image/doc3.jpg" alt="Doctor 3" />
              <img src="/image/doc4.avif" alt="Doctor 4" />
            </div>
            <p>Doctor enrolled.</p>
          </div>
        </div>
      </section>

      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;