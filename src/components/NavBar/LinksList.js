import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class LinksList extends React.Component {

  logout = e => {
    this.props.firebase.doSignOut();
  }
  
  getLinks = () => {
    if(this.props.authUser) {
      return(
        <>
          <li className="col-md-offset-6 col-md-3 link">
            <Link to="/profile">
              Perfil
            </Link>
          </li>
          <li className="col-md-3 link">
            <a href="/" onClick={this.logout}>
              Cerrar Sesión
            </a>
          </li>
        </>
      );
    } else {
      return(
        <>
          <li className="col-md-offset-6 col-md-3 link">
            <Link to="/login">
              Inicia Sesión
            </Link>
          </li>
          <li className="col-md-3 link">
            <Link to="/register">
              Regístrate
            </Link>
          </li>
        </>
      );
    }
  }
  
  render() {
    return(
      <ul className="col-md-12 row linksList center-xs">
        {this.getLinks()}
      </ul>
    );
  }
};

export default withFirebase(LinksList);