import React from 'react';
import { Link } from 'react-router-dom';

class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    }
  }

  getLinks = () => {
    if(this.state.user) {
      return(
        <>
          <li className="col-md-offset-6 col-md-3 link">
            <Link to="/">
              {this.state.user.userName}
            </Link>
          </li>
          <li className="col-md-3 link">
            <Link to="/">
              Cerrar Sesión
            </Link>
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

export default LinksList;