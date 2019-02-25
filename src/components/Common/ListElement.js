import React from 'react';
import styles from './QUsers.module.scss';
import { Link } from 'react-router-dom';

const ListElement = ({...props}) => {
  return(
    <div className={`${styles.QUser} col-xs-12 ${props.className}`}>
      <div className={styles.txtCont}>{props.element.nombre}</div>
      <div className={styles.buttons}>
        <Link to={'/edit'+props.to+'/'+props.element.uid} >
          <i className={`material-icons ${styles.edit}`}>
            edit
          </i>
        </Link>
        <i className={`material-icons ${styles.clear}`}>
          clear
        </i>
      </div>
    </div>
  );
};

export default ListElement;