import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';

class App extends React.Component {
  render() {
    return(
      <Router>
        <NavBar />
      </Router>
    );
  }
}