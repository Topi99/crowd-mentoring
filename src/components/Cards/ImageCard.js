import React from 'react';
import './index.scss';
import Link from 'react-router-dom/Link';

const ImageCard = props => {
  return(
    <div className={`card imageCard ${props.className}`} >
      <div className="image--container">
        <div className="image--wrap">
          <img src={props.img} alt="card" />
        </div>
      </div>
      <h4 className="card--title">{props.title}</h4>
      <p className="card--body" style={ props.withButton ? {paddingBottom:0} : {}}>{props.body ? props.body.substring(0,100):'Sin descripción'}</p>
      {
        props.withButton
        ? <div className="card--button" ><Link className="button button-border blue" to={props.btnTo}>{props.btnTxt}</Link></div>
        : <></>
      }
      {
        props.aesp
        ? <div>{props.aesp.map(aesp => <span>{aesp.nombre}</span>)}</div>
        : <></>
      }
    </div>
  );
};

export default ImageCard;