import React from 'react';
import styles from './index.module.scss';
import 'flexboxgrid2';
import LinksList from './LinksList';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Auth';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      title: "Crowd Mentoring" 
    };
  }

  render() {
    return(
      <nav className={ `row ${styles.navBar}` }>
        <div className={ `col-xs-3 row middle-xs center-xs hidden-lg hidden-xl ${styles.navBar__MenuButton}` }>
          <i className="material-icons">
            menu
          </i>
        </div>
        <div className={ `col-xs-8 col-lg-3 center-xs row middle-xs ${styles.navBar__Logo}` }>
          <Link to="/">
            <h1>
              { this.state.title }
            </h1>
          </Link>
        </div>
        <div className={ `row middle-xs end-xs hidden-md hidden-sm hidden-xs col-lg-offset-3 col-lg-6 ${styles.navBar__Links}` }>
          <AuthUserContext.Consumer>
            { authUser => <LinksList authUser={ authUser } />}
          </AuthUserContext.Consumer>
        </div>
      </nav>
    );
  }
}

export default NavBar;