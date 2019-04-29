import React from 'react';
import { Section } from '../Common';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import EmprendedorForm from './EmprendedorForm';
import MentorForm from './MentorForm';
import { withToast } from 'react-awesome-toasts';
import { EMAIL_ALREADY_IN_USE } from '../../constants/firebase';

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
      status: "inactive",
      bio: ''
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
    if(e.target.id === "areasEsp" || e.target.id === "etapas" || e.target.id === "industrias" || e.target.id === "temas") {
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
    e.preventDefault();
    try {
      const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(this.state.emailPrin, "_Pa3s#1_");
      const uid = authUser.user.uid;
      await this.props.firebase.user(uid).set({
        ...this.state,
        uid
      });

      this.props.firebase.doSignOut();
      this.setState({ ...this.INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
      this.props.toast.show({ text: "Sesión iniciada." });
    } catch(error) {
      // console.log( error );
      let text;
      if(error.code === EMAIL_ALREADY_IN_USE){
        text = 'El correo ingresado ya está en uso.';
      } else {
        text = 'Ocurrió un error inesperado. Por favor, intenta de nuevo';
      }
      this.props.toast.show({ text });
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

export default withToast(withFirebase(Register));