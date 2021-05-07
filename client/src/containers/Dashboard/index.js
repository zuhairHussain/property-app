import React, { Component } from 'react';
import Container from '../../components/Container';
import './dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container className="home-page">
                <h1>Dashboard</h1>
            </Container>
        );
    }
}
export default Dashboard;