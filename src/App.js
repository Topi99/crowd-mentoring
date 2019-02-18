import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { withAuth } from './components/Auth';

const App = () => {
  return(
    <Router>
      <>
        <NavBar/>
          <main>
            <Switch>
                <Routes />
            </Switch>
          </main>
      </>
    </Router>
  );
}

export default withAuth(App);