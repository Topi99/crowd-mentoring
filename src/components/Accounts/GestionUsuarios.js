import React from 'react';
import { QUser } from '../Common';
import { withToast } from 'react-awesome-toasts';

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

    this.unsuscribeListen2 = this.props.firebase.users().where('status','==','active').where('rolString', '==','emprendedor').onSnapshot(query => {
      query.forEach(user => {
        emp.push(user.data());
      })
      this.setState({emp});
    });

    this.unsuscribeListen3 = this.props.firebase.users().where('status','==','active').where('rolString', '==','mentor').onSnapshot(query => {
      query.forEach(user => {
        ment.push(user.data());
      })
      this.setState({ment});
    });
  }

  archiveUser = e => {
    let userRef = this.props.firebase.db.collection('users').doc(e.target.id);
    userRef.get().then(doc => {
      if(doc.data().status === 'active') {
        userRef.update({
          status: 'inactive',
        }).then(() => this.props.toast.show({text:'Usuario Archivado, recarga la pantalla', actionText:'Ok', onActionClick:this.props.toast.hide}));
      } else {
        userRef.update({
          status: 'active',
        }).then(() => this.props.toast.show({text:'Usuario Desarchivado, recarga la pantalla', actionText:'Ok', onActionClick:this.props.toast.hide}));
      }
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
        <p className="medium black">Peticiones de Registro y Usuarios Inactivos</p>
        <div className="row list col-xs-12">
          {
            this.state.users.length === 0 
            ? <p>No hay nada por aquí.</p>
            : this.state.users.map(user => {
                return(<QUser className="list" archiveUser={this.archiveUser} key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Emprendedores</p>
        <div className="row list col-xs-12">
          {
            this.state.emp.length === 0 
            ? <p>No hay Emprendedores</p>
            : this.state.emp.map(user => {
                return(<QUser className="list" archiveUser={this.archiveUser} key={user.uid} user={user} />)
              })
          }
        </div>
        <p className="medium black">Mentores</p>
        <div className="row list col-xs-12">
          {
            this.state.ment.length === 0 
            ? <p>No hay Mentores</p>
            : this.state.ment.map(user => {
                return(<QUser className="list" archiveUser={this.archiveUser} key={user.uid} user={user} />)
              })
          }
        </div>
      </div>
    );
  }
}

export default withToast(GestionUsuarios);