import React from 'react';
import './comentario.scss';
import { ImgIcon } from '../Common';

const Comentario = props => {
  return(
    <div className="comentario">
      <ImgIcon photoURL={props.photoURL} />
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