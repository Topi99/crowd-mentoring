import React from 'react';
import { PROFILE_IMG_DEF } from '../../constants/routes';

const ImgIcon = props => {
  return(
    <div className={`img-wrap ${props.large ? 'large' : ''}`}>
      <img src={props.photoURL ? props.photoURL : PROFILE_IMG_DEF } alt="comentario" />
    </div>
  )
};

export default ImgIcon;