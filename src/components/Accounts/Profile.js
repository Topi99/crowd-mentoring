import React from 'react';
import { withAuthorization } from '../Auth';
import { withFirebase } from '../Firebase';
import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {};
    
    props.firebase.user(props.match.params.uid).onSnapshot(doc => {
      this.setState(doc.data());
      this.setState({rolString:this.state.rol.path==='roles/0' ? 'Emprendedor' : 'Mentor'});
    });
  }

  render() {
    return(
      <div className="row profile middle-xs">
        <div className="col-xs-4">
          <div className="imgContainer">
            <img src={this.props.firebase.auth.currentUser.photoURL ? this.props.firebase.auth.currentUser.photoURL : "https://png.pngtree.com/svg/20170602/person_1058425.png"} alt="user profile" />
          </div>
        </div>
        <div className="col-xs-8">
          <div className="generalInfo">
            <p className="name semi-bold blue">{this.state.nombre+" "+this.state.apellido}</p>
            {
              this.state.rolString==='Emprendedor'
              ? <div className="important">
                  <p className="carrera medium ">
                    <span className="black">Carrera: </span> 
                    <span className="bluishGreen">
                      {this.state.carrera}
                    </span>
                  </p>
                  <p className="uni medium">
                    <span className="black">Universidad: </span>
                    <span className="bluishGreen">
                      {this.state.universidad}
                    </span>
                  </p>
                  <p className="semestre medium">
                    <span className="black">Semestre: </span>
                    <span className="bluishGreen">
                      {this.state.semestre}
                    </span>
                  </p>
                </div>
              : <></>
            }
            <p className="gray ciudad"><span className="black ">De: </span>{this.state.ciudad}</p>
            <p className="gray email"><span className="black ">Email: </span>{this.state.emailPrin}</p>
            <p className="gray celular"><span className="black ">Celular: </span>{this.state.celular}</p>
            <p className="gray bio"><span className="black ">Biografía: </span>{this.state.bio}</p>
          </div>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));