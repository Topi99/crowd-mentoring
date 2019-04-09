import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styles from './index.module.scss';
import { ADMINISTRADOR, MENTOR } from '../../constants/roles';
import { ImgIcon } from '../Common';
import { withToast } from 'react-awesome-toasts';

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photoURL: '' }
  }
  
  logout = e => {
    this.props.firebase.doSignOut();
  }

  getPhotoURL = async (uid) => {
    this.props.firebase.db.collection('users').doc(uid).get().then(doc => {
      if(doc.exists) {
        this.setState({photoURL: doc.data().photoURL})
      } else {
        this.props.toast.show({ text: "Por favor, inicia sesión de nuevo" });
        this.props.firebase.doSignOut();
      }
    });
  }
  
  getLinks = () => {
    if(this.props.authUser) {
      this.getPhotoURL(this.props.authUser.uid);
      return(
        <>
          {
            (this.props.authUser.rol+'').toUpperCase() !== MENTOR
              ? <li className="col-md-3 link middle-xs row center-xs">
                  <Link className="col-xs-12" to={ ROUTES.MENTORES }>
                    Mentores
                  </Link>
                </li>
              : <></>
          }
          {
            (this.props.authUser.rol+'').toUpperCase() === ADMINISTRADOR
              ? <li className="col-md-3 link middle-xs row center-xs">
                  <Link className="col-xs-12" to={ '/reportes' }>
                    Reportes
                  </Link>
                </li>
              : <></>
          }
          <li className="col-md-3 link middle-xs row center-xs">
            <Link className="col-xs-12" to={ ROUTES.ASESORIAS }>
              Mis Asesorias
            </Link>
          </li>
          <li className="col-xs-1 link center-xs">
            <div className={styles.imgWrap}>
              <ImgIcon photoURL={this.state.photoURL} />
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

export default withToast(withFirebase(LinksList));