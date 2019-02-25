import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withAuthorization } from '../Auth';
import { PROFILE } from '../../constants/routes';

class EditAEsp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre:'',
      descripcion: '',
      active: true
    };

    if(!props.new) {
      this.props.firebase.db.collection('aEsp').doc(this.props.match.params.uid).onSnapshot(doc => {
        this.setState({...doc.data()});
      })
    }
  }

  handleInputChange = e => {
    this.setState({[e.target.id]:e.target.value});
  }

  submit = async e => {
    await this.props.firebase.db.collection('aEsp').doc(this.props.match.params.uid).set({
      ...this.state
    });

    this.props.history.push(PROFILE+'/'+this.props.firebase.auth.currentUser.uid);
  }

  render() {
    return(
      <div className={`formFull--inputs col-xs-12 row center-xs aEspForm`}>
      
      <input value={ this.state.nombre } onChange={ this.handleInputChange } id="nombre" className="col-xs-12" type="text" placeholder="Nombre" />
      <textarea value={ this.state.descripcion } onChange={ this.handleInputChange } id="descripcion" className="col-xs-12" placeholder="Descripcion" />

      <button onClick={ this.submit } className="col-xs-5 button">Guardar</button>

      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withFirebase(withAuthorization(condition)(EditAEsp)));