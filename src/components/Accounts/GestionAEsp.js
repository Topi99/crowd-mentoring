import React from 'react';
import ListElement from '../Common/ListElement';
import { AEsp } from '../../constants/routes';

class GestionAEsp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {aEsp:[]};
    let aEsp = [];
    
    this.unsuscribeListen = this.props.firebase.db.collection('aEsp').where('status', '==', 'active').onSnapshot(query => {
      aEsp = [];
      query.forEach(area => {
        aEsp.push(area.data());
      })
      this.setState({aEsp});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
  }

  render() {
    return(
      <div className="row gestionUsuarios">
        <p className="medium black">Áreas de Especialidad</p>
        <div className="row list col-xs-12">
          {
            this.state.aEsp.length === 0 
            ? <p>No hay Áreas de Especialidad</p>
            : this.state.aEsp.map(area => {
                return(<ListElement element={area} to={AEsp} />)
              })
          }
        </div>
      </div>
    );
  }
}

export default GestionAEsp;