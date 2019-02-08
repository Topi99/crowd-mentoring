import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    return(
      <Router>
        <>
          <NavBar />
          <Switch>
            <main>
              <Routes {...this.props} />
            </main>
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;