import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class MentorForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      aesps:[], 
      etapas:[], 
      industrias:[], 
      temas:[], 
    };
    let aesps = [];
    let etapas = [];
    let industrias = [];
    let temas = [];
    
    this.props.firebase.db.collection('aEsp').where('status','==','active').onSnapshot(doc => {
      doc.forEach(aesp => aesps.push(aesp.data()));
      this.setState({aesps});
    });

    this.props.firebase.db.collection('etapas').where('status','==','active').onSnapshot(doc => {
      doc.forEach(etapa => etapas.push(etapa.data()));
      this.setState({etapas});
    });

    this.props.firebase.db.collection('industrias').where('status','==','active').onSnapshot(doc => {
      doc.forEach(industria => industrias.push(industria.data()));
      this.setState({industrias});
    });

    this.props.firebase.db.collection('temas').where('status','==','active').onSnapshot(doc => {
      doc.forEach(tema => temas.push(tema.data()));
      this.setState({temas});
    });
  }
  
  render() {
    return(
      <form onSubmit={this.props.submit} className="formFull--inputs col-xs-12 row center-xs mentorForm">
  
        {
          this.props.noChange 
          ? <></>
          : <div className="small-padding col-xs-12">  
              <Link to={ROUTES.REGISTER+'/emprendedor'} className="col-xs-5 button button-border bluishGreen">Cambiar a Emprendedor</Link>
            </div>
        }
  
        <input required value={ this.props.nombre } onChange={ this.props.handleInputChange } id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
        <input required value={ this.props.apellido } onChange={ this.props.handleInputChange } id="apellido" className="col-xs-12" type="text" placeholder="Apellido" />
        <input required value={ this.props.tituloProf } onChange={ this.props.handleInputChange } id="tituloProf" className="col-xs-12" type="text" placeholder="Titulo profesional" />
        <select value={this.props.areasEsp} multiple onChange={ this.props.handleInputChange } id="areasEsp" className="col-xs-12" placeholder="Areas de Especialidad" >
          
          {
            this.state.aesps.map(aesp => <option key={aesp.uid} value={aesp.uid}>{aesp.nombre}</option>)
          }
  
        </select>
        <select value={this.props.etapas} multiple onChange={ this.props.handleInputChange } id="etapas" className="col-xs-12" placeholder="Areas de Especialidad" >
          
          {
            this.state.etapas.map(etapa => <option key={etapa.uid} value={etapa.uid}>{etapa.nombre}</option>)
          }
  
        </select>
        <select value={this.props.industrias} multiple onChange={ this.props.handleInputChange } id="industrias" className="col-xs-12" placeholder="Areas de Especialidad" >
          
          {
            this.state.industrias.map(industria => <option key={industria.uid} value={industria.uid}>{industria.nombre}</option>)
          }
  
        </select>
        <select value={this.props.temas} multiple onChange={ this.props.handleInputChange } id="temas" className="col-xs-12" placeholder="Areas de Especialidad" >
          
          {
            this.state.temas.map(tema => <option key={tema.uid} value={tema.uid}>{tema.nombre}</option>)
          }
  
        </select>
        <input type="text" required value={ this.props.universidad } onChange={ this.props.handleInputChange } id="universidad" className="col-xs-12" placeholder="Universidad" />
      
        <input value={ this.props.ciudad } onChange={ this.props.handleInputChange } id="ciudad" className="col-xs-12" type="text" placeholder="Ciudad" />
        <input required value={ this.props.emailPrin } onChange={ this.props.handleInputChange } id="emailPrin" className="col-xs-12" type="email" placeholder="Email principal" />
        <input value={ this.props.emailSec } onChange={ this.props.handleInputChange } id="emailSec" className="col-xs-12" type="email" placeholder="Email secundario" />
        <input value={ this.props.celular } onChange={ this.props.handleInputChange } id="celular" className="col-xs-12" type="text" placeholder="Celular" />
        <textarea value={ this.props.bio } onChange={ this.props.handleInputChange } id="bio" className="col-xs-12" placeholder="Biografía" />
  
        <div className="padding">
          <button type="submit" className="button">{this.props.noChange ? 'Guardar' : 'Enviar Solicitud'}</button>
        </div>
        {
          this.props.noBtnLogin
          ? <></>
          : <> 
              <p className="col-xs-12 formFull--info">¿Ya tienes una cuenta? <Link to={ROUTES.LOGIN}>Inicia Sesión</Link> </p>
          
              <div className="col-xs-12 col-md-6">
                <button className="button button-border blue">Entrar con Facebook</button>
              </div>
              
              <div className="col-xs-12 col-md-6">
                <button className="button button-border red">Entrar con Google</button>
              </div>
            </>
        }
      </form>
    );
  }
};

export default withFirebase(MentorForm);