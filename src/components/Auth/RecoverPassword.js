import React from 'react';
import { Section } from '../Common';
import { withFirebase } from '../Firebase';
import { withToast } from 'react-awesome-toasts';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correo: ""
    }

    this.toastProps = {
      text: 'Se ha enviado un link a tu correo',
      actionText: 'Ok',
      onActionClick: this.props.toast.hide,
    }
  }

  handleInputChange = e => this.setState({[e.target.name]:e.target.value});

  submit = e => {
    let err = this.props.firebase.doPasswordReset(this.state.correo);
    if(err) this.toastProps.text = err;
    this.props.toast.show(this.toastProps);
  }

  render = () => {
    return(
      <Section noTitle bgImage={`/image3.jpg`} className={ `login full bgImage` }>
        <div className="col-xs-12 col-md-6 formFull row">
          <div className="formFull--header col-xs-12">
            <p className="formFull--title">Recupera tu contraseña</p>
          </div>
          <div className="formFull--inputs col-xs-12 row center-xs">
            <input name="correo" value={this.state.correo} onChange={this.handleInputChange} className="col-xs-12" type="text" placeholder="Correo" />
  
            <button onClick={this.submit} className="col-xs-3 button">Guardar</button>
          </div>
        </div>
      </Section>
    );
  }
};

export default withToast(withFirebase(RecoverPassword));