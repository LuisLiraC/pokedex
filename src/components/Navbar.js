import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/pokeLogo@1x.png'
import './styles/Navbar.css';

class Navbar extends Component {
    render(){
        return (
            <div className="Navbar">
                <div className="container-fluid">
                    <Link className="Navbar__brand" to="/pokemon">
                        <img className="Navbar__brand-logo" src={logo} alt="Logo" />
                        <span className="font-weight-light">Gotta&nbsp;</span>
                        <span className="font-weight-bold">catch 'em all</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Navbar;