import React from 'react';
import { Section } from '../Common';
import { Link } from 'react-router-dom';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      carrera: "",
      semestre: "1",
      universidad: "",
      ciudad: "",
      emailPrin: "",
      emailSec: "",
      celular: "",
    }
  } 

  render() {
    return(
      <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
        <div className="col-xs-12 col-md-6 formFull row">
          <div className="formFull--header col-xs-12">
            <p className="formFull--title">¡Regístrate!</p>
          </div>
          <div className="formFull--inputs col-xs-12 row center-xs">
            <input className="col-xs-12" type="text" placeholder="Nombre" />
            <input className="col-xs-12" type="text" placeholder="Apellido" />
            <input className="col-xs-12" type="text" placeholder="Carrera(s) separada(s) por comas" />
            <select className="col-xs-12" placeholder="Semestre" >
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
            <select className="col-xs-12" placeholder="Universidad" >
              <option value="0">Universidad...</option>
              <option value="1">ITESM</option>
              <option value="2">Otra</option>
            </select>
            <input className="col-xs-12" type="text" placeholder="Ciudad" />
            <input className="col-xs-12" type="text" placeholder="Email principal" />
            <input className="col-xs-12" type="text" placeholder="Email secundario" />
            <input className="col-xs-12" type="text" placeholder="Celular" />

            <p className="col-xs-12 formFull--info">¿Olvidaste tu contraseña? <Link to="/recover-password">Recuperala aquí</Link> </p>

            <button className="col-xs-3 button">Entrar</button>

            <p className="col-xs-12 formFull--info">¿No tienes una cuenta? <Link to="/register">Regístrate</Link> </p>
            
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

export default Register;