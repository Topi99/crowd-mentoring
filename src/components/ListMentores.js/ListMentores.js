import React from 'react';
import { withFirebase } from '../Firebase';
import styles from './ListMentores.module.scss';
import { PROFILE_IMG_DEF, PROFILE } from '../../constants/routes';
import { SmallImageCard } from '../Cards';
import { Modal } from '../Common';
import { withAuthorization } from '../Auth';

class ListMentores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mentores: [],
      searchByName: '',
      searchByAEsp: false,
      searchByTema: false,
      searchByIndustrias: false,
      searchByEtapa: false,
      aEsps: [],
      temas: [],
      industrias: [],
      etapas: [],

      allAesp: [],
      allTemas:[],
      allIndustrias:[],
      allEtapas:[],

      options: false
    };

    let mentores = [];
    let allAesp = [];
    let allTemas = [];
    let allIndustrias = [];
    let allEtapas = [];

    this.ref = props.firebase.db.collection('users');
    this.ref = this.ref.where('status', '==', 'active');
    this.ref = this.ref.where('rolString','==','Mentor');

    this.query(mentores);

    props.firebase.db.collection('aEsp').onSnapshot(doc => {
      doc.forEach(aesp => allAesp.push(aesp.data()))
      this.setState({allAesp});
    });

    props.firebase.db.collection('temas').onSnapshot(doc => {
      doc.forEach(tema => allTemas.push(tema.data()))
      this.setState({allTemas});
    });

    props.firebase.db.collection('industrias').onSnapshot(doc => {
      doc.forEach(industria => allIndustrias.push(industria.data()))
      this.setState({allIndustrias});
    });

    props.firebase.db.collection('etapas').onSnapshot(doc => {
      doc.forEach(etapa => allEtapas.push(etapa.data()))
      this.setState({allEtapas});
    });
  }

  getMentor = mentor => {
    return(
      <div key={mentor.uid} className="col-xs-12 col-sm-6 col-md-4">
        <SmallImageCard 
          className="center-xs bradius" 
          withButton btnTxt="Ver perfil" 
          btnTo={PROFILE+'/'+mentor.uid} 
          img={mentor.photoURL ? mentor.photoURL:PROFILE_IMG_DEF} 
          // img={mentor.photoURL ? mentor.photoURL:"https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/36912321_1964265953597941_8969276024957173760_n.jpg?_nc_cat=104&_nc_ht=scontent-dfw5-2.xx&oh=50cf6870db7cfc44a181acc3ff75db76&oe=5CF11722"}
          title={mentor.nombre+' '+mentor.apellido} 
          body={mentor.bio}
          aesp={mentor.aesp} />
      </div>
    );
  }

  handleSearchChange = e => {
    this.setState({searchByName:e.target.value});
  }

  handleOptionChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ [e.target.id] : value });
  }

  search = () => {
    if(this.state.aEsps.length>0) {
      this.state.aEsps.forEach(item => {this.ref = this.ref.where('areasEsp','array-contains',item)})
    } 
    if(this.state.industrias.length>0) this.setState({searchByIndustrias:true})
    if(this.state.temas.length>0) this.setState({searchByTema:true})
    if(this.state.etapas.length>0) this.setState({searchByEtapa:true})

    if(this.state.searchByAEsp) {
     
    }
    // 

    this.query();

    this.setState({options:false});
  }

  query = (mentores=[]) => {
    this.ref.onSnapshot(docs => {
      this.setState({mentores:[]});
      docs.forEach(doc => mentores.push(doc.data()));
      this.setState({mentores});
      console.log(this.state.mentores);
    });
  }

  cancel = () => this.setState({options:false})

  open = () => this.setState({options:true})

  render() {
    return(
      <div className={`${styles.listMentores} col-xs-9`}>
        <div className={`${styles.searchBox} row middle-xs`}>
          <input value={this.state.searchByName} onChange={this.handleSearchChange} className="col-md-11 col-xs-12" type="text" placeholder="Buscar por nombre" />
          <div className="col-md-1 col-xs-12 center-xs end-md"><button onClick={this.open} className="button">Opciones</button></div>
        </div>
        <div className={`${styles.listContainer} row`}>
          { 
            this.state.mentores.map(mentor => {
              if(this.state.searchByName==='') {
                return(
                  this.getMentor(mentor)
                )
              } else {
                if(mentor.nombre.includes(this.state.searchByName) || mentor.apellido.includes(this.state.searchByName)) {
                  return(
                    this.getMentor(mentor)
                  )
                }
              }
              return <></>
            })
          }
        </div>
        <Modal visibility={this.state.visibility} open={this.open} close={this.close}>
          <div className="col-xs-12 col-md-3">
            <p className="medium large">Areas de Especialidad</p>
            <select multiple value={this.state.aEsps} id="aEsps" onChange={this.handleOptionChange} className="col-xs-12">
              {
                this.state.allAesp.map(option => <option key={option.uid} value={option.uid}>{option.nombre}</option>)
              }
            </select>
          </div>
          <div className="col-xs-12 col-md-3">
            <p className="medium large">Etapas</p>
            <select multiple value={this.state.etapas} id="etapas" onChange={this.handleOptionChange} className="col-xs-12">
              {
                this.state.allEtapas.map(option => <option key={option.uid} value={option.uid}>{option.nombre}</option>)
              }
            </select>
          </div>
          <div className="col-xs-12 col-md-3">
            <p className="medium large">Industrias</p>
            <select multiple value={this.state.indstrias} id="indstrias" onChange={this.handleOptionChange} className="col-xs-12">
              {
                this.state.allIndustrias.map(option => <option key={option.uid} value={option.uid}>{option.nombre}</option>)
              }
            </select>
          </div>
          <div className="col-xs-12 col-md-3">
            <p className="medium large">Temas</p>
            <select multiple value={this.state.temas} id="temas" onChange={this.handleOptionChange} className="col-xs-12">
              {
                this.state.allTemas.map(option => <option key={option.uid} value={option.uid}>{option.nombre}</option>)
              }
            </select>
          </div>
          <div className={`col-xs-12 ${styles.search}`}>
            <button className="button" onClick={this.search}>Buscar</button>
            <button className="button button-border red" onClick={this.cancel}>Cerrar</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(ListMentores));