import React from 'react';
import { NavLink } from 'react-router-dom';

const Btns = () => {
  return (
    <nav>
      <ul className="buttons">
        <li className='startHere'><NavLink to="/login">Start Here</NavLink></li>
        <li className='getCare'><NavLink to="/getCare">Get Care</NavLink></li>
      </ul>
    </nav>
  );
};

export default Btns;