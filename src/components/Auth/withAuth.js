import React from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Auth';

const withAuth = Component => {
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
  
        // console.log(this.state.authUser);
      });
    }
  
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return(
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuth);
};

export default withAuth;