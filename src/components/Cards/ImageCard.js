import React from 'react';
import './index.scss';
import Link from 'react-router-dom/Link';

const ImageCard = props => {
  return(
    <div className={`card imageCard ${props.className}`} >
      <img src={props.img} alt="card" />
      <h4 className="card--title">{props.title}</h4>
      <p className="card--body">{props.body.substring(0,90)}</p>
      {
        props.withButton
        ? <Link className="button button-border blue" to={props.btnTo}>{props.btnTxt}</Link>
        : <></>
      }
    </div>
  );
};

export default ImageCard;