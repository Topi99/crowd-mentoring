import React from 'react';
import { withFirebase } from '../Firebase';
import { Line, Bar } from 'react-chartjs-2';

class RepAsesorias extends React.Component {
  constructor(props) {
    super(props);

    this.MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Ocubre', 'Noviembre', 'Diciembre'];

    this.INITIAL_STATE = {
      total: 1,
      totalMes: 0,
      concretadas: 0,
      canceladas: 0,
      asesoriasPorMes: { },
      mesSolicitado: 'Enero',
      solicitadasPorMes: [0,0,0,0,0,0,0,0,0,0,0,0]
    };
    
    this.state = { ...this.INITIAL_STATE };

    this.getRange(this.state.mesSolicitado);

    props.firebase.db.collection('asesorias').get().then(doc => {
      this.setState({ total: doc.size, canceladas: 0, totalMes: 0, concretadas: 0 })
    });
  }

  getRange = (month) => {
    month = this.MONTHS.indexOf(month);
    month += 1;
    const now = new Date();
    const from = new Date(`${now.getFullYear()}-${month > 10 ? month : '0'+month}`)
    month += 1;
    const to = new Date(`${now.getFullYear()}-${month > 10 ? month : '0'+month}`)
    console.log("From:", from,"\nTo:", to);
    
    let ref = this.props.firebase.db.collection('asesorias')
    ref = ref.where('fechaDeSolicitud', '>', from);
    ref = ref.where('fechaDeSolicitud', '<', to);
    
    ref.onSnapshot(doc => {
      this.setState({ totalMes: doc.size, canceladas: 0, concretadas: 0 });
      // console.log(doc);
      let asesoriasPorMes = {
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
      doc.forEach(asesoria => {
        asesoria = asesoria.data();
        let fecha = new Date(asesoria.fechaDeSolicitud.seconds * 1000);
        
        asesoriasPorMes.datasets[0].data[fecha.getDate()-1] += 1;
        if(asesoria.status === "cancelada" || asesoria.status === "pendiente") {
          this.setState({canceladas: this.state.canceladas + 1});
        }
        if(asesoria.status === "finalizada") {
          this.setState({concretadas: this.state.concretadas + 1});
        }
      });
      
      this.setState({asesoriasPorMes});
      console.log(asesoriasPorMes);
      asesoriasPorMes = {};
    });
  }

  handleMonthChange = async e => {
    e.preventDefault();
    await this.setState({ mesSolicitado: e.target.value });
    this.getRange(this.state.mesSolicitado);
    // console.log(this.state.mesSolicitado);
  }

  render() {
    return(
      <section className="container row">
        <p className="title col-xs-12">Reporte de asesorías</p>
        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Total de asesorías solicitadas</p>
            <p className="card-dash--value bold xx-large">{this.state.total | 0}</p>
          </div>
        </article>

        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Concretadas en el mes de {this.state.mesSolicitado}</p>
            <p className="card-dash--value bold xx-large">{Math.round(100*(this.state.concretadas/this.state.totalMes)*100)/100 | 0}%</p>
          </div>
        </article>
        
        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Concretadas en el mes de {this.state.mesSolicitado}</p>
            <p className="card-dash--value bold xx-large">{Math.round(100*(this.state.canceladas/this.state.totalMes)*100)/100 | 0}%</p>
          </div>
        </article>

        <article className="col-xs-6 col-md-3">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías solicitadas en {this.state.mesSolicitado}</p>
            <p className="card-dash--value bold xx-large">{this.state.totalMes | 0}</p>
          </div>
        </article>

        <article className="col-xs-12 col-md-12">
          <div className="card active bradius card-dash" >
            <p className="gray card-dash--title">Asesorías por día del mes de {this.state.mesSolicitado}</p>
            <select className="card-dash--select" value={this.state.mesSolicitado} onChange={this.handleMonthChange} >
              { 
                this.MONTHS.map(val =>
                  <option value={val}>{val}</option>
                )
              }
            </select>
            <Bar 
              data={this.state.asesoriasPorMes} />
            {/* <Line 
              data={this.state.asesoriasPorMes[this.state.mesSolicitado]} /> */}
          </div>
        </article>

        <p className="title col-xs-12">Insights</p>
      </section>
    );
  }
}

export default withFirebase(RepAsesorias);