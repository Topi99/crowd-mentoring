import React from 'react';
import { PROFILE_IMG_DEF } from '../../constants/routes';
import './comentario.scss';

const Comentario = props => {
  return(
    <div className="comentario">
      <div className="img-wrap">
        <img src={props.photoURL ? props.photoURL : PROFILE_IMG_DEF } alt="comentario" />
      </div>
      <div className="content card active bradius">
        <p className="nombre semi-bold">
          {props.nombre} <span className="fecha gray">- {props.fecha}</span>
        </p>
        <p className="mensaje gray">
          {props.comentario}
        </p>
      </div>
    </div>
  );
};

export default Comentario;