import React from 'react'
import { withFirebase } from '../Firebase';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    props.firebase.user(props.match.params.uid).onSnapshot(doc => {
      doc.data().rol.onSnapshot(doc => console.log(doc.data()));
    });
  }
  

  render() {
    return(
      <div className="card active bradius" >
        {this.props.match.params.uid}
      </div>
    );
  }
};

export default withFirebase(EditProfile);