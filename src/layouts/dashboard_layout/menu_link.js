import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = ({ to, text, textColor, icon }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>
      <i className={`ni ${icon} ${textColor}`}></i>
      <span className="nav-link-text">{text}</span>
    </Link>
  </li>
)

export default MenuLink
