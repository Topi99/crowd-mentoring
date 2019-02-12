import React from 'react';
import 'flexboxgrid2';
import './Landing.scss';
import { ImageCard, IconCard } from '../Cards';

const Landing = props => {
  return(
    <>
      <section className="banner first-banner row middle-xs">
        <div className="col-xs-5 col-xs-offset-1 banner--left">
          <h2 className="banner--title">¿Qué es Crowd Mentoring?</h2>
          <p className="banner--txt">Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, fusce urna vestibulum magnis pulvinar sodales nisl. Habitasse diam imperdiet lobortis neque mattis auctor luctus metus placerat volutpat, eu est conubia dui semper netus curabitur scelerisque erat in, mi litora venenatis tellus iaculis fames interdum quam arcu. </p>
        </div>
        <div className="col-xs-6 banner--img"><img src="https://trello-attachments.s3.amazonaws.com/5c5b774c569bad264294d19d/5c5c5e8ef48c7e4735bd7f47/456c2f537b769680dd90496d8b0196f6/slider_2.png" alt="" /> </div>
      </section>
      <section className="row center-xs">
        <h3 className="title col-xs-12">¿Cómo funciona el sistema?</h3>
        <div className="row col-xs-12 col-md-10 center-xs">
          <div className="col-xs-12 col-md-4">
            <ImageCard img="http://aazztech.com/demos/themes/html/tizara/dist/img/service7.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>
          <div className="col-xs-12 col-md-4">
            <ImageCard img="http://aazztech.com/demos/themes/html/tizara/dist/img/service8.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>
          <div className="col-xs-12 col-md-4">
            <ImageCard img="http://aazztech.com/demos/themes/html/tizara/dist/img/service9.png" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>
        </div>
      </section>
      <section className="row center-xs">
        <h3 className="title col-xs-12">Beneficios de Pertenecer a la plataforma</h3>
        <div className="row col-xs-12 col-md-10 center-xs">
        
          <div className="col-xs-12 col-md-4">
              <IconCard icon="money" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>

          <div className="col-xs-12 col-md-4">
            <IconCard icon="graphic_eq" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>

          <div className="col-xs-12 col-md-4">
            <IconCard icon="assessment" title="paso 1" body="Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi. Totam rem aperiam, eaque ipsa."/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;