import React from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Auth';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router-dom';

class MisAsesorias extends React.Component {
  constructor(props) {
    super(props);
    
    this.DEFAULT_STATE = {
      asesorias: [],
      temasList: []
    };

    this.state = {
      ...this.DEFAULT_STATE
    };
    
    const uid = this.props.firebase.auth.currentUser.uid;
    let ref = this.props.firebase.db.collection('asesorias');
    const refUser = this.props.firebase.user(uid);
    let rolString = '';
    
    // console.log(uid);
    let asesorias = [];
    let asesoria = [];
    let temas = [];
    
    this.columns = [
      {
        name: 'Asunto',
        selector: 'asunto',
        sortable: true
      },
      {
        name: 'Temas',
        selector: 'temas',
        sortable: false
      },
      {
        name: 'Solicitada Por',
        selector: 'authUserName',
        sortable: true
      },
      {
        name: 'Solicitada A',
        selector: 'nombreMentor',
        sortable: true
      },
      {
        name: 'Fecha Preferida',
        selector: 'asesoriaFechaP',
        sortable: true
      },
      {
        name: 'De',
        selector: 'hip',
        sortable: true
      },
      {
        name: 'A',
        selector: 'hfp',
        sortable: true
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true
      }
    ];

    refUser.get().then(doc => {
      rolString = doc.data().rolString;

      // Aplico la condición de que obtenga las asesorías si es mentor o emprendedor
      ref = ref.where(rolString === 'mentor' ? 'mentorUID' : 'solicitadaPorUID', '==', uid);

      // Aquí obtengo las asesorías del usuario.
      ref.onSnapshot(query => {
        query.forEach(doc => {
          asesoria = doc.data();
          // temas = asesoria.temas;
          // asesoria.temas = "";
          asesoria.temas = asesoria.temas.split('|')[0];

          // En esta linea agrego la asesoría a la lista de asesorías.
          asesorias.push(asesoria);
          // asesorias.push(doc.data());
        });

        // En esta linea asigno la lista de asesorías al estado. 
        this.setState({asesorias})
        this.forceUpdate();
        console.log(this.state.asesorias);
      })
    });
  }

  getTemaName = tema => {
    tema.get().then(doc => doc.data().nombre);
  }

  onRowClicked = e => {
    this.props.history.push(`/asesoria/${e.id}`);
  }
  
  render() {
    return(
      <section className="container padding-bot">
        <DataTable 
          className="card active bradius"
          title="Mis Asesorías"
          columns={this.columns}
          data={this.state.asesorias}
          striped
          highlightOnHover
          pointerOnHover
          onRowClicked={this.onRowClicked} />
      </section>
    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withFirebase(withAuthorization(condition)(MisAsesorias)));