import React from 'react';
import ErrorIMG from '../images/error.png'
import './styles/ErrorMSG.css';

function ErrorMSG(){
    return(
        <div className="Error__container">
            <img className="Error__IMG" src={ErrorIMG} alt="Error to load" />
        </div>
    )
}

export default ErrorMSG;