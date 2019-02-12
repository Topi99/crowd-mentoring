import React from 'react';
import './index.scss';

const ImageCard = props => {
  return(
    <div className={`card imageCard ${props.className}`} >
      <img src={props.img} alt="card" />
      <h4 className="card--title">{props.title}</h4>
      <p className="card--body">{props.body}</p>
    </div>
  );
};

export default ImageCard;