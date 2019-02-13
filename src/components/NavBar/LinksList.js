import React from 'react';
import { Link } from 'react-router-dom';

class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    }
  }
  
  render() {
    return(
      <ul>
        <li>
          <Link to="/">
            {this.state.user.userName}
          </Link>
        </li>
      </ul>
    );
  }
};

export default LinksList;