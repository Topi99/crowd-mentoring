import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state({ title: "Crowd Mentoring" });
  }

  render() {
    return(
      <nav>
        { this.state.title }
      </nav>
    );
  }
}

export default NavBar;