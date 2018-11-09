import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

export default function Header(props) {
    return <div className="header">
    <h1 id="head">{props.title}</h1>
        <Link to ='/'><p id='homebutton'>Home</p></Link>
        <Link to = '/plan'><p id='searchbutton'>{props.plan}</p></Link>
        <Link to ='/journal'><p id='journalbutton'>{props.journal}</p></Link>
        <Link to ='/profile'><p id='profilebutton'>{props.profile}</p></Link>
    </div>
}