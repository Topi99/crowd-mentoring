import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing';
import { Login, Register, RecoverPassoword } from '../Auth';
import Profile from '../Accounts/Profile';
import * as ROUTES from '../../constants/routes';
import EditProfile from '../Accounts/EditProfile';
import EditAEsp from '../Accounts/EditAEsp';
import EditIndustria from '../Accounts/EditIndustria';
import EditTema from '../Accounts/EditTema';
import EditEtapaEmp from '../Accounts/EditEtapaEmp';
import ListMentores from '../ListMentores.js';
import MisAsesorias from '../Asesorias/MisAsesorias';
import Detalle from '../Asesorias/Detalle';
import { RepAsesorias } from '../Reportes';

const NewAEsp = () => <EditAEsp new />;
const NewIndustria = () => <EditIndustria new />;
const NewTema = () => <EditTema new />;
const NewEtapaEmp = () => <EditEtapaEmp new />;

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
      <Route path={ '/new'+ROUTES.INDUSTRIAS } component={ NewIndustria } />
      <Route path={ '/edit'+ROUTES.INDUSTRIAS+'/:uid' } component={ EditIndustria } />
      <Route path={ '/new'+ROUTES.TEMAS } component={ NewTema } />
      <Route path={ '/edit'+ROUTES.TEMAS+'/:uid' } component={ EditTema } />
      <Route path={ '/new'+ROUTES.ETAPAEMP } component={ NewEtapaEmp } />
      <Route path={ '/edit'+ROUTES.ETAPAEMP+'/:uid' } component={ EditEtapaEmp } />
      <Route path={ ROUTES.MENTORES } component={ ListMentores } />
      <Route path={ ROUTES.ASESORIAS } component={ MisAsesorias } />
      <Route path={ '/asesoria/:id' } component={ Detalle } />
      <Route path={ '/reportes' } component={ RepAsesorias } />
    </>
  );
};

export default Routes;