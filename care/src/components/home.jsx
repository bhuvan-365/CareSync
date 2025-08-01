import React from 'react';
import Btn from './btns';
import './home.css';

const Home = () => {
  return (
    <>
      <section id="home">
        <div className="head-content">
          <h1>Revolutionalizing <br /> Healthcare with <br />AI</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
            Doloremque distinctio debitis at repudiandae fugiat accusamus <br />
            expedita, pariatur fugit ab labore nostrum placeat, <br />
            voluptate, eaque itaque!
          </p>
        </div>

        <div className="btn-container">
          <Btn />
        </div>

        <div className="pp">
          <img src="/image/doc1.avif" alt="Doctor 1" />
          <img src="/image/doc2.png" alt="Doctor 2" />
          <img src="/image/doc3.jpg" alt="Doctor 3" />
          <img src="/image/doc4.avif" alt="Doctor 4" />
          <p>Doctor enrolled.</p>
        </div>
      </section>

      <section id="about"></section>
      <section id="contact"></section>
    </>
  );
};

export default Home;