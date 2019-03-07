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
import { Modal } from '../Common';
import { withToast } from 'react-awesome-toasts';
import { withRouter } from 'react-router-dom';
import FormSolicitarAsesoria from '../Asesorias/FormSolicitarAsesoria';

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
  
  formSolicitarStatus: false,

  asesoriaAsunto:'',
  
  asesoriaFechaP:'',
  asesoriaHIP:'',
  asesoriaHFP:'',

  asesoriaFechaA1:'',
  asesoriaHIA1:'',
  asesoriaHFA1:'',

  asesoriaFechaA2:'',
  asesoriaHIA2:'',
  asesoriaHFA2:'',

  asesoriaTema:[''],

  temas:[''],
  asesoriaTemaUID:[''],
  temasComplete: [''],
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...INITIAL_STATE
    };
    
    // console.log(props.firebase.auth.currentUser);

    this.update = () => {
      let temas = [];
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
        this.state.temas.forEach(tema => {
          props.firebase.db.collection('temas').doc(tema).get().then(doc => {
            temas.push(doc.data());
          })
          this.setState({temasComplete:temas});
          console.log(this.state)
        })
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

  openFormSolicitar = e => this.setState({formSolicitarStatus: true});
  closeFormSolicitar = e => this.setState({formSolicitarStatus: false});

  /**
   * TODO: Validar y guardar campos.
   */
  sendSolicitud = e => {
    const ref = this.props.firebase.db.collection('asesorias').doc();
    this.closeFormSolicitar();
    const asesoriaData = {
      asunto:this.state.asesoriaAsunto,
      temas: this.state.asesoriaTema,
      solicitadaPorRef: this.props.firebase.db.collection('users').doc(this.props.firebase.auth.currentUser.uid),
      solicitadaPorUID: this.props.firebase.auth.currentUser.uid,
      
      asesoriaFechaP: this.state.asesoriaFechaP,
      hip: this.state.asesoriaHIP,
      hfp: this.state.asesoriaHFP,
      
      fechaA1: this.state.asesoriaFechaA1,
      hia1: this.state.asesoriaHIA1,
      hfa1: this.state.asesoriaHFA1,
      
      fechaA2: this.state.asesoriaFechaA2,
      hia2: this.state.asesoriaHIA2,
      hfa2: this.state.asesoriaHFA2,

      mentorUID: this.state.uid,
      mentorREf: this.props.firebase.db.collection('users').doc(this.state.uid),
      status: 'pendiente',
      id: ref.id
    };
    let flag = false;
    for(let data in asesoriaData){ 
      if(asesoriaData[data]===undefined || asesoriaData[data]===null || asesoriaData[data]==='') {
        flag = true;
        console.log(data,asesoriaData[data], 'fail');
        break;
      }
      else 
        console.log(data,asesoriaData[data], 'ok');
    }

    if(flag) this.props.toast.show({ text:'Rellena todos los campos para continuar'});
    else {
      ref.set(asesoriaData).then(() => {
        this.props.toast.show({text:'Solicitud de asesoría enviada.'})
        this.props.history.push('/user/'+this.props.firebase.auth.currentUser.uid+'/asesorias/'+ref.id);
      }).catch(err => this.props.toast.show({ text:err,  }));
      // console.log(asesoriaData)
    }
  }

  getToday = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
  }

  handleFormAsChange = e => {
    if(e.target.id === "asesoriaTema") {
      var options = e.target.options;
      var value = [];
      var valueRef = []
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          valueRef.push(this.props.firebase.db.collection('temas').doc(options[i].value));
          value.push(options[i].value);
        }
      }
      this.setState({ 'asesoriaTemaUID' : value });
      this.setState({ 'asesoriaTema' : valueRef });
      // console.log(value);
    } else this.setState({ [e.target.id] : e.target.value });
    // console.log('chande',e.target.id,this.state);
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
            {
              this.state.rolString === 'Mentor' && this.props.firebase.auth.currentUser.uid !== this.state.uid
              ? <button className="button" onClick={this.openFormSolicitar}>Solicitar Asesoría</button>
              : <></>
            }
            <Modal visibility={this.state.formSolicitarStatus} open={this.openFormSolicitar} close={this.closeFormSolicitar} >
              <FormSolicitarAsesoria 
                asunto={this.state.asesoriaAsunto} 
                
                fechaPreferida={this.state.asesoriaFechaP} 
                asesoriaHIP={this.state.asesoriaHIP}
                asesoriaHFP={this.state.asesoriaHFP}

                fechaA1={this.state.asesoriaFechaA1} 
                asesoriaHIA1={this.state.asesoriaHIA1}
                asesoriaHFA1={this.state.asesoriaHFA1}

                fechaA2={this.state.asesoriaFechaA2} 
                asesoriaHIA2={this.state.asesoriaHIA2}
                asesoriaHFA2={this.state.asesoriaHFA2}
                
                temasComplete={this.state.temasComplete}
                temas={this.state.asesoriaTemaUID} 
                onChangeF={this.handleFormAsChange}
                send={this.sendSolicitud}
                today={this.getToday()} />
            </Modal>
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

export default withRouter(withToast(withFirebase(withAuthorization(condition)(Profile))));