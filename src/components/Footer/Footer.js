import React from 'react';
import { Section } from '../Common';
import './index.scss';
import Link from 'react-router-dom/Link';

const Footer = props => {
  return(
    <footer>
      <Section title="" classNameDiv="start-xs">
        <div className="col-xs-12 col-md-3">
        </div>
        <div className="col-xs-12 col-md-3">
          <p className="subtitle">Quick Links</p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
        </div>
        <div className="col-xs-12 col-md-3">
          <p className="subtitle">Quick Links</p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
        </div>
        <div className="col-xs-12 col-md-3">
          <p className="subtitle">Quick Links</p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
          <p className="link"><Link to="/"> Link </Link></p>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;