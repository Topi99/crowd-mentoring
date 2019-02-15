import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing';
import { Login, Register, RecoverPassoword } from '../Auth';

const Routes = props => {
  return(
    <>
      <Route exact path="/" component={ Landing } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/recover-password" component={ RecoverPassoword } />
    </>
  );
};

export default Routes;