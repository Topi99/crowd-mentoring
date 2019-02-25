import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withAuthorization } from '../Auth';
import { PROFILE } from '../../constants/routes';
import './GestionAEsp.scss';

class EditEtapaEmp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre:'',
      descripcion: '',
    };

    if(!props.new) {
      this.props.firebase.db.collection('etapas').doc(this.props.match.params.uid).onSnapshot(doc => {
        this.setState({...doc.data()});
      })
    }
  }

  handleInputChange = e => {
    this.setState({[e.target.id]:e.target.value});
  }

  submit = async e => {
    if(!this.props.new) {
      await this.props.firebase.db.collection('etapas').doc(this.props.match.params.uid).set({
        ...this.state
      });
    } else {
      let ref = await this.props.firebase.db.collection('etapas').doc();
      let uid = ref.id;
      ref.set({
        ...this.state,
        uid,
        status:'active'
      })
    }

    this.props.history.push(PROFILE+'/'+this.props.firebase.auth.currentUser.uid);
  }

  render() {
    return(
      <div className={`formFull--inputs col-xs-11 row center-xs aEspForm`}>
      
      <input value={ this.state.nombre } onChange={ this.handleInputChange } id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
      <textarea value={ this.state.descripcion } onChange={ this.handleInputChange } id="descripcion" className="col-xs-12" placeholder="Descripcion" />

      <button onClick={ this.submit } className="col-xs-5 button">Guardar</button>

      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withFirebase(withAuthorization(condition)(EditEtapaEmp)));