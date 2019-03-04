import React from 'react';
import styles from './modal.module.scss';

const Modal = props => {
  return(
    <div className={`${styles.modal}`} style={props.visibility ? {visibility:'visible',opacity:1} : {visibility:'hidden', opacity:0}}>
      <div className={styles.cover} style={props.visibility ? {visibility:'visible',opacity:1} : {visibility:'hidden', opacity:0}}></div>
      <div className={`${styles.options} center-xs row`} style={props.visibility ? {visibility:'visible',opacity:1} : {visibility:'hidden', opacity:0}}>
        { props.children }
      </div>
      <i onClick={props.close} className="material-icons">clear</i>
    </div>
  );
}

export default Modal;