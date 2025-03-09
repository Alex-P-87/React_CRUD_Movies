import React from 'react';
import { Link , useLocation } from 'react-router-dom';
import './styleComponents/Successfully.css';

const Successfully = () => {
    const location = useLocation();
    const {text1 , text2 , text3} = location.state || {};
    
    return (
        <div className=" successfully ">
            <h1 className='success'>✅ {text1} ✅</h1>
            <Link to="/">
                <button>{text2}</button>
            </Link>
            <Link to="/new">
                <button>{text3}</button>
            </Link>
        </div>
    );
}

export default Successfully;