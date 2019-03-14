import React from 'react';
import { Section } from '../Common';
import './index.scss';
import Link from 'react-router-dom/Link';

const Footer = props => {
  return(
    <footer>
      <Section title="" className="" classNameDiv="start-xs">
        <div className="col-xs-12 col-md-3 cont">
          <p className="subtitle"><img src="http://aazztech.com/demos/themes/html/tizara/dist/img/logo.png" alt="footer" /></p>
          <p className="gray">
          Nunc placerat mi id nisi interdum they mtolis. Praesient is pharetra justo ught scel erisque the mattis lhreo quam nterdum mollisy.
          </p>
        </div>
        <div className="col-xs-12 col-md-3 cont">
          <p className="subtitle">Quick Links</p>
          <p className="link"><Link className=" gray" to="/"> About Us </Link></p>
          <p className="link"><Link className=" gray" to="/"> Contacts Us </Link></p>
          <p className="link"><Link className=" gray" to="/"> Testimonials </Link></p>
        </div>
        <div className="col-xs-12 col-md-3 cont">
          <p className="subtitle">Nuestros Servicios</p>
          <p className="link"><Link className=" gray" to="/"> Link </Link></p>
          <p className="link"><Link className=" gray" to="/"> Link </Link></p>
          <p className="link"><Link className=" gray" to="/"> Link </Link></p>
        </div>
        <div className="col-xs-12 col-md-3 cont">
          <p className="subtitle">Noticias</p>
          <p className="gray">
            Subscribe to get update and information. Don't worry, we won't send spam!
          </p>
          <div className="social">
            <div className="links" >
              <a href="https://facebook.com"><i class="fab fa-facebook"></i></a>
              <a href="https://twitter.com"><i class="fab fa-twitter"></i></a>
              <a href="https://linkedin.com"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://youtube.com"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;