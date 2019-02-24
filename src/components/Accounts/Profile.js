import React from 'react';
import { withAuthorization } from '../Auth';
import { withFirebase } from '../Firebase';
import './profile.scss';

const Info = props => {
  return(
    <>
      {
        props.state.rolString==='Emprendedor'
        ? <div className="important">
            <p className="carrera medium ">
              <span className="black">Carrera: </span> 
              <span className="bluishGreen">
                {props.state.carrera}
              </span>
            </p>
            <p className="uni medium">
              <span className="black">Universidad: </span>
              <span className="bluishGreen">
                {props.state.universidad}
              </span>
            </p>
            <p className="semestre medium">
              <span className="black">Semestre: </span>
              <span className="bluishGreen">
                {props.state.semestre}
              </span>
            </p>
          </div>
        : <></>
      }
    </>
  );
}

class GestionUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users:[]};
    let users = [];

    this.unsuscribeListen = this.props.firebase.users().onSnapshot(query => {
      query.forEach(user => {
        users.push(user.data());
      })
      this.setState({users});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
  }

  render() {
    return(
      <div className="row gestionUsuarios">
        <ul className="row col-xs-12">
          {
            this.state.users.map(user => {
              return(<li className="col-xs-12">{user.nombre}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {};
    
    props.firebase.user(props.match.params.uid).onSnapshot(doc => {
      this.setState(doc.data());
      let rolString = '';
      if(this.state.rol.path==='roles/0') {
        rolString = 'Emprendedor'
      } else if(this.state.rol.path==='roles/1') {
        rolString = 'Mentor'
      } else if(this.state.rol.path==='roles/2') {
        rolString = 'Administrador'
      }
      this.setState({rolString});
    });
  }

  render() {
    return(
      <div className="row col-xs-12 profile middle-xs">
        <div className="col-xs-4">
          <div className="imgContainer">
            <img src={this.props.firebase.auth.currentUser.photoURL ? this.props.firebase.auth.currentUser.photoURL : "https://png.pngtree.com/svg/20170602/person_1058425.png"} alt="user profile" />
          </div>
        </div>
        <div className="col-xs-8">
          <div className="generalInfo">
            <p className="name semi-bold blue">{this.state.nombre+" "+this.state.apellido}</p>
            { 
              this.state.rolString === 'Emprendedor' || this.state.rolString === 'Mentor'
              ? <Info state={this.state} />
              : <></>
            }
            <p className="gray ciudad"><span className="black ">De: </span>{this.state.ciudad}</p>
            <p className="gray email"><span className="black ">Email: </span>{this.state.emailPrin}</p>
            <p className="gray celular"><span className="black ">Celular: </span>{this.state.celular}</p>
            <p className="gray bio"><span className="black ">Biografía: </span>{this.state.bio}</p>
            <button className="button ">Editar</button>
          </div>
        </div>

        {
          this.state.rolString === 'Administrador'
          ? <div className="col-xs-12 gray row card active bradius gestion">
              <div className="side black medium row col-xs-12 col-md-3">
                <div className="option col-xs-12">
                  <span><i className="material-icons">account_circle</i></span><span>Usuarios</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons">favorite</i></span><span>Áreas de especialidad</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons">domain</i></span><span>Industrias</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons">group_work</i></span><span>Temas</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons">list_alt</i></span><span>Etapas de Emprendimiento</span>
                </div>
              </div>
              <div className="main col-xs-12 col-md-9">
                <GestionUsuarios firebase={this.props.firebase} />
              </div>
            </div>
          : <div></div>
        }
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));