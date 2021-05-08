import React, { Component } from 'react';
import Container from '../../components/Container';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
  render() {
    return (
     <div>
        <Container className="home-page">
            <h1>Edit User</h1>
        </Container>
     </div>
    )
  }
};


export default EditUser;