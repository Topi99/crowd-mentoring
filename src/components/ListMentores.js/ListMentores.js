import React from 'react';
import { withFirebase } from '../Firebase';
import styles from './ListMentores.module.scss';
import { PROFILE_IMG_DEF, PROFILE } from '../../constants/routes';
import { ImageCard } from '../Cards';

class ListMentores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mentores: []
    };

    let mentores = [];

    props.firebase.db.collection('users').where('status', '==', 'active').where('rolString', '==', 'mentor').onSnapshot(docs => {
      docs.forEach(doc => mentores.push(doc.data()));
      this.setState({mentores});
    })
  }

  render() {
    return(
      <div className={`${styles.listMentores} col-xs-12 row`}>
        {this.state.mentores.map(mentor => <div className="col-xs-3"><ImageCard className="center-xs" withButton btnTxt="Ver perfil" btnTo={PROFILE+'/'+mentor.uid} img={mentor.photoURL ? mentor.photoURL:PROFILE_IMG_DEF} title={mentor.nombre+' '+mentor.apellido} body={mentor.bio} /></div>)}
      </div>
    );
  }
}

export default withFirebase(ListMentores);