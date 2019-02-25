import React from 'react';
import ListElement from '../Common/ListElement';
import { INDUSTRIAS } from '../../constants/routes';
import { Link } from 'react-router-dom';

class GestionIndustrias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {industrias:[]};
    let industrias = [];
    
    this.unsuscribeListen = this.props.firebase.db.collection('industrias').where('status', '==', 'active').onSnapshot(query => {
      industrias = [];
      query.forEach(industria => {
        industrias.push(industria.data());
      })
      this.setState({industrias});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
  }

  render() {
    return(
      <div className="row gestionList GestionIndustrias">
        <p className="medium black">Industrias</p>
        <div className="row list col-xs-12">
          {
            this.state.industrias.length === 0 
            ? <p>No hay Industrias</p>
            : this.state.industrias.map(industria => {
                return(<ListElement key={industria.uid} element={industria} to={INDUSTRIAS} />)
              })
          }
        </div>
        <div className="col-xs-12"><Link to={`/new${INDUSTRIAS}`} className="button button-border blue">Nueva Industria</Link></div>
      </div>
    );
  }
}

export default GestionIndustrias;