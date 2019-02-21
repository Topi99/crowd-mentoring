import React from 'react';
import { Section } from '../Common';
import { withAuthorization } from '../Auth';
import { withFirebase } from '../Firebase';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    };

    console.log(props.firebase.auth.currentUser);
  }

  render() {
    return(
      <div className="row profile-container">
        <div>

        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));