import React from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Auth';
import { withToast } from 'react-awesome-toasts';

const withAuth = Component => {
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: null,
        rol: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          this.setState({authUser});
          this.props.firebase.db.collection('users').doc(authUser.uid).get().then(doc => {
            if(doc.exists) {
              authUser.rol = doc.data().rolString
              this.setState({authUser});
            } else {
              this.props.toast.show({ text: "Por favor, inicia sesión de nuevo" });
              this.props.firebase.doSignOut();
            }
          });
        } else {
          this.setState({ authUser: null, rol:null })
        }
        // console.log(this.state.authUser);
      });
    }
  
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return(
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authUser={this.state.authUser} rol={this.state.rol} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withToast(withFirebase(WithAuth));
};

export default withAuth;