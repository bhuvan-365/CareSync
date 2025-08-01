import React from 'react'
import { NavLink } from 'react-router-dom'

const navbar = () => {
    return (
        <><div className="parent">
            <div>
                <div className="logo">
                    <img src="/public/img/" alt="" />
                </div>
            </div>
            <nav>
<ul>
    <li>Home</li>
    <li>About</li>
    <li>contact</li>
</ul>
            </nav>
            <div className="account">
                <img src="/src/assets/account.svg" alt="" />
            </div>
        </div>
        </>
    )
}

export default navbar