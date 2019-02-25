import React from 'react';
import { withAuthorization } from '../Auth';
import { withFirebase } from '../Firebase';
import './profile.scss';
import { QUser } from '../Common';
import equal from 'fast-deep-equal'
import { PROFILE } from '../../constants/routes';
import { Link } from 'react-router-dom';

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
    this.state = {users:[], emp:[], ment:[]};
    let users = [];
    let emp = [];
    let ment = [];

    this.unsuscribeListen = this.props.firebase.users().where('status', '==','inactive').onSnapshot(query => {
      query.forEach(user => {
        users.push(user.data());
      })
      this.setState({users});
    });

    this.unsuscribeListen2 = this.props.firebase.users().where('rolString', '==','emprendedor').onSnapshot(query => {
      query.forEach(user => {
        emp.push(user.data());
      })
      this.setState({emp});
    });

    this.unsuscribeListen3 = this.props.firebase.users().where('rolString', '==','mentor').onSnapshot(query => {
      query.forEach(user => {
        ment.push(user.data());
      })
      this.setState({ment});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
    this.unsuscribeListen2();
    this.unsuscribeListen3();
  }

  render() {
    return(
      <div className="row gestionUsuarios">
        <p className="medium black">Peticiones de Registro</p>
        <div className="row list col-xs-12">
          {
            this.state.users.length === 0 
            ? <p>No hay peticiones pendientes</p>
            : this.state.users.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Emprendedores</p>
        <div className="row list col-xs-12">
          {
            this.state.emp.length === 0 
            ? <p>No hay Emprendedores</p>
            : this.state.emp.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Mentores</p>
        <div className="row list col-xs-12">
          {
            this.state.ment.length === 0 
            ? <p>No hay Mentores</p>
            : this.state.ment.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
      </div>
    );
  }
}

const INITIAL_STATE = {
  active: '0',
  bio:'',
  nombre:'',
  apellido:'',
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...INITIAL_STATE
    };
    
    console.log(props.firebase.auth.currentUser);

    this.update = () => {
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
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.match.params.uid, prevProps.match.params.uid)) {
      this.setState({...INITIAL_STATE})
          
      this.props.firebase.user(this.props.match.params.uid).onSnapshot(doc => {
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
  }
  
  render() {
    return(
      <div className="row col-xs-12 profile middle-xs">
        <div className="col-xs-4">
          <div className="imgContainer">
            <img src={this.state.photoURL ? this.state.photoURL : "https://png.pngtree.com/svg/20170602/person_1058425.png"} alt="user profile" />
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
            {
              this.state.uid === this.props.firebase.auth.currentUser.uid 
              ? <Link to={'/edit'+PROFILE+'/'+this.state.uid}><button className="button ">Editar</button></Link>
              : <></>
            }
          </div>
        </div>

        {
          this.state.rolString === 'Administrador'
          ? <div className="col-xs-12 gray row card active bradius gestion">
              <div className="side black medium row col-xs-12 col-md-3">
                <div className="option col-xs-12">
                  <span><i className="material-icons" id="btn0">account_circle</i></span><span>Usuarios</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons" id="btn1">favorite</i></span><span>Áreas de especialidad</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons" id="btn2">domain</i></span><span>Industrias</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons" id="btn3">group_work</i></span><span>Temas</span>
                </div>
                <div className="option col-xs-12">
                  <span><i className="material-icons" id="btn4">list_alt</i></span><span>Etapas de Emprendimiento</span>
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