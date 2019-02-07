import React from 'react';
import styles from './index.module.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      title: "Crowd Mentoring" 
    };
  }

  render() {
    return(
      <nav className={ [styles.navBar].join(' ') }>
        <h1>
          { this.state.title }
        </h1>
      </nav>
    );
  }
}

export default NavBar;