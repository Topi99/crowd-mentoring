import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing';
import { Login, Register, RecoverPassoword } from '../Auth';
import Profile from '../Accounts/Profile';
import * as ROUTES from '../../constants/routes';
import EditProfile from '../Accounts/EditProfile';
import EditAEsp from '../Accounts/EditAEsp';

const NewAEsp = <EditAEsp new />;

const Routes = props => {
  return(
    <>
      <Route exact path={ROUTES.HOME} component={ Landing } />
      <Route path={ ROUTES.LOGIN } component={ Login } />
      <Route path={ ROUTES.REGISTER+'/:rol' } component={ Register } />
      <Route path={ ROUTES.RECOVER_PASS } component={ RecoverPassoword } />
      <Route path={ ROUTES.PROFILE+'/:uid' } component={ Profile } />
      <Route path={ '/edit'+ROUTES.PROFILE+'/:uid' } component={ EditProfile } />
      <Route path={ '/new'+ROUTES.AEsp } component={ NewAEsp } />
      <Route path={ '/edit'+ROUTES.AEsp+'/:uid' } component={ EditAEsp } />
    </>
  );
};

export default Routes;