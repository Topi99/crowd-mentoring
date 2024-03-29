import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import Footer from './components/Footer';
import { withAuth } from './components/Auth';

const App = () => {
  return(
    <Router>
      <>
        <NavBar/>
          <section className="main">
            <Switch>
                <Routes />
            </Switch>
          </section>
        
        <Footer/>
      </>
    </Router>
  );
};

export default withAuth(App);