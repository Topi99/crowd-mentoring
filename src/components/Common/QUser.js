import React from 'react';
import styles from './QUsers.module.scss';
import { Link } from 'react-router-dom';
import { PROFILE_IMG_DEF, PROFILE } from '../../constants/routes';

const QUser = ({...props}) => {
  return(
    <div className={`${styles.QUser} col-xs-12 ${props.className}`}>
      <div className={styles.imgCont}><img src={PROFILE_IMG_DEF} alt="user_default" /></div>
      <div className={styles.txtCont}>{props.user.nombre} {props.user.apellido}</div>
      <div className={styles.buttons}>
        <Link to={'/edit'+PROFILE+'/'+props.user.uid} >
          <i className={`material-icons ${styles.edit}`}>
            edit
          </i>
        </Link>
        <i onClick={props.archiveUser} id={props.user.uid} className={`material-icons ${styles.clear}`}>
          {
            props.user.status === 'active' ? 'archive' : 'unarchive'
          }
        </i>
      </div>
    </div>
  );
};

export default QUser;