import React from 'react';
import './styles/Loading.css';
import Loading from '../images/loading.gif';

function Loader(){
    return (
        <div className="loading">
            <h3 className="loading__msg">Loading...</h3>
            <img className="loading__img" src={Loading} alt="Loadeing..." />
        </div>
    )
}

export default Loader;