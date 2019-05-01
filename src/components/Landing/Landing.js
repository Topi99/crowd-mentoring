import React, { useState } from 'react';
import 'flexboxgrid2';
import './Landing.scss';
import { ImageCard, IconCard } from '../Cards';
import { Section, CallToAction, Modal } from '../Common';
import * as ROUTES from '../../constants/routes';
import Img from './simg-2.jpg';
import { withFirebase } from '../Firebase/context';
import { withToast } from 'react-awesome-toasts';

const Landing = ({firebase, toast}) => {
  const [ videoVisibility, setVideoVisibility ] = useState(false);

  const handleClickOpenVideo = e => {
    if(videoVisibility) setVideoVisibility(false);
    else setVideoVisibility(true);
  }

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ telefono, setTelefono ] = useState('');
  const [ mensaje, setMensaje ] = useState('');

  const sendMensaje = async e => {
    e.preventDefault();
    try {
      await firebase.db.collection('mensajes').add({
        nombre,
        email,
        telefono,
        mensaje
      });
      toast.show({ text: 'Mensaje enviado correctamente' });
      clean();
    } catch(e) {
      console.error(e);
      toast.show({ text: 'Ocurrió un error' });
    }
  }

  const handleChange = e => {
    const value = e.target.value;
    switch(e.target.id) {
      case 'nombre': setNombre(value); break;
      case 'email': setEmail(value); break;
      case 'telefono': setTelefono(value); break;
      case 'mensaje': setMensaje(value); break;
    }
  }

  const clean = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setMensaje('');
  }
  
  return(
    <>
      <section className="banner first-banner row middle-xs">
        <div className="col-xs-offset-1 col-xs-10 col-md-4 col-md-offset-1 banner--left">
          <h2 className="banner--title">¿Qué es Crowd Mentoring?</h2>
          <p className="banner--txt">Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, fusce urna vestibulum magnis pulvinar sodales nisl. Habitasse diam imperdiet lobortis neque mattis auctor luctus metus placerat volutpat, eu est conubia dui semper netus curabitur scelerisque erat in, mi litora venenatis tellus iaculis fames interdum quam arcu. </p>
        </div>
        <div className="col-md-6 hidden-xs hidden-sm banner--img"><img src="https://trello-attachments.s3.amazonaws.com/5c5b774c569bad264294d19d/5c5c5e8ef48c7e4735bd7f47/456c2f537b769680dd90496d8b0196f6/slider_2.png" alt="" /> </div>
      </section>

      <Section noTitle className="middle-xs video row">
        <div className="col-xs-12 col-md-5 start-xs video--desc">
          <h2 className="semi-bold xx-large separate">Conoce <span className="bluishGreen">Crowd Mentoring</span></h2>
          <p className="gray">Investiga tiones demonstr averunt lectores legere me lius quod ii qua legunt saepius. Claritas est etiam pro cessus dynamicus, qui sequitur mutationem consuetudium lecry torum. Mirum est notare quam littera gothica, quam the nunc putamus parum claram, ante posuerit.</p>
        </div>
        <div className="col-xs-12 col-md-offset-1 col-md-6">
          <figure className="video--preview">
            <img src={Img} alt="preview"/>
            <div className="overlay">
              <i onClick={handleClickOpenVideo} className="material-icons">play_arrow</i>
            </div>
          </figure>
        </div>
        <Modal visibility={videoVisibility} open={handleClickOpenVideo} close={handleClickOpenVideo}>

        </Modal>
      </Section>
    
      <Section title="¿Cómo funciona el sistema?" style={{}} className="container waves">
        {/* <img src={Waves} /> */}
        <div className="col-xs-12 col-md">
          <ImageCard className="padding" img="http://aazztech.com/demos/themes/html/tizara/dist/img/service7.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>
        <div className="col-xs-12 col-md">
          <ImageCard className="padding" img="http://aazztech.com/demos/themes/html/tizara/dist/img/service8.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>
        <div className="col-xs-12 col-md">
          <ImageCard className="padding" img="http://aazztech.com/demos/themes/html/tizara/dist/img/service9.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>
      </Section>
    
      <Section className="container" title="Beneficios de Pertenecer a la plataforma">
        <div className="col-xs-12 col-md">
            <IconCard icon="money" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>

        <div className="col-xs-12 col-md">
          <IconCard icon="graphic_eq" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>

        <div className="col-xs-12 col-md">
          <IconCard icon="assessment" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
        </div>
      </Section>
    

      <CallToAction 
        className="white" 
        imgSrc="http://aazztech.com/demos/themes/html/tizara/dist/img/sb3_img.png"
        text="Investiga tiones demonstr averunt lectores legere me lius quod ii qua legunt saepius." 
        title="Soy emprendedor." 
        btnTxt="¡Entra aquí!" 
        to={ ROUTES.REGISTER+'/emprendedor' } />
      <Section title="Partners" className="img-slider container" classNameDiv="around-xs">
        <div className="col-xs-6 col-md-2 row middle-xs">
          <img className="col-xs-12 img-padding" src="http://aazztech.com/demos/themes/html/tizara/dist/img/cl14.png" alt="partners" />
        </div>

        <div className="col-xs-6 col-md-2 row middle-xs">
          <img className="col-xs-12 img-padding" src="http://aazztech.com/demos/themes/html/tizara/dist/img/cl16.png" alt="partners" />
        </div>

        <div className="col-xs-6 col-md-2 row middle-xs">
          <img className="col-xs-12 img-padding" src="http://aazztech.com/demos/themes/html/tizara/dist/img/cl18.png" alt="partners" />
        </div>
        <div className="col-xs-6 col-md-2 row middle-xs">
          <img className="col-xs-12 img-padding" src="http://aazztech.com/demos/themes/html/tizara/dist/img/cl15.png" alt="partners" />
        </div>

        <div className="col-xs-6 col-md-2 row middle-xs">
          <img className="col-xs-12 img-padding" src="http://aazztech.com/demos/themes/html/tizara/dist/img/cl14.png" alt="partners" />
        </div>
      </Section>

      <CallToAction 
        invert 
        className="white" 
        imgSrc="http://aazztech.com/demos/themes/html/tizara/dist/img/sb3_img.png"
        text="Investiga tiones demonstr averunt lectores legere me lius quod ii qua legunt saepius." 
        title="Comparte tus conocimientos." 
        btnTxt="¡Registrate aquí!" 
        to={ ROUTES.REGISTER+'/mentor' } />
    
      <Section title="Contáctanos">
        <section className="col-xs-12 full-width row">
          <div className="col-xs-12 col-md-4 row middle-xs iconContact">
            <i className="col-xs-2 material-icons bluishGreen">call</i>
            <div className="col-xs-10 start-xs">
              <p className="top">800 567.890.576</p>
              <p className="bot">Mon-Sat 8am - 18pm</p>
            </div>
          </div>

          <div className="col-xs-12 col-md-4 row middle-xs iconContact">
            <i className="col-xs-2 material-icons bluishGreen">mail_outline</i>
            <div className="col-xs-10 start-xs">
              <p className="top">support@Tejarat.com</p>
              <p className="bot">Free enquiry</p>
            </div>
          </div>

          <div className="col-xs-12 col-md-4 row middle-xs iconContact">
            <i className="col-xs-2 material-icons bluishGreen">my_location</i>
            <div className="col-xs-10 start-xs">
              <p className="top">Melbourne, Australia</p>
              <p className="bot">95 South Park Avenue</p>
            </div>
          </div>
        </section>
        <article className="form1 col-xs-12 col-md-6 row">
          <h4 className="subtitle col-xs-12 start-xs">Pongámonos en contacto.</h4>
          <form onSubmit={sendMensaje}>
            <input onChange={handleChange} value={nombre} required className="col-xs-12" name="nombre" id="nombre" type="text" placeholder="Nombre" />
            <input onChange={handleChange} value={email} required className="col-xs-12" name="email" id="email" type="email" placeholder="Email" />
            <input onChange={handleChange} value={telefono} required className="col-xs-12" name="telefono" id="telefono" type="text" placeholder="Teléfono" />
            <textarea onChange={handleChange} value={mensaje} required className="col-xs-12" name="mensaje" id="mensaje" placeholder="Mensaje" />
            <div className="col-xs-12 start-xs">
              <button className=" button">Enviar</button>
            </div>
          </form>
        </article>
        <article className="form1 col-xs-12 col-md-6 row">
          <iframe title="google maps" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7468.84153735977!2d-100.40841390000004!3d20.6116992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1550018878206" width="600" height="450" frameBorder="0"  allowFullScreen></iframe>
        </article>
      </Section>
    </>
  );
};

export default withToast(withFirebase(Landing));