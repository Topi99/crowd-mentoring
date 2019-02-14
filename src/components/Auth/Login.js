import React from 'react';
import { Section } from '../Common';
import './index.scss';
import { Link } from 'react-router-dom';

const Login = props => {
  return(
    <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
      <div className="col-xs-12 col-md-6 formFull row">
        <div className="formFull--header col-xs-12">
          <p className="formFull--title">Inicia Sesión</p>
        </div>
        <div className="formFull--inputs col-xs-12 row center-xs">
          <input className="col-xs-12" type="text" placeholder="Nombre de Usuario" />
          <input className="col-xs-12" type="password" placeholder="Contraseña" />
          <button className="col-xs-3 button">Entrar</button>

          <p className="col-xs-12 formFull--info">¿No tienes una cuenta? <Link to="/register">Regístrate</Link> </p>
          
          <div className="col-xs-5">
            <button className="button button-border blue">Entrar con Facebook</button>
          </div>
          
          <div className="col-xs-5">
            <button className="button button-border red">Entrar con Google</button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Login;