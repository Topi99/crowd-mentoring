import React from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Auth';
import { ASESORIAS, PROFILE } from '../../constants/routes';
import { withToast } from 'react-awesome-toasts';
import { withRouter, Link } from 'react-router-dom';
import Comentario from './Comentario';

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
      photoURL: '',
      nombre: '',
      mensajeSend: ''
    }
    
    this.state = {...this.DEFAULT_STATE};
    let asesoria = {};

    props.firebase.db.collection('asesorias').doc(props.match.params.id).onSnapshot(doc => {
      asesoria = doc.data();

      if(asesoria.status === 'pendiente' || asesoria.status === 'aceptada' || asesoria.status === 'finalizada') {
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

  sendComment = () => {
    this.props.firebase.db.collection('asesorias').doc(this.state.id).update({
      comentarios: this.props.firebase.firestore.FieldValue.arrayUnion({
        comentario:this.state.mensajeSend,
        nombre: this.state.nombre,
        photoURL: this.state.photoURL ? this.state.photoURL : ''
      })
    });
    this.state.mensajeSend = "";
  }
  
  render() {
    return(
      <section className="container row center-xs padding-bot">
        <p className="title col-xs-12">Detalles de Asesoría</p>
        <article className="row card col-xs-12 col-md-8 active bradius padding">
          <p className="gray col-xs-12"><span className="black semi-bold">Asunto: </span>{this.state.asunto}</p>
          <p className="gray col-xs-12"><span className="black semi-bold">Temas: </span>{this.state.temasString}</p>
          <p className="gray col-xs-12"><span className="black semi-bold">Solicitada Por: </span><Link className="bluishGreen" to={PROFILE+'/'+this.state.solicitadaPorUID}>{this.state.solicitadaPorString}</Link> </p>
          <p className="gray col-xs-12"><span className="black semi-bold">Mentor: </span><Link className="bluishGreen" to={PROFILE+'/'+this.state.mentorUID}>{this.state.mentorString}</Link> </p>
          <p className="gray col-xs-12"><span className="black semi-bold">Fecha Preferida:  </span>{this.state.asesoriaFechaP} <span className="black semi-bold">De: </span>{this.state.hip} <span className="black semi-bold">A: </span>{this.state.hfp}</p>
          <p className="gray col-xs-12"><span className="black semi-bold">Fecha Alterna 1:  </span>{this.state.fechaA1} <span className="black semi-bold">De: </span>{this.state.hia1} <span className="black semi-bold">A: </span>{this.state.hfa1}</p>
          <p className="gray col-xs-12"><span className="black semi-bold">Fecha Alterna 2:  </span>{this.state.fechaA2} <span className="black semi-bold">De: </span>{this.state.hia2} <span className="black semi-bold">A: </span>{this.state.hfa2}</p>
          <p className="gray col-xs-12"><span className="black semi-bold">Status: </span><span className={this.state.status}>{this.state.status}</span></p>
          <p className="gray col-xs-12"><span className="black semi-bold">Mensaje: </span>{this.state.mensaje}</p>

          <div className="col-xs-12">

            {
              this.state.status === 'pendiente' && this.state.mentorUID === this.props.firebase.auth.currentUser.uid
              ? <button className="button bluishGreen">Aceptar</button>
              : <></>
            }

            {
              this.state.status === 'aceptada' && (this.state.mentorUID === this.props.firebase.auth.currentUser.uid || this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid)
              ? <button className="button red">Finalizar</button>
              : <></>
            }

            {
              this.state.status === 'pendiente' || this.state.status === 'aceptada' && (this.state.mentorUID === this.props.firebase.auth.currentUser.uid || this.state.solicitadaPorUID === this.props.firebase.auth.currentUser.uid)
              ? <button className="button red">Cancelar</button>
              : <></>
            }

          </div>
          
        </article>
        <p className="x-large semi-bold x-padding col-xs-12">Comentarios</p>
        <article className="col-xs-12 col-md-8">
          {
            this.state.comentarios.map(comentario => <Comentario 
                                                        photoURL={comentario.photoURL} 
                                                        nombre={comentario.nombre} 
                                                        comentario={comentario.comentario} />)
          }
          {
            this.state.status === 'pendiente' || this.state.status === 'aceptada'
            ? <div className="col-xs-12">
                <textarea onChange={this.handleCommentChange} value={this.state.mensajeSend} className="card active bradius" placeholder="Escribe tu comentario aquí: " />
                <button className="button" onClick={this.sendComment}>Enviar</button>
              </div>
            : <></>
          }
        </article>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withToast(withFirebase(withAuthorization(condition)(Detalle))));