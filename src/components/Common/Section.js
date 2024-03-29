import React from 'react';
import './index.scss';

const Section = props => {
  return(
    <section className={`Section row center-xs ${props.className}`}>
      <h3 style={{display:props.noTitle ? 'none' : 'initial'}} className="title semibold col-xs-12">{ props.title }</h3>
      <div style={{paddingTop:props.noTitle ? '3vh' : '0'}} className={`row col-xs-12 col-md-10 center-xs ${props.classNameDiv}`}>
        { props.children }
      </div>
    </section>
  );
};

export default Section;