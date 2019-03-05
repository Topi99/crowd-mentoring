import React from 'react';
import { withAuthorization } from '../Auth';
import { withFirebase } from '../Firebase';
import './profile.scss';
import equal from 'fast-deep-equal'
import { PROFILE } from '../../constants/routes';
import { Link } from 'react-router-dom';
import GestionUsuarios from './GestionUsuarios';
import GestionAEsp from './GestionAEsp';
import GestionIndustrias from './GestionIndustrias';
import GestionTemas from './GestionTemas';
import GestionEtapaEmp from './GestionEtapaEmp';

const Info = props => {
  return(
    <>
      {
        props.state.rolString==='Emprendedor'
        ? <>
            
            <p className="semestre medium">
              <span className="black">Semestre: </span>
              <span className="bluishGreen">
                {props.state.semestre}
              </span>
            </p>
          </>
        : <></>
      }
    </>
  );
}

const INITIAL_STATE = {
  activeTab: "1",
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
    
    // console.log(props.firebase.auth.currentUser);

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

  getActiveTab = () => {
    if(this.state.activeTab === "1")
      return <GestionUsuarios firebase={this.props.firebase} />
    else if(this.state.activeTab === "2")
      return <GestionAEsp firebase={this.props.firebase} />
    else if(this.state.activeTab === "3")
      return <GestionIndustrias firebase={this.props.firebase} />
    else if(this.state.activeTab === '4')
      return <GestionTemas firebase={this.props.firebase} />
      else if(this.state.activeTab === '5')
        return <GestionEtapaEmp firebase={this.props.firebase} />
  }

  onClickOption = e => {
    this.setState({activeTab:e.target.id.split('')[6]});
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
                  <Info state={this.state} />
                </div>
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
                <div className="option col-xs-12" id="option1" onClick={this.onClickOption}>
                  <span><i className="material-icons" id="btn0">account_circle</i></span><span>Usuarios</span>
                </div>
                <div className="option col-xs-12" id="option2" onClick={this.onClickOption}>
                  <span><i className="material-icons" id="btn1">favorite</i></span><span>Áreas de especialidad</span>
                </div>
                <div className="option col-xs-12" id="option3" onClick={this.onClickOption}>
                  <span><i className="material-icons" id="btn2">domain</i></span><span>Industrias</span>
                </div>
                <div className="option col-xs-12" id="option4" onClick={this.onClickOption}>
                  <span><i className="material-icons" id="btn3">group_work</i></span><span>Temas</span>
                </div>
                <div className="option col-xs-12" id="option5" onClick={this.onClickOption}>
                  <span><i className="material-icons" id="btn4">list_alt</i></span><span>Etapas de Emprendimiento</span>
                </div>
              </div>
              <div className="main col-xs-12 col-md-9">
                {
                  this.getActiveTab()
                }
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