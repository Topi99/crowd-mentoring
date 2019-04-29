import React from 'react';
import { withAuthorization, AuthUserContext, EmprendedorForm, MentorForm } from '../Auth';
import { withFirebase } from '../Firebase';
import './profile.scss';
import equal from 'fast-deep-equal'
import GestionUsuarios from './GestionUsuarios';
import GestionAEsp from './GestionAEsp';
import GestionIndustrias from './GestionIndustrias';
import GestionTemas from './GestionTemas';
import GestionEtapaEmp from './GestionEtapaEmp';
import { Modal, ImgIcon } from '../Common';
import { withToast } from 'react-awesome-toasts';
import { withRouter } from 'react-router-dom';
import FormSolicitarAsesoria from '../Asesorias/FormSolicitarAsesoria';
import { EMPRENDEDOR, MENTOR, ADMINISTRADOR } from '../../constants/roles';
import { confirmAlert } from 'react-confirm-alert';
// import * as sgMail from '@sendgrid/mail';

const Info = props => {
  return(
    <>
      {
        props.state.rolString===EMPRENDEDOR
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
  asesoriaHIP:'09:00',
  asesoriaHFP:'09:00',

  asesoriaFechaA1:'',
  asesoriaHIA1:'09:00',
  asesoriaHFA1:'09:00',

  asesoriaFechaA2:'',
  asesoriaHIA2:'09:00',
  asesoriaHFA2:'09:00',

  asesoriaTema:[''],

  temas:[''],
  asesoriaTemaUID:[''],
  temasComplete: [''],
  rolString: ''
}

// const SENDGRID_API_KEY = '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';

// sgMail.setApiKey(SENDGRID_API_KEY);
// console.log(SENDGRID_API_KEY);

class ProfileBase extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...INITIAL_STATE
    };
    
    // console.log(props.firebase.auth.currentUser);

    this.update = () => {
      let temas = [];
      this.ref = props.firebase.user(props.match.params.uid);
      this.ref.onSnapshot(doc => {
        this.setState(doc.data());
        let rolString = '';
        if(this.state.rol.path==='roles/0') {
          rolString = EMPRENDEDOR
        } else if(this.state.rol.path==='roles/1') {
          rolString = MENTOR
        } else if(this.state.rol.path==='roles/2') {
          rolString = ADMINISTRADOR
        }
        this.setState({rolString});
        if(rolString === MENTOR) {
          this.state.temas.forEach(tema => {
            props.firebase.db.collection('temas').doc(tema).get().then(doc => {
              temas.push(doc.data());
            })
            this.setState({temasComplete:temas});
          })
          const refVisita = props.firebase.db.collection('mentoresBuscados');
          refVisita.add({
            fecha: new Date(),
            mentorREF: this.ref,
            mentorUID: props.match.params.uid
          });
        }
      });
    }

    props.firebase.db.collection('users').doc(props.firebase.auth.currentUser.uid).get().then(doc => {
      this.setState({authUserName:`${doc.data().nombre} ${doc.data().apellido}`});
    });
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
          rolString = EMPRENDEDOR
        } else if(this.state.rol.path==='roles/1') {
          rolString = MENTOR
        } else if(this.state.rol.path==='roles/2') {
          rolString = ADMINISTRADOR
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

  sendSolicitud = e => {
    e.preventDefault();
    // this.props.toast.show({text:'Validando solicituds.'})
    
    const ref = this.props.firebase.db.collection('asesorias').doc();
    this.closeFormSolicitar();
    const asesoriaData = {
      asunto:this.state.asesoriaAsunto,
      temas: this.state.asesoriaTemaUID.join(', '),
      fechaDeSolicitud: new Date(), 
      solicitadaPorRef: this.props.firebase.db.collection('users').doc(this.props.firebase.auth.currentUser.uid),
      solicitadaPorUID: this.props.firebase.auth.currentUser.uid,
      
      nombreMentor: `${this.state.nombre} ${this.state.apellido}`,
      authUserName: this.state.authUserName,
      mensajeAs: this.state.mensajeAs,
      
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
      // else 
      //   console.log(data,asesoriaData[data], 'ok');
    }

    if(flag) this.props.toast.show({ text:'Rellena todos los campos para continuar'});
    else {
      ref.set(asesoriaData).then(() => {
        // sgMail.send(msg);
        const refVisita = this.props.firebase.db.collection('mentoresSolicitados');
        refVisita.add({
          fecha: new Date(),
          mentorREF: this.ref,
          mentorUID: this.props.match.params.uid
        });
        const refTemaSol = this.props.firebase.db.collection('temasSolicitados');
        const date = new Date();
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ];
        console.log(months[date.getMonth()]);
        const fullRef = refTemaSol.doc(""+date.getFullYear()).collection(months[date.getMonth()]);
        // fullRef.doc('total').update({ total: this.props.firebase.incrementBy(this.state.asesoriaTemaUID.length) });
        fullRef.doc('total').get().then(async doc => {
          if(doc.exists) {
            fullRef.doc('total').update({ total: this.props.firebase.incrementBy(this.state.asesoriaTemaUID.length) });
            for(let tema of this.state.asesoriaTemaUID) {
              // tema = tema.split('|')[1];
              console.log(tema);
              fullRef.doc(tema).get().then(doc => {
                if(doc.exists) {
                  fullRef.doc(tema).update({
                    total: this.props.firebase.incrementBy(1)
                  });
                } else {
                  fullRef.doc(tema).set({
                    total: 1
                  });
                }
              })
            }
          } else {
            await fullRef.doc('total').set({ total: this.state.asesoriaTemaUID.length });
            for(let tema of this.state.asesoriaTemaUID) {
              // tema = tema.split('|')[1];
              console.log(tema);
              fullRef.doc(tema).set({
                total: 1
              });
            }
          }
        });

        refTemaSol.doc('total').update({ total: this.props.firebase.incrementBy(this.state.asesoriaTemaUID.length) });
        this.props.toast.show({text:'Solicitud de asesoría enviada.'})
        this.props.history.push('/asesoria/'+ref.id);
      }).catch(err => this.props.toast.show({ text:'Ocurrió un error',  }));
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
    } else this.setState({ [e.target.id] : e.target.value });
  }

  handleChange = e => {
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
    await this.props.firebase.user(this.props.match.params.uid).set({
      ...this.state
    });

    this.props.toast.show({text:'Información de perfil actualizada'});
  }

  getForm = () => {
    if((this.props.authUser.rol+'').toUpperCase() === EMPRENDEDOR || (this.props.authUser.rol+'').toUpperCase() === ADMINISTRADOR) {
      return <EmprendedorForm photo noChange noBtnLogin handleInputChange={this.handleChange} submit={this.submit} {...this.state} />
    } else if((this.props.authUser.rol+'').toUpperCase() === MENTOR) {
      return <MentorForm photo noChange noBtnLogin handleInputChange={this.handleChange} submit={this.submit} {...this.state} />
    }
  }

  uploadPhoto = (e, onClose) => {
    let ref = this.props.firebase.storage.ref(this.props.authUser.uid+'/imagen');
    ref.put(document.querySelector("#file").files[0]).then(snapshot => {
      ref.getDownloadURL().then(url => {
        this.props.firebase.db.collection('users').doc(this.props.authUser.uid).update({
          photoURL:url
        })
      })
    });
  }

  editPhoto = e => {
    confirmAlert({
      customUI: ({onClose}) => 
      <div className="react-confirm-alert">
        <div className="react-confirm-alert-body">
          <h1>ACtualizar foto de perfil</h1>
          Selecciona la foto a subir.
          <input type="file" id="file" />
          <div className="react-confirm-alert-button-group" style={{display:'flex',flexDirection:'column'}}>
            <button style={{marginTop:'5px'}} onClick={({e, onClose}) => this.uploadPhoto(e, onClose)}>Calificar</button>
            <button style={{marginTop:'5px'}} onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    })
  }
  
  render() {
    return(
      <div className={`row al-items-start col-xs-12 profile ${this.state.uid === this.props.firebase.auth.currentUser.uid ? '' : 'center-xs'}`}>
        <div className={` no-padding-l flex ${this.state.uid === this.props.firebase.auth.currentUser.uid ? 'col-xs-4' : 'col-xs-4'}`}>
          <div className="card  active bradius just-cont-center">
            <div className="info separator x-padding">
              <div className={`${this.props.authUser.uid === this.state.uid ? 'edit' : ''} imgContainer padding`}>
                <ImgIcon large photoURL={this.state.photoURL} />
                {this.props.authUser.uid === this.state.uid ? <div className="click-edit" onClick={this.editPhoto}><i className="material-icons">edit</i></div>:<></>}
              </div>
              <p className="name large semi-bold blue">{this.state.nombre+" "+this.state.apellido}</p>
              <p className="gray email">{this.state.emailPrin}</p>
              <p className="gray ciudad">{this.state.ciudad}</p>
              <p className="gray celular">{this.state.celular}</p>
            </div>
            <div className=" x-padding">
              <div className="important">
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
              <p className="gray bio"><span className="black ">Biografía: </span>{this.state.bio.length > 280 ? this.state.bio.substr(0, 280)+'...' : this.state.bio}</p>
              <p className="padding-top center-xs">
                {
                  (this.props.authUser.rol+'').toUpperCase() !== MENTOR && this.props.firebase.auth.currentUser.uid !== this.state.uid
                  ? <button className="button box-sizing-border" onClick={this.openFormSolicitar}>Solicitar Asesoría</button>
                  : <></>
                }
              </p>
            </div>
          </div>
        </div>
        {
          this.state.uid === this.props.firebase.auth.currentUser.uid 
          ? 
            <div className="col-xs-8 no-padding-r">
              <div className="generalInfo card bradius active box-sizing-border">
                {
                  this.getForm()
                }
                <Modal visibility={this.state.formSolicitarStatus} open={this.openFormSolicitar} close={this.closeFormSolicitar} >
                  <p className="semi-bold x-large">Solicitar asesoría a {this.state.nombre} {this.state.apellido}</p>
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
                    mensajeAs={this.state.mensajeAs}
                    
                    onChangeF={this.handleFormAsChange}
                    send={this.sendSolicitud}
                    today={this.getToday()} />
                </Modal>
              </div>
            </div>
          : <></>
        }

        {
          this.state.rolString === ADMINISTRADOR
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

const Profile = props => {
  return(
    <AuthUserContext.Consumer>
      { (authUser, rol) => <ProfileBase {...props} authUser={authUser} /> }
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser;

export default withRouter(withToast(withFirebase(withAuthorization(condition)(Profile))));