import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class LinksList extends React.Component {

  logout = e => {
    this.props.firebase.doSignOut();
  }
  
  getLinks = () => {
    if(this.props.authUser) {
      return(
        <>
          <li className="col-xs-3 link center-xs">
            {
              this.props.authUser.photoURL 
              ? <img href={this.props.authUser.photoURL} alt="" />
              : <i className="material-icons">account_circle</i>
            }
            <ul className="profile-links-hover center-xs row">
              <li className="col-xs-12">
                <Link to={ ROUTES.PROFILE }>
                    Perfil
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    } else {
      return(
        <>
          <li className="col-md-3 link center-xs">
            <Link to={ ROUTES.LOGIN }>
              Inicia Sesión
            </Link>
          </li>
        </>
      );
    }
  }
  
  render() {
    return(
      <ul className="col-md-12 row linksList end-xs">
        {this.getLinks()}
      </ul>
    );
  }
};

export default withFirebase(LinksList);