import React from 'react';
import { Section } from '../Common';
import './index.scss';

const Login = props => {
  return(
    <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
      <div className="col-xs-12 col-md-6 formFull row">
        <div className="formFull--header col-xs-12">
          <p className="formFull--title">Login</p>
        </div>
        <div className="formFull--inputs col-xs-12 row center-xs">
          <input className="col-xs-12" type="text" placeholder="Nombre de Usuario" />
          <input className="col-xs-12" type="password" placeholder="Contraseña" />
        </div>
      </div>
    </Section>
  );
};

export default Login;