import React from 'react';
import { PROFILE_IMG_DEF } from '../../constants/routes';

/**
 * 
 * @param {Object} props
 * @param {string} props.photoURL The URL of the user profile image. 
 * @param {boolean} props.large Specifies if the image is large.
 * 
 */
const ImgIcon = props => {
  return(
    <div className="img-container">
      <div className={`img-wrap ${props.large ? 'large' : ''}`}>
        <img src={props.photoURL ? props.photoURL : PROFILE_IMG_DEF } alt="comentario" />
      </div>
    </div>
  )
};

export default ImgIcon;