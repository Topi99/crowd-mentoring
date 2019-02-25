import React from 'react';
import ListElement from '../Common/ListElement';
import { ETAPAEMP } from '../../constants/routes';
import { Link } from 'react-router-dom';

class GestionEtapaEmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {etapas:[]};
    let etapas = [];
    
    this.unsuscribeListen = this.props.firebase.db.collection('etapas').where('status', '==', 'active').onSnapshot(query => {
      etapas = [];
      query.forEach(etapa => {
        etapas.push(etapa.data());
      })
      this.setState({etapas});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
  }

  render() {
    return(
      <div className="row gestionList GestionEtapaEmp">
        <p className="medium black">Etapas de Emprendimiento</p>
        <div className="row list col-xs-12">
          {
            this.state.etapas.length === 0 
            ? <p>No hay Etapas de Emprendimiento</p>
            : this.state.etapas.map(etapa => {
                return(<ListElement key={etapa.uid} element={etapa} to={ETAPAEMP} />)
              })
          }
        </div>
        <div className="col-xs-12"><Link to={`/new${ETAPAEMP}`} className="button button-border blue">Nueva Etapa</Link></div>
      </div>
    );
  }
}

export default GestionEtapaEmp;