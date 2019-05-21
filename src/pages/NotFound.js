import React from 'react';
import {Link} from 'react-router-dom';
import './styles/NotFound.css';
import Image404 from '../images/404Page.png';

function NotFound(){
    return (
        <React.Fragment>
            <div className="container_404">
                <div className="Notfound">
                    <img src={Image404} alt="404"/>
                    <Link to="/pokemon" className="btn back">Home</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NotFound;