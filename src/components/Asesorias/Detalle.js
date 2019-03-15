import React from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Auth';
import { ASESORIAS, PROFILE } from '../../constants/routes';
import { withToast } from 'react-awesome-toasts';
import { withRouter, Link } from 'react-router-dom';
import Comentario from './Comentario';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StarRatingComponent from 'react-star-rating-component';

class Detalle extends React.Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      asunto:'',
      fechaA1: '',
      fechaA2: '',
      hfa1: '',
      hfa2: '',
      hfp: '',
      hia1: '',
      hia2: '',
      hip: '',
      id: '',
      mentorREf: '',
      mentorString: '',
      mentorUID: '',
      solicitadaPorUID: '',
      solicitadaPorRef: '',
      solicitadaPorString: '',
      status: '',
      temas: [],
      temasString: '',
      asesoriaFechaP:'',
      mensaje: '',
      comentarios: [],
      comMinuta: [],
      menMinuta: '',
      photoURL: '',
      nombre: '',
      mensajeSend: '',
      mentorCalif: 0,
      empCalif: 0,
      cm: false,
      ce: false
    }
    
    this.state = {...this.DEFAULT_STATE};
    let asesoria = {};

    props.firebase.db.collection('asesorias').doc(props.match.params.id).onSnapshot(doc => {
      asesoria = doc.data();

      if((asesoria.status === 'pendiente' || asesoria.status === 'aceptada' || asesoria.status === 'finalizada') && (asesoria.mentorUID === props.firebase.auth.currentUser.uid || asesoria.solicitadaPorUID === props.firebase.auth.currentUser.uid)) {
        asesoria.mentorREf.get().then(doc => {
          asesoria.mentorString = `${doc.data().nombre} ${doc.data().apellido}`;

          asesoria.solicitadaPorRef.get().then(doc => {
            asesoria.solicitadaPorString = `${doc.data().nombre} ${doc.data().apellido}`;

            props.firebase.db.collection('users').doc(props.firebase.auth.currentUser.uid).get().then(doc => {
              asesoria.photoURL = doc.data().photoURL;
              asesoria.nombre = `${doc.data().nombre} ${doc.data().apellido}`;
              this.setState({...asesoria});
            });
          });
        })
      } else {
        props.toast.show({text:'La asesoría no está disponible.'})
        props.history.push(ASESORIAS);
      }
    });
  }

  handleCommentChange = e => {
    this.setState({mensajeSend:e.target.value});
  }

  sendComment = e => {
    e.preventDefault();
    let now = new Date();
    this.props.firebase.db.collection('asesorias').doc(this.state.id).update({
      comentarios: this.props.firebase.firestore.FieldValue.arrayUnion({
        comentario:this.state.mensajeSend,
        nombre: this.state.nombre,
        photoURL: this.state.photoURL ? this.state.photoURL : '',
        fecha: `${now.getFullYear()}-${now.getMonth() < 10 ? '0': ''}${now.getMonth()+1}-${now.getDay() < 10 ? '0': ''}${now.getDay()} a las ${now.getHours() < 10 ? '0': ''}${now.getHours()}:${now.getMinutes() < 10 ? '0': ''}${now.getMinutes()}`
      })
    });
    this.setState({mensajeSend:""});
  }

  handleComMinChange = e => {
    this.setState({menMinuta:e.target.value});
  }

  sendComMin = e => {
    e.preventDefault();
    let now = new Date();
    this.props.firebase.db.collection('asesorias').doc(this.state.id).update({
      comMinuta: this.props.firebase.firestore.FieldValue.arrayUnion({
        comentario: this.state.menMinuta,
        nombre: this.state.nombre,
        photoURL: this.state.photoURL ? this.state.photoURL : '',
        fecha: `${now.getFullYear()}-${now.getMonth() < 10 ? '0': ''}${now.getMonth()+1}-${now.getDay() < 10 ? '0': ''}${now.getDay()} a las ${now.getHours() < 10 ? '0': ''}${now.getHours()}:${now.getMinutes() < 10 ? '0': ''}${now.getMinutes()}`
      })
    });
    this.setState({menMinuta:""});
  }

  clickAceptar = e => {
    confirmAlert({
      title: 'Aceptar Asesoría',
      message: '¿Estás seguro que la quieres aceptar? De ser así, por favor selecciona la fecha acordada con el emprendedor. ',
      buttons: [
        {
          label: 'Aceptar fecha 1',
          onClick: (e) => this.aceptarAsesoria(1)
        },
        {
          label: 'Aceptar fecha 2',
          onClick: (e) => this.aceptarAsesoria(2)
        },
        
        {
          label: 'Aceptar fecha 3',
          onClick: (e) => this.aceptarAsesoria(3)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  clickCancelar = e => {
    confirmAlert({
      title: 'Cancelar Asesoría',
      message: '¿Estás seguro que la quieres cancelar?',
      buttons: [
        {
          label: 'Sí, cancelar',
          onClick: this.cancelarAsesoria
        },
        {
          label: 'No'
        }
      ]
    });
  }

  aceptarAsesoria = (fd) => {
    this.props.firebase.db.collection('asesorias').doc(this.state.id).update({
      status: 'aceptada',
      fechaDefinida: fd
    });
  }

  cancelarAsesoria = () => {
    this.props.firebase.db.collection('asesorias').doc(this.state.id).update({
      status: 'cancelada'
    });
  }

  clickFinalizar = e => {
    confirmAlert({
      customUI: ({onClose}) => 
        <div className="react-confirm-alert">
          <div className="react-confirm-alert-body">
            <h1>Para finalizar, califica la asesoría</h1>
            0 - Pésima asesoría. 5 - Excelente asesoría.
            <div className="react-confirm-alert-button-group" style={{display:'flex',flexDirection:'column'}}>
              <select 
                value={ this.state.mentorUID === this.props.firebase.auth.currentUser.uid 
                        ? this.state.mentorCalif
                        : this.state.empCalif }
                onChange={this.changeCalif} >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button style={{marginTop:'5px'}} onClick={this.sendCalif}>Calificar</button>
              <button style={{marginTop:'5px'}} onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
    }); 
  }

  changeCalif = e => {
    this.state.mentorUID === this.props.firebase.auth.currentUser.uid
    ? this.setState({mentorCalif: e.target.value})
    : this.setState({empCalif: e.target.value})
  }

  sendCalif = e => {
    let data = this.state.mentorUID === this.props.firebase.auth.currentUser.uid
               ? { mentorCalif:this.state.mentorCalif, cm: true, status:'finalizada' }
               : { empCalif:this.state.empCalif, ce:true, status:'finalizada' };

    this.props.firebase.db.collection('asesorias').doc(this.state.id).update(data);
  }

  render() {
    return(
      <section className="container row center-xs padding-bot">
        <p className="title col-xs-12">Detalles de Asesoría</p>
        <div className="col-xs-12 col-md-5">
          <article className="row card active start-xs bradius padding">
            <p className="gray col-xs-12"><span className="black semi-bold">Asunto: </span>{this.state.asunto}</p>
            <p className="gray col-xs-12"><span className="black semi-bold">Temas: </span>{this.state.temas}</p>
            <p className="gray col-xs-12"><span className="black semi-bold">Solicitada Por: </span><Link className="bluishGreen" to={PROFILE+'/'+this.state.solicitadaPorUID}>{this.state.solicitadaPorString}</Link> </p>
            <p className="gray col-xs-12"><span className="black semi-bold">Mentor: </span><Link className="bluishGreen" to={PROFILE+'/'+this.state.mentorUID}>{this.state.mentorString}</Link> </p>
            <p className={`gray col-xs-12 ${this.state.fechaDefinida === 1 ? 'aceptada':''}`}><span className="black semi-bold">Fecha Preferida:  </span>{this.state.asesoriaFechaP} <span className="black semi-bold">De: </span>{this.state.hip} <span className="black semi-bold">A: </span>{this.state.hfp}</p>
            <p className={`gray col-xs-12 ${this.state.fechaDefinida === 2 ? 'aceptada':''}`}><span className="black semi-bold">Fecha Alterna 1:  </span>{this.state.fechaA1} <span className="black semi-bold">De: </span>{this.state.hia1} <span className="black semi-bold">A: </span>{this.state.hfa1}</p>
            <p className={`gray col-xs-12 ${this.state.fechaDefinida === 3 ? 'aceptada':''}`}><span className="black semi-bold">Fecha Alterna 2:  </span>{this.state.fechaA2} <span className="black semi-bold">De: </span>{this.state.hia2} <span className="black semi-bold">A: </span>{this.state.hfa2}</p>
            <p className="gray col-xs-12"><span className="black semi-bold">Status: </span><span className={this.state.status}>{this.state.status}</span></p>
            <p className="gray col-xs-12"><span className="black semi-bold">Mensaje: </span>{this.state.mensajeAs}</p>
          </article>
        </div>
        <div className="col-xs-12 col-md-3 flex">
          <article className="actions row card active bradius padding max-heigth">
            {
              (this.state.cm && this.state.ce) || (this.state.mentorUID === this.props.firebase.auth.currentUser.uid && this.state.cm) || (this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid && this.state.ce)
              ? <></>
              : <p className="x-large semi-bold col-xs-12">Acciones</p>
            }
            {
              this.state.status === 'pendiente' && this.state.mentorUID === this.props.firebase.auth.currentUser.uid
              ? <div className="col-xs-12 padding">
                  <button className="button bluishGreen" onClick={this.clickAceptar}>Aceptar Asesoría</button>
                </div>
              : <></>
            }

            {
              (this.state.status === 'aceptada' || this.state.status === 'finalizada') && (this.state.mentorUID === this.props.firebase.auth.currentUser.uid || this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid)
              ? (this.state.mentorUID === this.props.firebase.auth.currentUser.uid && !this.state.cm) 
                ? <div className="col-xs-12 padding">
                    <button className="button red" onClick={this.clickFinalizar}>Finalizar</button>
                  </div>
                : (this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid && !this.state.ce)
                  ? <div className="col-xs-12 padding">
                      <button className="button red" onClick={this.clickFinalizar}>Finalizar</button>
                    </div>
                  : <></>
              : <></>
            }

            {
              (this.state.status === 'pendiente' || this.state.status === 'aceptada') && (this.state.mentorUID === this.props.firebase.auth.currentUser.uid || this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid)
              ? <div className="col-xs-12 padding">
                  <button className="button button-border red" onClick={this.clickCancelar}>Cancelar</button>
                </div>
              : <></>
            }
            {
              this.state.status === 'finalizada' && ((this.state.mentorUID === this.props.firebase.auth.currentUser.uid && this.state.cm)  || (this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid && this.state.ce))
              ? <p className="x-large semi-bold col-xs-12">Calificaciones</p>
              : <></>
            }
            {
              (this.state.status === 'finalizada' && this.state.cm && this.state.mentorUID === this.props.firebase.auth.currentUser.uid) || (this.state.status === 'finalizada' && this.state.cm && this.state.ce)
              ? <>
                  <div className="col-xs-12">
                    <p className="semi-bold col-xs-12">Calificación del Mentor</p>
                    <StarRatingComponent
                      name="stars"
                      editing='false'
                      starCount={5}
                      value={this.state.mentorCalif}
                      renderStarIcon={() => <i className="fas fa-star"></i>} />
                  </div> 
                </>
              : <></>
            }
            {
              (this.state.status === 'finalizada' && this.state.ce && this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid) || (this.state.status === 'finalizada' && this.state.cm && this.state.ce)
              ? <div className="col-xs-12">
                  <p className="semi-bold col-xs-12">Calificación del Emprendedor</p>
                  <StarRatingComponent
                    name="stars"
                    editing='false'
                    starCount={5}
                    value={this.state.empCalif}
                    renderStarIcon={() => <i className="fas fa-star"></i>} />
                </div> 
              : <></>
            }
          </article>
        </div>
        <p className="x-large semi-bold x-padding col-xs-12">Comentarios</p>
        <article className="col-xs-12 col-md-8">
          {
            this.state.comentarios.map(comentario => 
              <Comentario 
                photoURL={comentario.photoURL} 
                nombre={comentario.nombre} 
                comentario={comentario.comentario}
                fecha={comentario.fecha} />)
          }
          {
            this.state.status === 'pendiente' || this.state.status === 'aceptada'
            ? <form className="col-xs-12" onSubmit={this.sendComment}>
                <textarea required onChange={this.handleCommentChange} value={this.state.mensajeSend} className="card active bradius" placeholder="Escribe tu comentario aquí: " />
                <button className="button" type="submit">Enviar</button>
              </form>
            : <></>
          }
        </article>
        <p className="x-large semi-bold x-padding col-xs-12">Minuta</p>
        <article className="col-xs-12 col-md-8">
          {
            this.state.comMinuta.map(comentario => 
              <Comentario 
                photoURL={comentario.photoURL} 
                nombre={comentario.nombre} 
                comentario={comentario.comentario}
                fecha={comentario.fecha} />)
          }
          {
            this.state.status === 'pendiente' || this.state.status === 'aceptada'
            ? <form className="col-xs-12" onSubmit={this.sendComMin}>
                <textarea required onChange={this.handleComMinChange} value={this.state.menMinuta} className="card active bradius" placeholder="Escribe tu comentario para la minuta aquí: " />
                <button className="button" type="submit">Enviar</button>
              </form>
            : <></>
          }
        </article>
      </section>
      
    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withToast(withFirebase(withAuthorization(condition)(Detalle))));