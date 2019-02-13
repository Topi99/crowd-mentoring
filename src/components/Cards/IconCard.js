import React from 'react';
import './index.scss';

const IconCard = props => {
  return(
    <div className={`card iconCard ${props.className}`} >
      <i className="material-icons">{props.icon}</i>
      <h4 className="card--title">{props.title}</h4>
      <p className="card--body">{props.body}</p>
    </div>
  );
};

export default IconCard;