import React from 'react'
import { NavLink } from 'react-router-dom'

const navbar = () => {
    return (
        <><div className="parent">
            <div>
                <div className="logo">
                    <img src="" alt="" />
                </div>
            </div>
            <nav>
                <NavLink className={(e) => { return e.isActive ? "black" : "" }} to="/"><li>Home</li></NavLink>
                <NavLink className={(e) => { return e.isActive ? "black" : "" }} to="/about"><li>About</li></NavLink>
                <NavLink className={(e) => { return e.isActive ? "black" : "" }} to="/contact"><li>contact </li></NavLink>
            </nav>
            <div className="account">
                <img src="" alt="" />
            </div>
        </div>
        </>
    )
}

export default navbar