import React from 'react';
import { withFirebase } from '../Firebase';
import { Bar } from 'react-chartjs-2';

class RepAsesorias extends React.Component {
  constructor(props) {
    super(props);

    const dataDefault = {
      labels: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      solicitadas: 0,
      datasets: [
        {
          label: 'Asesorías Solicitadas',
          backgroundColor: 'rgba(181,93,232,0.2)',
          borderColor: 'rgba(181,93,232,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(181,93,232,0.4)',
          hoverBorderColor: 'rgba(181,93,232,1)',
          data: [0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: 'Asesorías Concretadas',
          backgroundColor: 'rgba(68,144,255,0.2)',
          borderColor: 'rgba(68,144,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(68,144,255,0.4)',
          hoverBorderColor: 'rgba(68,144,255,1)',
          data: [0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } ,
        {
          label: 'Asesorías No Concretadas',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [0,0,0,0,0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        } 
      ]
    };

    this.MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'ocubre', 'noviembre', 'diciembre'];

    this.INITIAL_STATE = {
      total: 1,
      totalMes: 0,
      concretadas: 0,
      canceladas: 0,
      asesoriasPorMes: { enero: {...dataDefault}, febreo:{}, marzo: {}, abril: {} },
      mesSolicitado: 'enero',
      solicitadasPorMes: [0,0,0,0,0,0,0,0,0,0,0,0]
    };

    this.state = { ...this.INITIAL_STATE, mesSolicitado:this.MONTHS[new Date().getMonth()] };

    
    props.firebase.db.collection('asesorias').onSnapshot(doc => {
      this.setState({ total: doc.size, canceladas: 0, totalMes: 0, concretadas: 0 })
      // console.log(doc);
      let date;
      let dataMonth = [];
      doc.forEach(asesoria => {
        date = new Date(asesoria.data().fechaDeSolicitud.seconds*1000);
        dataMonth = this.state.asesoriasPorMes;
        dataMonth[this.MONTHS[date.getMonth()]] = {...dataDefault};
        dataMonth[this.MONTHS[date.getMonth()]].datasets[0].data[date.getDate()-1] += 1;
        dataMonth[this.MONTHS[date.getMonth()]].solicitadas += 1;
        console.log('se modifica');
        
        if(asesoria.data().status === 'finalizada') {
          this.setState({concretadas: this.state.concretadas + 1})
          dataMonth[this.MONTHS[date.getMonth()]].datasets[1].data[date.getDate()-1] += 1;
        }
        if(asesoria.data().status === 'cancelada') {
          this.setState({canceladas: this.state.canceladas + 1})
          dataMonth[this.MONTHS[date.getMonth()]].datasets[2].data[date.getDate()-1] = this.state.canceladas;
        }
        
        this.setState({asesoriasPorMes:dataMonth});
        console.log(this.state.mesSolicitado, this.state.asesoriasPorMes[this.state.mesSolicitado]);
        dataMonth = undefined;
        // this.setState({asesoriasPorMes: update(this.state.asesoriasPorMes, {[date.getMonth()]:})})
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
            <p className="gray card-dash--title">Asesorías solicitadas en {this.state.mesSolicitado}</p>
            <p className="card-dash--value bold xx-large">{this.state.asesoriasPorMes[this.state.mesSolicitado].solicitadas | 0}</p>
          </div>
        </article>

        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías concretadas</p>
            <p className="card-dash--value bold xx-large">{Math.round(100*(this.state.concretadas/this.state.total)*100)/100}%</p>
          </div>
        </article>
        
        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías no concretadas</p>
            <p className="card-dash--value bold xx-large">{Math.round(100*(this.state.canceladas/this.state.total)*100)/100}%</p>
          </div>
        </article>

        <article className="col-xs-12 col-md-12">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías por día del mes de {this.state.mesSolicitado}</p>
            <Bar 
              data={this.state.asesoriasPorMes[this.state.mesSolicitado]} />
          </div>
        </article>
      </section>
    );
  }
}

export default withFirebase(RepAsesorias);