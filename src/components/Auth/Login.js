import React from 'react';
import { Section } from '../Common';
import './index.scss';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import withAuthorization from './withAuthorization';

const INITIAL_STATE = {
  correo: "",
  contraseña: "",
  error: ""
}

class LoginBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  handleInputChange = e => this.setState({[e.target.name]:e.target.value});

  submit = async e => {
    try {
      await this.props.firebase.doSignInWithEmailAndPassword(this.state.correo, this.state.contraseña)

      this.setState = { ...INITIAL_STATE };
      this.afterLogin();
    } catch(error) {
      console.log("Ocurrió un error al iniciar sesión: ", error);
    }
  }

  googleLogin = async () => {
    try {
      let provider = new this.props.firebase.getGoogleAuthProvider();
      let result = await this.props.firebase.doSignInWithPopup(provider);
      let user = await this.props.firebase.user(result.user.uid).get();
      console.log(user);
      if(user.exists && user.data().status === 'active') {
        console.log(user.data());
        this.afterLogin();
      } else {
        this.props.firebase.doSignOut();
      }
    } catch(e) { console.log(e) }
  }

  afterLogin = () => {
    this.props.history.push('/');
  }

  render = () => {
    return(
      <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
        <div className="col-xs-12 col-md-6 formFull row">
          <div className="formFull--header col-xs-12">
            <p className="formFull--title">Inicia Sesión</p>
          </div>
          <div className="formFull--inputs col-xs-12 row center-xs">
            <input name="correo" value={this.state.correo} onChange={this.handleInputChange} className="col-xs-12" type="text" placeholder="Correo" />
            <input name="contraseña" value={this.state.contraseña} onChange={this.handleInputChange} className="col-xs-12" type="password" placeholder="Contraseña" />

            <p className="col-xs-12 formFull--info">¿Olvidaste tu contraseña? <Link to={ ROUTES.RECOVER_PASS }>Recuperala aquí</Link> </p>

            <button onClick={this.submit} className="col-xs-3 button">Entrar</button>

            <p className="col-xs-12 formFull--info">¿No tienes una cuenta? <Link to={ ROUTES.REGISTER+'/emprendedor' }>Regístrate</Link> </p>
            
            <div className="col-xs-12 col-md-6">
              <button className="button button-border blue">Entrar con Facebook</button>
            </div>
            
            <div className="col-xs-12 col-md-6">
              <button className="button button-border red" onClick={this.googleLogin}>Entrar con Google</button>
            </div>
          </div>
        </div>
      </Section>
    );
  }
};

let condition = authUser => !authUser;

const Login = withAuthorization(condition)(withRouter(withFirebase(LoginBase)));

export default Login;