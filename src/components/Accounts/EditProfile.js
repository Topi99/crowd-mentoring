import React from 'react'
import { withFirebase } from '../Firebase';
import styles from './EditProfile.module.scss';
import { withRouter } from 'react-router-dom';
import { MentorForm, EmprendedorForm,  withAuthorization } from '../Auth';
import { PROFILE } from '../../constants/routes';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.rol = '';
    this.state = {
      rolString:''
    }
    let user = {};

    console.log(props.firebase.auth.currentUser);

    props.firebase.user(props.firebase.auth.currentUser.uid).onSnapshot(doc => {
      doc.data().rol.onSnapshot(doc => {
        this.rol = doc.data().nombre;
        if(props.firebase.auth.currentUser.uid === props.match.params.uid || this.rol === 'administrador') {
          props.firebase.user(props.match.params.uid).onSnapshot(doc => {
            user = doc.data();
            doc.data().rol.onSnapshot(doc => {
              this.setState({rolString:doc.data().nombre});
              this.setState({...user, status:"active"});
              console.log(user);
            });
          });
        } else {
          props.history.push(PROFILE+'/'+props.firebase.auth.currentUser.uid);
        }
      });
    });
  }

  handleChange = e => {
    this.setState({[e.target.id]:e.target.value});
  }

  submit = async e => {
    if(this.rol === 'administrador')
      this.props.firebase.doPasswordReset(this.state.emailPrin);

    await this.props.firebase.user(this.props.match.params.uid).set({
      ...this.state
    })
    this.props.history.push(PROFILE+'/'+this.props.firebase.auth.currentUser.uid);
  }

  getForm = () => {
    if(this.state.rolString === 'emprendedor' || this.state.rolString === 'administrador') {
      return <EmprendedorForm noChange noBtnLogin handleInputChange={this.handleChange} submit={this.submit} {...this.state} />
    } else if(this.state.rolString === 'mentor') {
      return <MentorForm noChange noBtnLogin handleInputChange={this.handleChange} submit={this.submit} {...this.state} />
    }
  }

  render() {
    return(
      <div className={`card active bradius col-xs-11  row ${styles.editProfile}`}>
        <div className="col-xs-12 row">
          {
            this.getForm()    
          }
        </div>
      </div>
    );
  }
};

const condition = authUser => !!authUser;

export default withRouter(withFirebase(withAuthorization(condition)(EditProfile)));