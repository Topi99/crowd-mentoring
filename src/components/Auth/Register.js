import React from 'react';
import { Section } from '../Common';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const EmprendedorForm = props => {
  return(
    <div className="formFull--inputs col-xs-12 row center-xs">
      
      <div className="small-padding col-xs-12">  
        <Link to={ROUTES.REGISTER+'/mentor'} className="col-xs-5 button button-border bluishGreen">Cambiar a Mentor</Link>
      </div>

      <input value={ props.nombre } onChange={ props.handleInputChange } id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
      <input value={ props.apellido } onChange={ props.handleInputChange } id="apellido" className="col-xs-12" type="text" placeholder="Apellido" />
      <input value={ props.carrera } onChange={ props.handleInputChange } id="carrera" className="col-xs-12" type="text" placeholder="Carrera(s) separada(s) por comas" />
      <select value={ props.semestre } onChange={ props.handleInputChange } id="semestre" className="col-xs-12" placeholder="Semestre" >
        <option value="0">Semestre...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="otro">otro</option>
        <option value="egresado">egresado</option>
      </select>
      <select value={ props.universidad } onChange={ props.handleInputChange } id="universidad" className="col-xs-12" placeholder="Universidad" >
        <option value="0">Universidad...</option>
        <option value="ITESM">ITESM</option>
        <option value="Otra">Otra</option>
      </select>
      <input value={ props.ciudad } onChange={ props.handleInputChange } id="ciudad" className="col-xs-12" type="text" placeholder="Ciudad" />
      <input value={ props.emailPrin } onChange={ props.handleInputChange } id="emailPrin" className="col-xs-12" type="text" placeholder="Email principal" />
      <input value={ props.emailSec } onChange={ props.handleInputChange } id="emailSec" className="col-xs-12" type="text" placeholder="Email secundario" />
      <input value={ props.celular } onChange={ props.handleInputChange } id="celular" className="col-xs-12" type="text" placeholder="Celular" />

      <button onClick={ props.submit } className="col-xs-5 button">Enviar Solicitud</button>

      <p className="col-xs-12 formFull--info">¿Ya tienes una cuenta? <Link to={ROUTES.LOGIN}>Inicia Sesión</Link> </p>
      
      <div className="col-xs-12 col-md-6">
        <button className="button button-border blue">Entrar con Facebook</button>
      </div>
      
      <div className="col-xs-12 col-md-6">
        <button className="button button-border red">Entrar con Google</button>
      </div>
    </div>
  );
}

const MentorForm = props => {
  return(
    <div className="formFull--inputs col-xs-12 row center-xs">
          
      <div className="small-padding col-xs-12">  
        <Link to={ROUTES.REGISTER+'/emprendedor'} className="col-xs-5 button button-border bluishGreen">Cambiar a emprendedor</Link>
      </div>

      <input value={ props.nombre } onChange={ props.handleInputChange } id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
      <input value={ props.apellido } onChange={ props.handleInputChange } id="apellido" className="col-xs-12" type="text" placeholder="Apellido" />
      <input value={ props.tituloProf } onChange={ props.handleInputChange } id="tituloProf" className="col-xs-12" type="text" placeholder="Titulo profesional" />
      <select value={props.areasEsp} multiple onChange={ props.handleInputChange } id="areasEsp" className="col-xs-12" placeholder="Areas de Especialidad" >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="otro">otro</option>
        <option value="egresado">egresado</option>
      </select>
      <input value={ props.ciudad } onChange={ props.handleInputChange } id="ciudad" className="col-xs-12" type="text" placeholder="Ciudad" />
      <input value={ props.emailPrin } onChange={ props.handleInputChange } id="emailPrin" className="col-xs-12" type="text" placeholder="Email principal" />
      <input value={ props.emailSec } onChange={ props.handleInputChange } id="emailSec" className="col-xs-12" type="text" placeholder="Email secundario" />
      <input value={ props.celular } onChange={ props.handleInputChange } id="celular" className="col-xs-12" type="text" placeholder="Celular" />

      <button onClick={ props.submit } className="col-xs-5 button">Enviar Solicitud</button>

      <p className="col-xs-12 formFull--info">¿Ya tienes una cuenta? <Link to={ROUTES.LOGIN}>Inicia Sesión</Link> </p>
      
      <div className="col-xs-12 col-md-6">
        <button className="button button-border blue">Entrar con Facebook</button>
      </div>
      
      <div className="col-xs-12 col-md-6">
        <button className="button button-border red">Entrar con Google</button>
      </div>
    </div>
  );
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    
    const INITIAL_STATE_BASE = {
      nombre: "",
      apellido: "",
      ciudad: "",
      emailPrin: "",
      emailSec: "",
      celular: "",
      active: false
    }
    
    const INITIAL_STATE_EMP = {
      ...INITIAL_STATE_BASE,
      carrera: "",
      semestre: "1",
      universidad: "0",
      rol: this.props.firebase.db.doc("roles/0")
    }
    
    const INITIAL_STATE_MENT = {
      ...INITIAL_STATE_BASE,
      tituloProf: "",
      areasEsp: [""],
      rol: this.props.firebase.db.doc("roles/1")
    }

    this.INITIAL_STATE = this.props.match.params.rol === "emprendedor" ? INITIAL_STATE_EMP : INITIAL_STATE_MENT;
    
    this.state = {
      ...this.INITIAL_STATE
    }
  } 
  
  handleInputChange = e => {
    if(e.target.id === "areasEsp") {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.setState({ [e.target.id] : value });
    }
    else this.setState({ [e.target.id] : e.target.value });
  }

  submit = async e => {
    try {
      const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(this.state.emailPrin, "_Pa3s#1_");
  
      await this.props.firebase.user(authUser.user.uid).set({
        ...this.state
      });

      this.setState({ ...this.INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    } catch(error) {
      console.log( error );
    }
  }

  render = () => {
    return(
      <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
        <div className="col-xs-12 col-md-6 formFull row">
          <div className="formFull--header col-xs-12">
            <p className="formFull--title">¡Regístrate como {`${this.props.match.params.rol}`}!</p>
            
          </div>
          {
              this.props.match.params.rol === "emprendedor"
                ? <EmprendedorForm { ...this.state } submit={ this.submit } handleInputChange={this.handleInputChange} />
                : <MentorForm { ...this.state } submit={ this.submit } handleInputChange={this.handleInputChange} />
            }
        </div>
      </Section>
    );
  }
};

export default withFirebase(Register);