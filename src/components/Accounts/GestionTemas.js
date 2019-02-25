import React from 'react';
import ListElement from '../Common/ListElement';
import { TEMAS } from '../../constants/routes';
import { Link } from 'react-router-dom';

class GestionTemas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temas:[]};
    let temas = [];
    
    this.unsuscribeListen = this.props.firebase.db.collection('temas').where('status', '==', 'active').onSnapshot(query => {
      temas = [];
      query.forEach(tema => {
        temas.push(tema.data());
      })
      this.setState({temas});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
  }

  render() {
    return(
      <div className="row gestionList GestionIndustrias">
        <p className="medium black">Temas</p>
        <div className="row list col-xs-12">
          {
            this.state.temas.length === 0 
            ? <p>No hay Temas</p>
            : this.state.temas.map(tema => {
                return(<ListElement key={tema.uid} element={tema} to={TEMAS} />)
              })
          }
        </div>
        <div className="col-xs-12"><Link to={`/new${TEMAS}`} className="button button-border blue">Nuevo Tema</Link></div>
      </div>
    );
  }
}

export default GestionTemas;