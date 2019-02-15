import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { withFirebase } from './components/Firebase';

class App extends React.Component {

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
    });
  }

  componentWillUnmount() {
    this.listener();
  }
  
  render() {
    return(
      <Router>
        <>
          <NavBar authUser={this.state.authUser} />
            <main>
              <Switch>
                  <Routes {...this.props} />
              </Switch>
            </main>
        </>
      </Router>
    );
  }
}

export default withFirebase(App);