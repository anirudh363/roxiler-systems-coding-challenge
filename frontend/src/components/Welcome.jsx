import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchange, faChartLine, faChartSimple, faChartPie, faContactBook } from '@fortawesome/free-solid-svg-icons';

export default function Welcome() {
  return (
    <div className='page-component'>
      <div className='fixed-box'>
        <div className='heading-box'>
          <h1>MERN Stack Coding Challenge</h1>
          <h2>ROXILER SYSTEMS</h2>
        </div>
        <div className='divider-line'></div>
        <div className="pages-box">
          <h3>Contents</h3>
          <ul>
            <li>
              <Link to="/transactions">
                <FontAwesomeIcon icon={faExchange} /> Transactions
              </Link>
            </li>
            <li>
              <Link to="/statistics">
                <FontAwesomeIcon icon={faChartLine} /> Statistics
              </Link>
            </li>
            <li>
              <Link to="/bar-chart">
                <FontAwesomeIcon icon={faChartSimple} /> Bar Chart
              </Link>
            </li>
            <li>
              <Link to="/pie-chart">
                <FontAwesomeIcon icon={faChartPie} /> Pie Chart
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FontAwesomeIcon icon={faContactBook} /> Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className='details-box'>
          <p>ANIRUDH MANJUNATH SANDILYA</p>
          <p>Presidency University, Bangalore - 20211CSE0362</p>
        </div>
      </div>
    </div>
  );
}
