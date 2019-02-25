import React from 'react';
import { QUser } from '../Common';

class GestionUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users:[], emp:[], ment:[]};
    let users = [];
    let emp = [];
    let ment = [];

    this.unsuscribeListen = this.props.firebase.users().where('status', '==','inactive').onSnapshot(query => {
      query.forEach(user => {
        users.push(user.data());
      })
      this.setState({users});
    });

    this.unsuscribeListen2 = this.props.firebase.users().where('rolString', '==','emprendedor').onSnapshot(query => {
      query.forEach(user => {
        emp.push(user.data());
      })
      this.setState({emp});
    });

    this.unsuscribeListen3 = this.props.firebase.users().where('rolString', '==','mentor').onSnapshot(query => {
      query.forEach(user => {
        ment.push(user.data());
      })
      this.setState({ment});
    });
  }

  componentWillUnmount() {
    this.unsuscribeListen();
    this.unsuscribeListen2();
    this.unsuscribeListen3();
  }

  render() {
    return(
      <div className="row gestionUsuarios">
        <p className="medium black">Peticiones de Registro</p>
        <div className="row list col-xs-12">
          {
            this.state.users.length === 0 
            ? <p>No hay peticiones pendientes</p>
            : this.state.users.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Emprendedores</p>
        <div className="row list col-xs-12">
          {
            this.state.emp.length === 0 
            ? <p>No hay Emprendedores</p>
            : this.state.emp.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Mentores</p>
        <div className="row list col-xs-12">
          {
            this.state.ment.length === 0 
            ? <p>No hay Mentores</p>
            : this.state.ment.map(user => {
                return(<QUser className="list" key={user.uid} user={user} />)
              })
          }
        </div>
      </div>
    );
  }
}

export default GestionUsuarios;