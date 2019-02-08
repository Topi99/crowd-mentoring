import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';

class App extends React.Component {
  render() {
    return(
      <Router>
        <>
          <NavBar />
          <Switch>
            <main>
              <Route exact path="/" component={ Landing } />
            </main>
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;