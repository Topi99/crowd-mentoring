import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';

class App extends React.Component {
  render() {
    return(
      <>
        <NavBar />
        <Router>
          <Switch>
            <Route exact to='/' component={ Landing } />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;