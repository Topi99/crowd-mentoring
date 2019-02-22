import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styles from './index.module.scss';

class LinksList extends React.Component {

  logout = e => {
    this.props.firebase.doSignOut();
  }
  
  getLinks = () => {
    if(this.props.authUser) {
      return(
        <>
          <li className="col-xs-1 link center-xs">
            <div className={styles.imgWrap}>
              {
                this.props.authUser.photoURL 
                ? <img className={styles.profileIcon} src={this.props.authUser.photoURL} alt="" />
                : <img className={styles.profileIcon} src="https://png.pngtree.com/svg/20170602/person_1058425.png" alt="" />
              }
            </div>
            <div className={`${styles.profileLinksHover}  row middle-xs center-xs`}>
              <p className="col-xs-12">
                <Link to={ ROUTES.PROFILE+'/'+this.props.authUser.uid }>
                    Ver Perfil
                </Link>
              </p>
              <p className="col-xs-12">
                <button onClick={this.props.firebase.doSignOut} className="button">Cerrar Sesión</button>
              </p>
            </div>
          </li>
        </>
      );
    } else {
      return(
        <>
          <li className="col-md-3 link middle-xs row center-xs">
            <Link className="col-xs-12" to={ ROUTES.LOGIN }>
              Inicia Sesión
            </Link>
          </li>
        </>
      );
    }
  }
  
  render() {
    return(
      <ul className="col-md-12 row linksList middle-xs end-xs">
        {this.getLinks()}
      </ul>
    );
  }
};

export default withFirebase(LinksList);