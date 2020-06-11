import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';


const Navbar = ()=>{
    return(
        <nav className="nav">            
            <ul className="nav-links">
                <Link to="/tab1" className="link">
                <li>Tab 1</li>
                </Link>
                <Link to="tab2" className="link">
                <li>Tab 2</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;