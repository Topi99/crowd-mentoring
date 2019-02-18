import React from 'react';
import { Section } from '../Common';
import { withAuthorization } from '../Auth';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    };
  }

  render() {
    return(
      <Section title="Perfil">

      </Section>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);