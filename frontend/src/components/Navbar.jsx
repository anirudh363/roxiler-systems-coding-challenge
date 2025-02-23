import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faExchange, faChartLine,faChartSimple, faChartPie, faContactBook, faH } from "@fortawesome/free-solid-svg-icons";


export default function Navbar() {
  return (
    <div className='navbar'>
        <ul className='navbar-list'>
            <li className='navbar-item'>
                <Link to="/" data-tooltip="Home">
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </li>
            <li className='navbar-item'>
                <Link to="/transactions" data-tooltip="Transactions">
                    <FontAwesomeIcon icon={faExchange} />    
                </Link>
            </li>
            <li className='navbar-item'>
                <Link to="/statistics" data-tooltip="Statistics">
                    <FontAwesomeIcon icon={faChartLine} />
                </Link>
            </li>
            <li className='navbar-item'>
                <Link to="/bar-chart" data-tooltip="Bar Chart">
                    <FontAwesomeIcon icon={faChartSimple} />
                </Link>
            </li>
            <li className='navbar-item'>
                <Link to="/pie-chart" data-tooltip="Pie Chart">
                    <FontAwesomeIcon icon={faChartPie} />
                </Link>
            </li>
            <li className='navbar-item'>
                <Link to="/contact" data-tooltip="Contact">
                    <FontAwesomeIcon icon={faContactBook} />
                </Link>
            </li>
        </ul>
    </div>
  )
}
