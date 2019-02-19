import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = props => {
  return(
    <section className={`row middle-xs CallToAction ${props.className}`}>
      <h4 className="col-xs-12 col-md-offset-2 center-xs start-md col-md-6">{props.text}</h4>
      <div className="col-xs-12 col-md-2 center-xs">
        <Link className={`button ${props.btnClassName}`}  to={props.to} >{ props.btnTxt }</Link>
      </div>
    </section>
  );
};

export default CallToAction;