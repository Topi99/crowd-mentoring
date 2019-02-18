import React from 'react';
import { Section } from '../Common';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  nombre: "",
  apellido: "",
  carrera: "",
  semestre: "1",
  universidad: "0",
  ciudad: "",
  emailPrin: "",
  emailSec: "",
  celular: "",
}

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    }
  } 

  handleInputChange = e => {
    this.setState({ [e.target.id] : e.target.value });
  }

  render = () => {
    return(
      <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
        <div className="col-xs-12 col-md-6 formFull row">
          <div className="formFull--header col-xs-12">
            <p className="formFull--title">¡Regístrate!</p>
          </div>
          <div className="formFull--inputs col-xs-12 row center-xs">
            <input value={this.state.nombre} onChange={this.handleInputChange} id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
            <input value={this.state.apellido} onChange={this.handleInputChange} id="apellido" className="col-xs-12" type="text" placeholder="Apellido" />
            <input value={this.state.carrera} onChange={this.handleInputChange} id="carrera" className="col-xs-12" type="text" placeholder="Carrera(s) separada(s) por comas" />
            <select value={this.state.semestre} onChange={this.handleInputChange} id="semestre" className="col-xs-12" placeholder="Semestre" >
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
            <select value={this.state.universidad} onChange={this.handleInputChange} id="universidad" className="col-xs-12" placeholder="Universidad" >
              <option value="0">Universidad...</option>
              <option value="1">ITESM</option>
              <option value="2">Otra</option>
            </select>
            <input value={this.state.ciudad} onChange={this.handleInputChange} id="ciudad" className="col-xs-12" type="text" placeholder="Ciudad" />
            <input value={this.state.emailPrin} onChange={this.handleInputChange} id="emailPrin" className="col-xs-12" type="text" placeholder="Email principal" />
            <input value={this.state.emailSec} onChange={this.handleInputChange} id="emailSec" className="col-xs-12" type="text" placeholder="Email secundario" />
            <input value={this.state.celular} onChange={this.handleInputChange} id="celular" className="col-xs-12" type="text" placeholder="Celular" />

            <button className="col-xs-5 button">Enviar Solicitud</button>

            <p className="col-xs-12 formFull--info">¿Ya tienes una cuenta? <Link to="/register">Inicia Sesión</Link> </p>
            
            <div className="col-xs-12 col-md-6">
              <button className="button button-border blue">Entrar con Facebook</button>
            </div>
            
            <div className="col-xs-12 col-md-6">
              <button className="button button-border red">Entrar con Google</button>
            </div>
          </div>
        </div>
      </Section>
    );
  }
};

export default withFirebase(Register);