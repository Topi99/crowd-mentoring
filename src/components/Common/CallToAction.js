import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = props => {
  return(
    <section className={`row container middle-xs CallToAction ${props.invert ? 'invert' : ''} ${props.className}`}>
      <div className="col-xs-12 col-md-6 center-xs">
        <img src={props.imgSrc} alt="calltoaction" />
      </div>
      <div className={`col-xs-12 center-xs start-md col-md-6 ${props.invert ? 'first-xs' : ''}`}>
        <h4 className="semi-bold">
          {props.title}
        </h4>
        <p className="white normal">
          {props.text}
        </p>
        
        <div className="btn-container">
          <Link className={`button size-medium separate ${props.btnClassName}`}  to={props.to} >{ props.btnTxt }</Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;