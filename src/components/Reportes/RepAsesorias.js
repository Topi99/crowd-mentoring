import React from 'react';
import { withFirebase } from '../Firebase';
import { Bar } from 'react-chartjs-2';

class RepAsesorias extends React.Component {
  constructor(props) {
    super(props);

    this.INITIAL_STATE = {
      total: 1,
      concretadas: 0,
      canceladas: 0,
      totalAsesorias: {
        labels: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [
          {
            label: 'Asesorías Solicitadas',
            backgroundColor: 'rgba(181,93,232,0.2)',
            borderColor: 'rgba(181,93,232,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(181,93,232,0.4)',
            hoverBorderColor: 'rgba(181,93,232,1)',
            data: [13,20,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: 'Asesorías Concretadas',
            backgroundColor: 'rgba(68,144,255,0.2)',
            borderColor: 'rgba(68,144,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(68,144,255,0.4)',
            hoverBorderColor: 'rgba(68,144,255,1)',
            data: [8,5,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          } ,
          {
            label: 'Asesorías No Concretadas',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [5,15,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          } 
        ]
      }
    };

    this.state = { ...this.INITIAL_STATE };
    
    props.firebase.db.collection('asesorias').get().then(doc => {
      this.setState({ total: doc.size })
      // console.log(doc);
      doc.forEach(asesoria => {
        console.log(asesoria.data().status);
        if(asesoria.data().status === 'finalizada')
          this.setState({concretadas: this.state.concretadas + 1})
        if(asesoria.data().status === 'cancelada')
          this.setState({canceladas: this.state.canceladas + 1})
      });
    });
  }

  render() {
    return(
      <section className="container row">
        <p className="title col-xs-12">Reporte de asesorías</p>
        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Total de asesorías solicitadas</p>
            <p className="card-dash--value bold xx-large">{this.state.total}</p>
          </div>
        </article>

        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías solicitadas el último mes</p>
            <p className="card-dash--value bold xx-large">40</p>
          </div>
        </article>

        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías concretadas</p>
            <p className="card-dash--value bold xx-large">{100*(this.state.concretadas/this.state.total)}%</p>
          </div>
        </article>
        
        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías no concretadas</p>
            <p className="card-dash--value bold xx-large">{100*(this.state.canceladas/this.state.total)}%</p>
          </div>
        </article>

        <article className="col-xs-12 col-md-12">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías por día del mes</p>
            <Bar 
              data={this.state.totalAsesorias} />
          </div>
        </article>
      </section>
    );
  }
}

export default withFirebase(RepAsesorias);